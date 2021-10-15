import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RemoteData, pending } from "@devexperts/remote-data-ts";
import Head from "next/head";
import { Divider } from "@chakra-ui/react";

import { NetworkError } from "../../utils";
import { User, getUser } from "../../models/user";
import { Repo, getRepos, reposPerPage } from "../../models/repo";
import BackButton from "../../components/BackButton";
import UserView from "../../components/UserView";
import RepoListView from "../../components/RepoListView";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] =
    React.useState<RemoteData<NetworkError, User>>(pending);
  const [repos, setRepos] =
    React.useState<RemoteData<NetworkError, Repo[]>>(pending);
  const [reposPage, setReposPage] = React.useState(1);

  const username = router.query.username as string;

  function modifyReposPage(f: (x: number) => number) {
    const newPage = f(reposPage);
    setRepos(pending);

    getRepos(username, newPage).then((newRepos) => {
      setRepos(newRepos);
      setReposPage(newPage);
    });
  }

  useEffect(() => {
    if (!router.isReady) return;

    Promise.all([getUser(username), getRepos(username, reposPage)]).then(
      ([user, repos]) => {
        setUser(user);
        setRepos(repos);
      }
    );
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>GitHub Pofile</title>
      </Head>

      <BackButton onClick={() => router.push("/")} />
      <UserView user={user} username={username} />
      <Divider />
      <RepoListView
        repos={repos}
        user={user}
        page={reposPage}
        reposPerPage={reposPerPage}
        onNextPage={() => modifyReposPage((page) => page + 1)}
        onPrevPage={() => modifyReposPage((page) => page - 1)}
      />
    </>
  );
}
