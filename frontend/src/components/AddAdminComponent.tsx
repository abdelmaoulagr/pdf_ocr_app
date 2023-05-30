import React, { useRef } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";

function AddAdminComponent() {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    // Add button logic here
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
          <PasswordInput />
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
