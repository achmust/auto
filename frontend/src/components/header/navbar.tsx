import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { User } from "../../types/types";
const SidebarData = [
  {
    title: "Vizitai",
    path: "visits",
    icon: <FaIcons.FaListAlt />,
    cName: "nav-text",
  },
  {
    title: "Mano autobomiliai",
    path: "cars",
    icon: <FaIcons.FaCarSide />,
    cName: "nav-text",
  },
  {
    title: "Rezervacija",
    path: "reservation",
    icon: <FaIcons.FaRegCalendarCheck />,
    cName: "nav-text",
  },
  {
    title: "Profilis",
    path: "profile",
    icon: <CgIcons.CgProfile />,
    cName: "nav-text",
  },
];
type Props = {
  user?: User;
  logOut: () => void;
  expandSide: boolean;
  setExpandSide: React.Dispatch<React.SetStateAction<boolean>>;
};
function Navbar(props: Props) {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar position-fixed w-100 t-0">
          {props.user && (
            <ul className="w-25">
              <li>
                <Link to="#" className="menu-bars mb-4">
                  <FaIcons.FaBars
                    onClick={() => {
                      props.setExpandSide((prev) => !prev);
                    }}
                  />
                </Link>
              </li>
            </ul>
          )}
          <ul className="main-links w-75">
            <li className="nav-text">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Pagrindinis
              </NavLink>
            </li>
            <li className="nav-text">
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Apie mus
              </NavLink>
            </li>
            <li className="nav-text">
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Kontaktai
              </NavLink>
            </li>
            {props.user && (
              <li className="nav-text">
                <NavLink
                  to="/reservation"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Rezervacija
                </NavLink>
              </li>
            )}
          </ul>
          {!props.user && (
            <ul className="d-flex w-25">
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/login"
                >
                  Prisijungti
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/registration"
                >
                  Registruotis
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <nav className={props.expandSide ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items p-0">
            <li
              className="navbar-toggle"
              onClick={() => {
                props.setExpandSide((prev) => !prev);
              }}
            >
              <NavLink
                to="#"
                className={({ isActive }) =>
                  isActive ? "menu-bars active" : "menu-bars"
                }
              >
                <AiIcons.AiOutlineClose />
              </NavLink>
            </li>
            <div className="nav-main-links">
              <li className="nav-text">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <AiIcons.AiFillHome />
                  <span>Pagrindinis</span>
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <SiIcons.SiAboutdotme />
                  <span>Apie mus</span>
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  to="/registration"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <MdIcons.MdContactPhone />
                  <span>Kontaktai</span>
                </NavLink>
              </li>
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
            <li className={`nav-text`}>
              <div>
                <AiIcons.AiOutlineUser />
                <span>{props.user?.fullname}</span>
              </div>
            </li>
            <li
              className={`nav-text`}
              onClick={() => {
                props.logOut();
                props.setExpandSide(false);
              }}
            >
              <Link to="#">
                <CgIcons.CgLogOut />
                <span>Atsijungti</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
