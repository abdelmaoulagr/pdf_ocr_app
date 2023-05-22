import "./App.css";
import AdminDrawer from "./components/AdminNav";
import Test from "./components/test";
import LoiCards from "./components/AdminOutput";
import FileInput from "./components/FileInput";

function AddLoi() {
  var Loi = Test();
  return (
    <>
      <div className="All">
        <div className="nav">
          <div className="search">
            <FileInput></FileInput>
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

export default AddLoi;
