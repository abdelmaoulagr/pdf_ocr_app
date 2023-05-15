import "./App.css";
import Output from "./components/Output";
import SearchBar from "./components/Search";
import SideBar from "./components/SideBar";
import DrawerExample from "./components/Nav";
import Test from "./components/test";
import LoiCards from "./components/test1";
import File from "./File";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  var Loi = Test();
  return (
    <>
      <Router>
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
        <Routes>
          <Route path="/file" element={<File />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
