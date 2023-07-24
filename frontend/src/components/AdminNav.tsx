import { AddIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
function AdminDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const logoutUser = async () => {
    await fetch("http://127.0.0.1:5000/logout", {
          method: "POST",
      })
    window.location.href = "/";
  };
  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Menu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>

          <DrawerBody>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/adminhome"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add">
                  Add Loi
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/addadmin">
                  Add Admin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Admin List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={logoutUser}>
                  Logout
                </a>
              </li>
            </ul>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">OAR</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AdminDrawer;
