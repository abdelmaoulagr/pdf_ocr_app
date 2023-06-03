import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

function LoginForm() {
// had joj vars gha zathom kan7amre code dyal AddAdminComponent.tsx
  const loginRef = useRef<HTMLInputElement>(null);
  const passRet = useRef<HTMLInputElement>(null);

  // hadi function dial search jabtha hone (:

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    // gad gad hadchi matmsa7 gra 3ad msa7 rani bdlt fiha

    event.preventDefault(); // Prevent form submission
    const login = (document.getElementById("floatingInput") as HTMLInputElement)
      ?.value;
      // chof wach login shih
    const pass=//akmil ma yalii (;

    //to see data 
    console.log({
      login:login,
      pass:pass
    });


    // fetch function to get data from Flask
    fetch('http://127.0.0.1:5000/login', {
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
      });
    }
    // khasna nzido form hon bach nkhdmo entre key ana knt gail3ndha wajda ,
    // o password khalihli 3adi ana nhashih wla lhala yhashi booh lwa9t ma kain 
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
            ref={loginRef}
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
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
      </CardBody>
    </Card>
  );
}
export default LoginForm;
