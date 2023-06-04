import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import React, { useRef } from "react";

function LoginForm() {
  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  let login: string;
  let pass: string;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formRef.current!.submit();
      login = loginRef.current!.value;
      pass = passRef.current!.value;
      console.log({
        login: login,
        pass: pass,
      });
    }
    // fetch function to get data from Flask
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        pass: pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  // khasna nzido form hon bach nkhdmo entre key ana knt gail3ndha wajda ,
  // o password khalihli 3adi ana nhashih wla lhala yhashi booh lwa9t ma kain
  return (
    <Card variant={"elevated"}>
      <CardHeader>
        <Heading size="md">Login</Heading>
      </CardHeader>
      <CardBody>
        <form ref={formRef}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Login"
              ref={loginRef}
              onKeyDown={handleKeyPress}
            />
            <label htmlFor="floatingInput">Login</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              ref={passRef}
              onKeyDown={handleKeyPress}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button type="submit" style={{ display: "none" }}></button>
        </form>
      </CardBody>
    </Card>
  );
}
export default LoginForm;
