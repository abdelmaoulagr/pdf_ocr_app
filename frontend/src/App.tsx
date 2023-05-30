import "./App.css";
import SearchBar from "./components/Search";
import DrawerExample from "./components/Nav";
import LoiCards from "./components/Output";
import DataTest from "./components/data_test";


function App() {
  var Loi =DataTest() ;
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
            <LoiCards lois={Loi}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
