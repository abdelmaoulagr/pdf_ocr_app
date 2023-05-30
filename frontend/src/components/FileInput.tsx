import { useState } from 'react'
import axios from 'axios';
import AddLoi from '../AddLoi';

const url = "http://localhost:5000/add"

export const listOfIngredients=[]
function FileInput() {
  const [postFile, setPostFile] = useState( {File : ""})


  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postFile)
    document.getElementById("ouput").innerHTML=listOfIngredients[0]['data'];   }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    setPostFile({...postFile,File : base64})
  }

  return (
    <>
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="form-control"
        type="file"
        id="formFile"
        accept=".pdf"
        onChange={(e) => handleFileUpload(e)} />
      <p id='data'></p>
      <button type='submit'>Submit  </button>
    </form><div id='ouput'></div>
    </>
  );
}
export default FileInput;



const createPost = async (newFile) => {
  await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({File:newFile})
        })
        .then((res) => res.json())
        .then((data) => {
          listOfIngredients.push(data);
        })
        .then(() => {
          console.log(listOfIngredients[0]['data']);
        });

    }

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // fileReader.onload = function () {
    //   var b64 = fileReader.result.replace(/^data:.+;base64,/, '');
    //   console.log(b64);
    // };
    // fileReader.readAsDataURL(file);
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result.replace(/^data:.+;base64,/, ''))
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}