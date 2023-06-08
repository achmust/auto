import { NavLink, Outlet } from "react-router-dom";

type Props = {
  admin: boolean;
};
export const NewProfile = (props: Props) => {
  return (
    <div className="container">
      <div className="w-100 d-flex justify-content-around pt-3 flex-wrap">
        {props.admin && (
          <NavLink
            to="administrator"
            className={({ isActive }) =>
              isActive
                ? "choise-btn m-1 center active"
                : "choise-btn m-1 center"
            }
          >
            Naujas administratorius
          </NavLink>
        )}
        <NavLink
          to="user"
          className={({ isActive }) =>
            isActive ? "choise-btn m-1 center active" : "choise-btn m-1 center"
          }
        >
          Naujas klientas
        </NavLink>
        <NavLink
          to="worker"
          className={({ isActive }) =>
            isActive ? "choise-btn m-1 center active" : "choise-btn m-1 center"
          }
        >
          Naujas Darbuotojas
        </NavLink>
      </div>
      <div className="pt-5">
        <Outlet />
      </div>
    </div>
  );
};
