import { Input, HStack, Button } from "@chakra-ui/react";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
}
export interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type UsernameInputProps = {
  onSubmit: (event: React.FormEvent<UsernameFormElement>) => void;
  isLoading: boolean;
};

function UsernameInput({ onSubmit, isLoading }: UsernameInputProps) {
  return (
    <form onSubmit={onSubmit}>
      <HStack>
        <Input id="username" placeholder="Username" size="lg" />
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          isLoading={isLoading}
        >
          Search
        </Button>
      </HStack>
    </form>
  );
}

export default UsernameInput;
