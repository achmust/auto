import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../helpers/inputs/input";
import { RegisterValues } from "../../types/types";
import { url } from "../../helpers/url";
import { Alert } from "../../helpers/alert";
type Props = {
  roleId: number;
  title: string;
};
export const RegisterForm = (props: Props) => {
  const navigate = useNavigate();
  const [expand, setExpand] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [values, setValues] = useState<RegisterValues>({
    name: "",
    surname: "",
    email: "",
    tel: "",
    password: "",
  });
  const register = (e: any) => {
    e.preventDefault();
    const { name, surname, email, tel, password } = values;
    if (
      name == "" ||
      surname == "" ||
      tel == "" ||
      email == "" ||
      password == ""
    ) {
      setExpand(true);
      setMsg("Užpildykite visus laukus !");
    } else {
      axios
        .post(`${url}/register`, { ...values, roleId: props.roleId })
        .then((res) => {
          if (res.data.success) {
            navigate("/login");
          } else {
            setExpand(true);
            setMsg(res.data.msg);
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
      <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="contact_taital">{props.title}</h1>
            </div>
          </div>
          <div className="contact_section_2">
            <div className="row">
              <div className="col-md-12">
                <div className="mail_section map_form_container">
                  <form onSubmit={register}>
                    <Input
                      type={"text"}
                      placeholder={"Vardas"}
                      name={"name"}
                      value={values.name}
                      onChange={handleInput}
                    />
                    <Input
                      type={"text"}
                      placeholder={"Pavardė"}
                      name={"surname"}
                      value={values.surname}
                      onChange={handleInput}
                    />
                    <Input
                      type={"number"}
                      placeholder={"Telefono numeris"}
                      name={"tel"}
                      value={values.tel}
                      onChange={handleInput}
                    />
                    <Input
                      type={"email"}
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
                      Registruoti
                    </button>
                  </form>
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
