import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Stack } from "@chakra-ui/react";
import React from "react";

type BackButtonProps = {
  onClick: (event?: React.MouseEvent<HTMLElement>) => void;
};

function BackButton({ onClick }: BackButtonProps) {
  return (
    <Stack direction="row">
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="teal"
        variant="link"
        onClick={onClick}
      >
        Back
      </Button>
    </Stack>
  );
}

export default BackButton;
