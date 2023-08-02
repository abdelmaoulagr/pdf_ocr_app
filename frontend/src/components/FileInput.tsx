import { useState } from "react";
import axios from "axios";
import AddLoi from "../AddLoi";
import LoiCards from "./AdminOutput";
import { Spinner } from "@chakra-ui/react";

let urlT = "http://localhost:5000/addLoi";

export const listOfIngredients = [];
function FileInput({ handleRefresh, url }) {
  const [postFile, setPostFile] = useState({ File: "" });
  if (url != urlT) {
    urlT = "http://localhost:5000/userFile";
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postFile);
    //handleRefresh(true);
    setTimeout(handleRefresh, 7000, true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    setPostFile({ ...postFile, File: base64 });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex" }}>
        <input
          className="form-control"
          type="file"
          id="formFile"
          accept=".pdf"
          onChange={(e) => handleFileUpload(e)}
          style={{ flexBasis: "90%" }}
        />
        <button
          type="submit"
          className="btn btn-secondary ml-3"
          style={{ flexBasis: "10%" }}
        >
          Submit
        </button>
      </form>
    </>
  );
}
export default FileInput;

const createPost = async (newFile) => {
  await fetch(urlT, {
    method: "POST",
    headers: {
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ File: newFile }),
  })
    .then((res) => res.json())
    .then((data) => {
      listOfIngredients.push(data);
    })
    .then(() => {
      console.log(listOfIngredients[0]["data"]);
    });
};
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // fileReader.onload = function () {
    //   var b64 = fileReader.result.replace(/^data:.+;base64,/, '');
    //   console.log(b64);
    // };
    // fileReader.readAsDataURL(file);
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result.replace(/^data:.+;base64,/, ""));
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
