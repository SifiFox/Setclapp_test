import { useEffect, useState } from "react";

const SEARCH_PARAM_KEY = "search";

const getSearchFromUrl = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return (
    new URLSearchParams(window.location.search).get(SEARCH_PARAM_KEY) ?? ""
  );
};

export const useSearchQueryParam = () => {
  const [search, setSearch] = useState(getSearchFromUrl);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (search) {
      params.set(SEARCH_PARAM_KEY, search);
    } else {
      params.delete(SEARCH_PARAM_KEY);
    }

    const queryString = params.toString();
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}${window.location.hash}`;

    window.history.replaceState(window.history.state, "", nextUrl);
  }, [search]);

  useEffect(() => {
    const handlePopState = () => {
      setSearch(getSearchFromUrl());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return [search, setSearch] as const;
};
