import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

function LoginForm() {
  return (
    <Card variant={"elevated"}>
      <CardHeader>
        <Heading size="md">Login</Heading>
      </CardHeader>
      <CardBody>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Login"
          />
          <label htmlFor="floatingInput">Login</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
      </CardBody>
    </Card>
  );
}
export default LoginForm;
