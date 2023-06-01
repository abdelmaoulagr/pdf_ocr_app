import "./App.css";
import React from "react";
import DrawerExample from "./components/Nav";
import FileInput from "./components/FileInput";
import FileOutput from "./components/FileOutput";

const FilePage: React.FC = () => {
  let data;
  return (
    <>
      <div className="All">
        <div className="nav">
          <div className="search">
            <FileInput></FileInput>
          </div>
          <div className="Drawer">
            <DrawerExample></DrawerExample>
          </div>
        </div>
        <div className="main">
          <div className="child-1">
            <FileOutput data={data}></FileOutput>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilePage;
