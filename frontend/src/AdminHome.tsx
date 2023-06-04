import "./App.css";
import SearchBar from "./components/Search";
import AdminDrawer from "./components/AdminNav";
import Test from "./components/test";
import LoiCards from "./components/AdminOutput";
import DataTest from "./components/data_test";
import { useState } from "react";
import { listOfSearch } from "./components/Search";

function AdminHome() {
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
            <AdminDrawer></AdminDrawer>
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

export default AdminHome;
