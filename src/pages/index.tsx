import React from "react";
import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useToast } from "@chakra-ui/react";
import Router from "next/router";
import { RemoteData, pending, initial } from "@devexperts/remote-data-ts";

import { NetworkError } from "../utils";
import { User, getUser } from "../models/user";
import UsernameInput, {
  UsernameFormElement,
} from "../components/UsernameInput";

export default function Home() {
  const toast = useToast();
  const [user, setUser] =
    React.useState<RemoteData<NetworkError, User>>(initial);

  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();

    if (user._tag === "RemotePending") return;

    const username = event.currentTarget.elements.username.value;

    setUser(pending);

    getUser(username).then((user) => {
      setUser(user);

      if (user._tag === "RemoteFailure") {
        handleErrors(user.error, username);
      }

      if (user._tag === "RemoteSuccess") {
        Router.push(`/profile/${username}`);
      }
    });
  }

  function handleErrors(err: NetworkError, username: string) {
    if (err._tag === "NotFound") {
      toast({
        description: `Username "${username}" not found`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (err._tag === "InternalServerError") {
      toast({
        description: "Internal server error",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <>
      <Head>
        <title>GitHub Username Search</title>
      </Head>

      <Heading
        fontSize="36px"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        GitHub Username Search
      </Heading>

      <UsernameInput
        onSubmit={handleSubmit}
        isLoading={
          user._tag === "RemotePending" || user._tag === "RemoteSuccess"
        }
      />
    </>
  );
}
