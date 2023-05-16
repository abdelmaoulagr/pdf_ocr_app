import "./App.css";
import SearchBar from "./components/Search";
import DrawerExample from "./components/Nav";
import Test from "./components/test";
import LoiCards from "./components/test1";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  var Loi = Test();
  return (
    <>
      
        <div className="All">
          <div className="nav">
            <div className="search">
              <SearchBar></SearchBar>
            </div>
            <div className="Drawer">
              <DrawerExample></DrawerExample>
            </div>
          </div>
          <div className="main">
            <div className="child-1">
              <LoiCards lois={Loi} />
            </div>
          </div>
        </div>
      
    </>
  );
}

export default App;
