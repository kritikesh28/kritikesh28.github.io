// The Curious Question bank as one small file the question card loads after the page: /questions.json and /hi/questions.json
import type { APIRoute } from 'astro';
import { getAllQuestions } from '../../data/curious-questions';
import { langParams, type Lang } from '../../i18n/config';

export const getStaticPaths = () => langParams().map((params) => ({ params }));
export const GET: APIRoute = ({ params }) => {
  const lang = (params.lang ?? 'en') as Lang;
  const list = getAllQuestions(lang).map((q) => ({ q: q.q, a: q.a, t: q.topic, ...(q.link ? { l: q.link } : {}) }));
  return new Response(JSON.stringify(list), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
