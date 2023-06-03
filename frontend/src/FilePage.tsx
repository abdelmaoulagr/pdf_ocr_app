import "./App.css";
import React from "react";
import DrawerExample from "./components/Nav";
import FileInput from "./components/FileInput";
import FileOutput from "./components/FileOutput";

let url='http://localhost:5000/userFile'
// FileOutput fiha wahd url khso ytbdl marft kifach ghnbdlo 
// fach ykon admin y3nid ajouter loi khas ykhdm url khas bih 
// o yla kan user khas ykhdm had url f FileOutput, understood?
const FilePage: React.FC = () => {
  let data={
    'title':'Text from file',
    'text':'Au sens de la prsente loi, on entend par.... '
  };
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
