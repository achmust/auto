import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Input } from "../../helpers/inputs/input";
import { LogInValues, User } from "../../types/types";
import { url } from "../../helpers/url";
import { MdEmail } from "react-icons/md";
import { Alert } from "../../helpers/alert";

type Props = {
  autintification: () => void;
};
export const LoginForm = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [values, setValues] = useState<LogInValues>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = (e: any) => {
    e.preventDefault();
    if (values.email == "" || values.password == "") {
      setExpand(true);
      setMsg("Užpildykite visus laukus !");
    } else {
      axios
        .post(`${url}/login`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data.success) {
            const { token, id } = res.data;
            localStorage.setItem("token", token);
            props.autintification();
            navigate("/");
          } else {
            setExpand(true);
            setMsg("Blogas elektroninis paštas arba slaptažodis !");
          }
        });
    }
  };
  const handleInput = (e: any) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <>
      <div className="container">
        <div className="contact_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="contact_taital">Prisijungimas</h1>
              </div>
            </div>
            <div className="contact_section_2">
              <div className="row">
                <div className="col-md-12">
                  <div className="mail_section map_form_container">
                    <form onSubmit={login}>
                      <Input
                        type={"text"}
                        placeholder={"El. Paštas"}
                        name={"email"}
                        value={values.email}
                        onChange={handleInput}
                      />
                      <Input
                        type={"password"}
                        placeholder={"Slaptažodis"}
                        name={"password"}
                        value={values.password}
                        onChange={handleInput}
                      />
                      <button type="submit" className="custom-btn">
                        Prisijungti
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {expand && (
        <Alert
          text={msg}
          click={() => {
            setExpand(false);
          }}
        />
      )}
    </>
  );
};
