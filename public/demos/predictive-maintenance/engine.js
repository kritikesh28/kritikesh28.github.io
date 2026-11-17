// Tiny XGBoost (multi:softprob) predictor + exact TreeSHAP, for the tuned predictive-maintenance model.
// Tree format: [classIndex, splitFeature[], splitThresholdOrLeaf[], left[], right[], cover[]]
(function (root) {
  const f32 = Math.fround;
  function leaf(t, x) {
    const F = t[1], V = t[2], L = t[3], R = t[4];
    let n = 0;
    while (L[n] !== -1) n = f32(x[F[n]]) < f32(V[n]) ? L[n] : R[n];
    return V[n];
  }
  function margins(model, x) {
    const m = [0, 0, 0, 0, 0].map(() => model.base);
    for (const t of model.trees) m[t[0]] += leaf(t, x);
    return m;
  }
  function softmax(m) {
    const mx = Math.max(...m), e = m.map((v) => Math.exp(v - mx)), s = e.reduce((a, b) => a + b, 0);
    return e.map((v) => v / s);
  }
  // ---- TreeSHAP (Lundberg et al. 2018, Algorithm 2) ----
  function extend(p, ud, zf, of, fi) {
    p.f[ud] = fi; p.z[ud] = zf; p.o[ud] = of; p.w[ud] = ud === 0 ? 1 : 0;
    for (let i = ud - 1; i >= 0; i--) {
      p.w[i + 1] += (of * p.w[i] * (i + 1)) / (ud + 1);
      p.w[i] = (zf * p.w[i] * (ud - i)) / (ud + 1);
    }
  }
  function unwind(p, ud, k) {
    const of = p.o[k], zf = p.z[k];
    let next = p.w[ud];
    for (let i = ud - 1; i >= 0; i--) {
      if (of !== 0) {
        const tmp = p.w[i];
        p.w[i] = (next * (ud + 1)) / ((i + 1) * of);
        next = tmp - (p.w[i] * zf * (ud - i)) / (ud + 1);
      } else p.w[i] = (p.w[i] * (ud + 1)) / (zf * (ud - i));
    }
    for (let i = k; i < ud; i++) { p.f[i] = p.f[i + 1]; p.z[i] = p.z[i + 1]; p.o[i] = p.o[i + 1]; }
  }
  function unwoundSum(p, ud, k) {
    const of = p.o[k], zf = p.z[k];
    let next = p.w[ud], total = 0;
    for (let i = ud - 1; i >= 0; i--) {
      if (of !== 0) {
        const tmp = (next * (ud + 1)) / ((i + 1) * of);
        total += tmp;
        next = p.w[i] - (tmp * zf * (ud - i)) / (ud + 1);
      } else total += p.w[i] / zf / ((ud - i) / (ud + 1));
    }
    return total;
  }
  function copy(p, n) { return { f: p.f.slice(0, n), z: p.z.slice(0, n), o: p.o.slice(0, n), w: p.w.slice(0, n) }; }
  function recurse(t, x, phi, node, parent, ud, pz, po, pf) {
    const F = t[1], V = t[2], L = t[3], R = t[4], C = t[5];
    const p = copy(parent, ud);
    extend(p, ud, pz, po, pf);
    if (L[node] === -1) {
      for (let i = 1; i <= ud; i++) phi[p.f[i]] += unwoundSum(p, ud, i) * (p.o[i] - p.z[i]) * V[node];
      return;
    }
    const sf = F[node];
    const hot = f32(x[sf]) < f32(V[node]) ? L[node] : R[node];
    const cold = hot === L[node] ? R[node] : L[node];
    let iz = 1, io = 1, k = 0;
    while (k <= ud && p.f[k] !== sf) k++;
    if (k !== ud + 1) { iz = p.z[k]; io = p.o[k]; unwind(p, ud, k); ud--; }
    recurse(t, x, phi, hot, p, ud + 1, (C[hot] / C[node]) * iz, io, sf);
    recurse(t, x, phi, cold, p, ud + 1, (C[cold] / C[node]) * iz, 0, sf);
  }
  // phi[class][feature] in log-odds (margin) space
  function shap(model, x) {
    const nf = model.features.length;
    const phi = [0, 1, 2, 3, 4].map(() => new Array(nf + 1).fill(0));
    const empty = { f: [], z: [], o: [], w: [] };
    for (const t of model.trees) recurse(t, x, phi[t[0]], 0, empty, 0, 1, 1, -1);
    return phi.map((r) => r.slice(0, nf));
  }
  function features(type, air, proc, rpm, torque, wear) {
    const enc = { H: 0, L: 1, M: 2 }[type];
    return [enc, air, proc, rpm, torque, wear, (torque * rpm * 2 * Math.PI) / 60, proc - air];
  }
  root.PM = { margins, softmax, shap, features };
})(typeof window !== 'undefined' ? window : globalThis);
