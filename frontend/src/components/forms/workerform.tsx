import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../helpers/inputs/input";
import { url } from "../../helpers/url";

export const WorkerForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<{ name: ""; surname: "" }>({
    name: "",
    surname: "",
  });
  const register = (e: any) => {
    e.preventDefault();
    axios.post(`${url}/add/workers`, { ...values }).then((res) => {
      res.data.success ? navigate("/admin/workers") : console.log(res.data.msg);
    });
  };
  const handleInput = (e: any) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="contact_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="contact_taital">Darbuotojo registracija</h1>
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
  );
};
