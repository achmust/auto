import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { User } from "../../../types/types";
const SidebarData = [
  {
    title: "Rezervacijos",
    path: "/admin/reservations",
    icon: <FaIcons.FaListAlt />,
    cName: "nav-text",
  },
  {
    title: "Klientų autobomiliai",
    path: "/admin/cars",
    icon: <FaIcons.FaCarSide />,
    cName: "nav-text",
  },
  {
    title: "Nauja rezervacija",
    path: "/admin/reservation",
    icon: <FaIcons.FaRegCalendarCheck />,
    cName: "nav-text",
  },
  {
    title: "Kalendorius",
    path: "/admin/schedule",
    icon: <AiIcons.AiOutlineSchedule />,
    cName: "nav-text",
  },
  {
    title: "Nauja paskyra",
    path: "/admin/create",
    icon: <RiIcons.RiUserAddFill />,
    cName: "nav-text",
  },
  {
    title: "Visos paskyros",
    path: "/admin/profiles",
    icon: <RiIcons.RiUserFill />,
    cName: "nav-text",
  },
  {
    title: "Darbuotojai",
    path: "/admin/workers",
    icon: <FaIcons.FaUserFriends />,
    cName: "nav-text",
  },
];
type Props = {
  user?: User;
  logOut: () => void;
  expandSide: boolean;
  setExpandSide: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AdminNavbar = (props: Props) => {
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
              <Link to="/">Pagrindinis</Link>
            </li>
            <li className="nav-text">
              <Link to="/about">Apie mus</Link>
            </li>
            <li className="nav-text">
              <Link to="/contact">Kontaktai</Link>
            </li>
            <li className="nav-text">
              <Link to="/admin/reservation">Rezervacija</Link>
            </li>
          </ul>
          {!props.user && (
            <ul className="d-flex w-25">
              <li className="nav-text">
                <Link to="/login">Prisijungti</Link>
              </li>
              <li className="nav-text">
                <Link to="/registration">Registruotis</Link>
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
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className="nav-main-links">
              <li className="nav-text">
                <Link to="/">
                  <AiIcons.AiFillHome />
                  <span>Pagrindinis</span>
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/about">
                  <SiIcons.SiAboutdotme />
                  <span>Apie mus</span>
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/registration">
                  <MdIcons.MdContactPhone />
                  <span>Kontaktai</span>
                </Link>
              </li>
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
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
};
