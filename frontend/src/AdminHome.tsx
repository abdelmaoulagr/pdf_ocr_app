import "./App.css";
import SearchBar from "./components/Search";
import AdminDrawer from "./components/AdminNav";
import Test from "./components/test";
import LoiCards from "./components/AdminOutput";

function AdminHome() {
  var Loi = Test();
  return (
    <>
      <div className="All">
        <div className="nav">
          <div className="search">
            <SearchBar></SearchBar>
          </div>
          <div className="Drawer">
            <AdminDrawer></AdminDrawer>
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

export default AdminHome;
