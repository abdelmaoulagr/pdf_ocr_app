import { useState } from "react";
import axios from "axios";
import AddLoi from "../AddLoi";
import LoiCards from "./AdminOutput";

const url = "http://localhost:5000/add";

export const listOfIngredients = [];
const createPost = async (newFile) => {
  await fetch(url, {
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
function FileInput({ handleRefresh }) {
  const [postFile, setPostFile] = useState({ File: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postFile);
    handleRefresh(true);
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
