import { failure, success, RemoteData } from "@devexperts/remote-data-ts";

export type NotFound = {
  _tag: "NotFound";
};

export const notFound: NetworkError = { _tag: "NotFound" };

export type InternalServerError = {
  _tag: "InternalServerError";
};

export const internalServerError: NetworkError = {
  _tag: "InternalServerError",
};

export type NetworkError = NotFound | InternalServerError;

export async function fetchJson<T>(
  url: string
): Promise<RemoteData<NetworkError, T>> {
  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return failure(notFound);
    }
    if (response.status !== 200) {
      return failure(internalServerError);
    }

    const repos: T = await response.json();
    return success(repos);
  } catch (err) {
    return failure(internalServerError);
  }
}

export function zip<A, B>([xs, ys]: [A[], B[]]): [A, B][] {
  return xs.map((item, i) => {
    return [item, ys[i]];
  });
}

export function partition<A>(idx: number, xs: A[]): [A[], A[]] {
  const firstHalfOfArray = xs.slice(0, idx);
  const secondHalfOfArray = xs.slice(idx);

  return [firstHalfOfArray, secondHalfOfArray];
}
