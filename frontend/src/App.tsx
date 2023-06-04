import "./App.css";
import SearchBar from "./components/Search";
import DrawerExample from "./components/Nav";
import DataTest from "./components/data_test";
import LoiCards from "./components/Output";
import { useState } from "react";
import { listOfSearch } from "./components/Search";
function App() {
  var Loi = DataTest();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = (isLoaded: any) => {
    if (isLoaded) {
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };
  return (
    <>
      <div className="All">
        <div className="nav">
          <div className="search">
            <SearchBar handleRefresh={handleRefresh}></SearchBar>
          </div>
          <div className="Drawer">
            <DrawerExample></DrawerExample>
          </div>
        </div>
        <div className="main">
          <div className="child-1">
            {listOfSearch.length != 0 ? (
              <LoiCards key={refreshKey} lois={listOfSearch} />
            ) : (
              <LoiCards key={refreshKey} lois={Loi} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
