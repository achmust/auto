import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../header/navbar";
import { User } from "../../types/types";
import { Footer } from "../footer/footer";
import { AdminNavbar } from "../admin/navbar/navbar";

type Props = {
  user?: User;
  role?: string;
  logOut: () => void;
};
export const Skeleton = (props: Props) => {
  const [expandSide, setExpandSide] = useState<boolean>(false);
  useEffect(() => {
    if (props.user?.id) {
      setExpandSide(true);
    }
  }, [props.user]);
  return (
    <div className="skeleton d-flex flex-column">
      {props.role && props.role != "user" ? (
        <AdminNavbar
          {...props}
          setExpandSide={setExpandSide}
          expandSide={expandSide}
        />
      ) : (
        <Navbar
          {...props}
          setExpandSide={setExpandSide}
          expandSide={expandSide}
        />
      )}
      <div className="skeleton-body d-flex">
        <div
          className={`body body-${expandSide ? "open" : "close"}`}
          style={{
            width: expandSide ? "95%" : "100%",
            minHeight: "120vh",
            position: "relative",
          }}
        >
          <Outlet />
          <Footer expand={expandSide} />
        </div>
      </div>
    </div>
  );
};
