import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import React, { useRef } from "react";

function LoginForm() {
  // had joj vars gha zathom kan7amre code dyal AddAdminComponent.tsx
  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  // hadi function dial search jabtha hone (:

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    // gad gad hadchi matmsa7 gra 3ad msa7 rani bdlt fiha

    event.preventDefault(); // Prevent form submission
    /*const login = loginRef.current!.value,
    const pass = passRef.current!.value,*/
    //to see data
    console.log({
      login: loginRef.current!.value,
      pass: passRef.current!.value,
    });

    // fetch function to get data from Flask
    /* fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
          },
      body: JSON.stringify({
        login:login,
        pass:pass
      })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });*/
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin(event.currentTarget.form!);
    }
  };
  // khasna nzido form hon bach nkhdmo entre key ana knt gail3ndha wajda ,
  // o password khalihli 3adi ana nhashih wla lhala yhashi booh lwa9t ma kain
  return (
    <Card variant={"elevated"}>
      <CardHeader>
        <Heading size="md">Login</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleLogin}>
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
