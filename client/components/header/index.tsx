import { Icon24MenuOutline } from "@vkontakte/icons";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setDrawer } from "../../lib/redux/ui/reducer";
import Avatar from "../avatar";
import Button from "../button";
import Drawer from "../drawer";
import Navigation from "./navigation";

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-neutral-100 shadow-md w-full h-14">
      <header className="container mx-auto h-full space-x-4 px-2 flex items-center justify-between">
        <Button
          to="/"
          variant="text"
          className="flex items-center space-x-2 px-0 md:pr-2"
          size="medium"
        >
          <Avatar src={"/images/logo.jpg"} variant="rounded" size="medium" />
          <h1 className="text-xl hidden md:block">Песочница</h1>
        </Button>
        <Navigation className="hidden sm:flex" />
        <Button
          onClick={() =>
            dispatch(
              setDrawer(
                <Drawer>
                  <Navigation forDrawer />
                </Drawer>
              )
            )
          }
          variant="text"
          icon
          className="sm:hidden"
        >
          <Icon24MenuOutline />
        </Button>
      </header>
    </div>
  );
};

export default Header;
