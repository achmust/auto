import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "../../helpers/dialog";
import { url } from "../../helpers/url";
import { UserInfo } from "../../types/types";
import { UserForm } from "../forms/userForm";

type Props = {
  userid: number;
};

export const Profile = (props: Props) => {
  const [epxandAlert, setEpxandAlert] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo>({
    id: 0,
    name: "",
    surname: "",
    tel: "",
    email: "",
  });
  useEffect(() => {
    if (props.userid) {
      axios.post(`${url}/getuser`, { id: props.userid }).then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      });
    }
  }, [props.userid]);
  const submit = (e: any) => {
    e.preventDefault();
    axios.post(`${url}/user/update`, user).then((data) => {
      if (data.data.success) {
        setEpxandAlert(true);
        setTimeout(() => {
          setEpxandAlert(false);
        }, 2000);
      }
    });
  };
  return (
    <>
      <div className="container">
        <div className="reservation">
          <div className="reservation-header center">
            <h1>Vartotojo duomenys</h1>
          </div>
          <div className="reservation-body">
            <form onSubmit={submit} className="d-flex flex-column">
              <UserForm setUser={setUser} {...user} />
              <button type="submit" className="custom-btn">
                Redaguoti
              </button>
            </form>
          </div>
        </div>
      </div>
      {epxandAlert && (
        <Dialog title="Sėkmingai!" text="Redagavimas sėkmingas !" />
      )}
    </>
  );
};
