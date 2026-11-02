// Languages of the site. Guide: docs/15-languages-and-hindi.md
//
// English is the default and keeps its old addresses (/about/). Every other language lives under its own
// prefix (/hi/about/). To add a language later (for example Tamil or French):
//   1. add it to LOCALES below,
//   2. add its words to src/i18n/ui.ts (anything missing falls back to English),
//   3. put translated posts in a folder named after its code (src/content/library/ta/...).
// Every page then gets built in that language automatically, and the switcher shows it.

export const LOCALES = {
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_IN', dateLocale: 'en-IN', hreflang: 'en' },
  hi: { label: 'हिंदी', name: 'हिंदी', htmlLang: 'hi', ogLocale: 'hi_IN', dateLocale: 'hi-IN', hreflang: 'hi' },
} as const;

export type Lang = keyof typeof LOCALES;
export const DEFAULT_LANG: Lang = 'en';
export const LANGS = Object.keys(LOCALES) as Lang[];

export const isLang = (s: string | undefined): s is Lang => !!s && s in LOCALES;

/** The language a path belongs to: '/hi/about/' -> 'hi', '/about/' -> 'en' */
export const langFromPath = (path: string): Lang => {
  const first = path.split('/')[1];
  return isLang(first) && first !== DEFAULT_LANG ? first : DEFAULT_LANG;
};
export const langFromUrl = (url: URL) => langFromPath(url.pathname);

/** '/hi/about/' -> '/about/' */
export const stripLang = (path: string) => {
  const lang = langFromPath(path);
  return lang === DEFAULT_LANG ? path : path.slice(lang.length + 1) || '/';
};

/** A site path in a language: localizePath('/about/', 'hi') -> '/hi/about/'. Leaves outside links and #anchors alone. */
export const localizePath = (path: string, lang: Lang) => {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const bare = stripLang(path);
  return lang === DEFAULT_LANG ? bare : `/${lang}${bare === '/' ? '/' : bare}`;
};

/** getStaticPaths for a page built once per language: [...lang] is empty for English and 'hi' for Hindi. */
export const langParams = () => LANGS.map((l) => ({ lang: l === DEFAULT_LANG ? undefined : l }));

/** Combine per-language params with a page's own params */
export const withLangs = <P extends Record<string, string | undefined>, Props>(paths: { params: P; props?: Props }[]) =>
  langParams().flatMap((lp) => paths.map((p) => ({ ...p, params: { ...p.params, ...lp } })));

/** Pick the right language from a { en, hi } object, falling back to English. */
export const pick = <T>(byLang: Partial<Record<Lang, T>> & { en: T }, lang: Lang): T => byLang[lang] ?? byLang.en;
