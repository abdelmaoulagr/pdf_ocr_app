import "./AddAdmin.css";
import AdminDrawer from "./components/AdminNav";
import AddAdminComponent from "./components/AddAdminComponent";

function AddAdmin() {
  return (
    <>
      <div className="All">
        <div className="nav">
          <div className="search"></div>
          <div className="Drawer">
            <AdminDrawer></AdminDrawer>
          </div>
        </div>
        <div className="main">
          <div className="child-1">
            <AddAdminComponent></AddAdminComponent>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;
