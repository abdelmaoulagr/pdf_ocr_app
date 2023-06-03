import React, { useRef } from "react";
import { InputGroup, InputRightElement, Button } from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
//function to add admin ,i need password bro
// don't f**king touch this function
const addadmin = async (first_N, last_N, login, email, phone) => {
  await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: first_N,
      lastName: last_N,
      login: login,
      email: email,
      phoneNumber: phone,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // listOfIngredients.push(data);
    });
  // .then(() => {
  //   console.log(listOfIngredients[0]["data"]);
  // });
};

function AddAdminComponent() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  // password winooo winooo !!
  //
  const handleAdd = () => {
    // Add button logic here
    console.log({
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      login: loginRef.current!.value,
      password: passRef.current!.value,
      email: emailRef.current!.value,
      phoneNumber: phoneNumberRef.current!.value,
    });

    // arbab back end mya mya bass we need passowrd
    addadmin(
      firstNameRef.current!.value,
      lastNameRef.current!.value,
      loginRef.current!.value,
      emailRef.current!.value,
      phoneNumberRef.current!.value
    );
  };

  const handleCancel = () => {
    firstNameRef.current!.value = "";
    lastNameRef.current!.value = "";
    loginRef.current!.value = "";
    emailRef.current!.value = "";
    phoneNumberRef.current!.value = "";
  };

  return (
    <>
      <div className="body">
        <center>
          <h1>Add Admin</h1>
        </center>
        <FormControl>
          <FormLabel>
            <h5>First Name</h5>
          </FormLabel>
          <Input placeholder="First name" id="input" ref={firstNameRef} />
          <FormLabel>
            <h5>Last Name</h5>
          </FormLabel>
          <Input placeholder="Last name" id="input" ref={lastNameRef} />
          <FormLabel>
            <h5>Login</h5>
          </FormLabel>
          <Input placeholder="Login" id="input" ref={loginRef} />
          <FormLabel>
            <h5>Password</h5>
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="password"
              id="input"
              ref={passRef}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormLabel>
            <h5>Email address</h5>
          </FormLabel>
          <Input type="email" placeholder="Email" id="input" ref={emailRef} />
        </FormControl>
        <FormLabel>
          <h5>Phone number</h5>
        </FormLabel>
        <Input placeholder="Tel" id="input" ref={phoneNumberRef} />

        {/* Add and Cancel Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="btn btn-success me-2"
            type="button"
            onClick={handleAdd}
          >
            Add
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleCancel}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default AddAdminComponent;
