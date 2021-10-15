import React from "react";
import { NetworkError } from "../utils";
import { User } from "../models/user";
import { RemoteData, fold } from "@devexperts/remote-data-ts";
import {
  Heading,
  Skeleton,
  SkeletonCircle,
  Image,
  Text,
  Grid,
} from "@chakra-ui/react";

type UserViewProps = {
  user: RemoteData<NetworkError, User>;
  username: string;
};

function UserView({ user, username }: UserViewProps) {
  return fold(
    () => null,
    () => <Loading />,
    (err: NetworkError) => <Error err={err} username={username} />,
    (userInfo: User) => <UserInfo user={userInfo} />
  )(user);
}

export default UserView;

function Loading() {
  return (
    <>
      <SkeletonCircle size="160" />
      <Skeleton height="40px" maxW="250px" mr="20px" />
      <Skeleton height="20px" maxW="450px" mr="20px" />
      <Skeleton height="20px" maxW="450px" mr="20px" />
      <Skeleton height="20px" maxW="450px" mr="20px" />
      <Skeleton height="20px" maxW="450px" mr="20px" />
      <Skeleton height="20px" maxW="450px" mr="20px" />
    </>
  );
}

type ErrorProps = {
  err: NetworkError;
  username: string;
};

function Error({ err, username }: ErrorProps) {
  switch (err._tag) {
    case "NotFound":
      return <Heading>{`Username '${username}' was not found.`}</Heading>;

    case "InternalServerError":
      return <Heading>Internal Server Error</Heading>;
  }
}

type UserInfoProps = {
  user: User;
};

function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      <Image
        borderRadius="full"
        boxSize="180px"
        src={user.avatar_url}
        alt={user.name}
      />
      <Heading>{user.name}</Heading>

      <InfoItem label="Username" value={user.login} />
      <InfoItem label="Followers" value={`${user.followers}`} />
      <InfoItem label="Following" value={`${user.following}`} />
      {user.bio && user.bio !== "" && <InfoItem label="Bio" value={user.bio} />}
      {user.location && user.location !== "" && (
        <InfoItem label="Location" value={user.location} />
      )}
      {user.blog && user.blog !== "" && (
        <InfoItem label="Blog" value={user.blog} />
      )}
    </>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Grid templateColumns="120px auto">
      <Text fontSize="md">{label}:</Text>
      <Text fontSize="lg">{value}</Text>
    </Grid>
  );
}
