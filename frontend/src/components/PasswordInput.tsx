import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import React from "react";
import "./AddAdminComponent.css";

function PasswordInput() {
  // const passRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="password"
        id="input"
        // ref={passRef}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
export default PasswordInput;
