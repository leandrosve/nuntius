import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { AiFillAlipayCircle } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import DropdownMenu, { DropdownItem } from "./util/DropdownMenu";
import { useTranslation } from "react-i18next";
import Modal from "./util/Modal";
import {
  BsPeopleFill,
  BsGearFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { render } from "@testing-library/react";

function Nav() {
  const { t } = useTranslation();
  const MenuButton = () => {
    const [open, setOpen] = useState(false);
    const openMenu = () => {
      setOpen(!open);
    };

    const openContacts = () => {
      setOpen(!open);
      render(<Modal title="Contactos"></Modal>);
    };

    return (
      <>
        <span onClick={openMenu}>
          <BsList
            className={"Nav-menuButton " + (open && "Nav-menuButton--open")}
          />
        </span>
        {open && (
          <DropdownMenu>
            <DropdownItem
              onClick={openContacts}
              icon={<BsPeopleFill />}
              text={t("contacts")}
            />
            <DropdownItem
              icon={<BsFillPersonLinesFill />}
              text={t("profile")}
            />
            <DropdownItem icon={<BsGearFill />} text={t("settings")} />
          </DropdownMenu>
        )}
      </>
    );
  };

  return (
    <div className="Nav">
      <div className="Nav-content">
        <MenuButton />

        <AiFillAlipayCircle className="Nav-logo" />
        <h1>NUNTIUS</h1>
        <div className="Nav-links">
          <Link to="/logout">{t("logout")}</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
