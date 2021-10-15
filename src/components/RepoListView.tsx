import React from "react";
import { RemoteData } from "@devexperts/remote-data-ts";
import {
  Heading,
  Skeleton,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Stack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import { NetworkError, zip, partition } from "../utils";
import { User } from "../models/user";
import { Repo } from "../models/repo";

type RepoViewProps = {
  user: RemoteData<NetworkError, User>;
  repos: RemoteData<NetworkError, Repo[]>;
  page: number;
  reposPerPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

function RepoListView({
  repos,
  user,
  page,
  reposPerPage,
  onNextPage,
  onPrevPage,
}: RepoViewProps) {
  if (
    user._tag !== "RemoteSuccess" ||
    repos._tag === "RemoteInitial" ||
    repos._tag === "RemoteFailure"
  )
    return null;

  const userInfo = user.value;
  const pageCount = Math.ceil(userInfo.public_repos / reposPerPage);

  function reposNextPage() {
    if (page === pageCount) return;
    onNextPage();
  }

  function reposPrevPage() {
    if (page === 1) return;
    onPrevPage();
  }

  return (
    <>
      <Heading>Repositories</Heading>

      {repos._tag === "RemoteSuccess" && <ReposTable repoList={repos.value} />}
      {repos._tag === "RemotePending" && <Loading />}

      <Stack direction="row" justifyContent="flex-end">
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="teal"
          variant="link"
          onClick={reposPrevPage}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Text>
          {page}/{pageCount}
        </Text>
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="link"
          onClick={reposNextPage}
          disabled={page >= pageCount}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}

export default RepoListView;

type ReposTableProps = {
  repoList: Repo[];
};

function ReposTable({ repoList }: ReposTableProps) {
  const halfIndex = Math.ceil(repoList.length / 2);
  const zippedRepoList = zip(partition(halfIndex, repoList));

  return (
    <Table variant="simple">
      <Tbody>
        {zippedRepoList.map(([firstRepo, secondRepo]) => (
          <Tr key={firstRepo.name}>
            <Td>{firstRepo.name}</Td>
            {secondRepo && <Td>{secondRepo.name}</Td>}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function Loading() {
  return (
    <Skeleton>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>loading</Td>
            <Td>loading</Td>
          </Tr>
          <Tr>
            <Td>loading</Td>
            <Td>loading</Td>
          </Tr>
          <Tr>
            <Td>loading</Td>
            <Td>loading</Td>
          </Tr>
        </Tbody>
      </Table>
    </Skeleton>
  );
}
