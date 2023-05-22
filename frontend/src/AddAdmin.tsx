import "./AddAdmin.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

function AddAdmin() {
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
          <Input placeholder="First name" id="input" />
          <FormLabel>
            <h5>Last Name</h5>
          </FormLabel>
          <Input placeholder="Last name" id="input" />
        </FormControl>
      </div>
    </>
  );
}
export default AddAdmin;
