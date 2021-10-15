import { RemoteData } from "@devexperts/remote-data-ts";

import { NetworkError, fetchJson } from "../utils";

export type Repo = {
  id: number;
  name: string;
  html_url: string;
};

export const reposPerPage = 6;

export function getRepoListUrl(username: string, page: number) {
  return `https://api.github.com/users/${username}/repos?page=${page}&per_page=${reposPerPage}&sort=updated`;
}

export function getRepos(
  username: string,
  page: number
): Promise<RemoteData<NetworkError, Repo[]>> {
  return fetchJson(getRepoListUrl(username, page));
}
