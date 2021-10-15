import { RemoteData } from "@devexperts/remote-data-ts";

import { NetworkError, fetchJson } from "../utils";

export type User = {
  id: number;
  avatar_url: string;
  name: string;
  login: string;
  bio: string | null;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  public_repos: number;
};

export function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

export function getUser(
  username: string
): Promise<RemoteData<NetworkError, User>> {
  return fetchJson(getUserUrl(username));
}
