import { useRouter } from 'next/router';
import { useState } from 'react';

type Props<T> = {
  initValue?: T;
};

type ResultProps<T> = {
  query: T;
  setQuery: (data: T) => void;
};

const getPathSearch = (pathStr?: string): string => {
  const queryPath = pathStr ?? window.location.search;
  const path = decodeURIComponent(queryPath);
  const splitPath = path.split('?');

  return splitPath.length > 1 ? splitPath[1] : '';
};

const getInitQuery = <T>(initValue?: T, path?: string): T => {
  const pathQuery = getPathSearch(path);

  if (!pathQuery) {
    return initValue as T;
  }

  const query = new URLSearchParams(pathQuery);

  return { ...initValue, ...Object.fromEntries(query) } as T;
};

export const useRouteState = <T extends object>(props?: Props<T>): ResultProps<T> => {
  const router = useRouter();
  const initQuery = getInitQuery<T>(props?.initValue, router.asPath);
  const [query, setQuery] = useState<T>({ ...initQuery });

  return {
    query,
    setQuery: (data: T) => setQuery(data),
  };
};
