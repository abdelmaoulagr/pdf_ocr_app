import "./App.css";
import AdminDrawer from "./components/AdminNav";
import Test from "./components/test";
import LoiCards from "./components/AdminOutput";
import FileInput from "./components/FileInput";
import { listOfIngredients } from "./components/FileInput";
import { useState } from "react";

function AddLoi() {
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  let url = "http://localhost:5000/addLoi";
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
            <FileInput handleRefresh={handleRefresh} url={url}></FileInput>
          </div>
          <div className="Drawer">
            <AdminDrawer></AdminDrawer>
          </div>
        </div>
        <div className="main">
          <div className="child-1">
            {listOfIngredients.length != 0 ? (
              <LoiCards key={refreshKey} lois={listOfIngredients} />
            ) : (
              <p>List is empty</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLoi;
