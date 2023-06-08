import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "../../helpers/inputs/input";
import { url } from "../../helpers/url";

type Props = {
  name: string;
  surname: string;
  id: number;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WorkerModal = (props: Props) => {
  const [values, setValues] = useState<{ name: string; surname: string }>({
    name: "",
    surname: "",
  });
  const handleInput = (e: any) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    setValues({ name: props.name, surname: props.surname });
  }, [props.id, props.name, props.surname]);
  const edit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url}/edit/worker`, { id: props.id, ...values })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
        }
        props.setExpand(false);
      });
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="contact_taital">Darbuotojo redagavimas</h1>
        </div>
      </div>
      <div className="contact_section_2">
        <div className="row">
          <div className="col-md-12">
            <div className="mail_section map_form_container">
              <form onSubmit={edit}>
                <Input
                  type={"text"}
                  placeholder={"Name"}
                  name={"name"}
                  value={values.name}
                  onChange={handleInput}
                  wmax={true}
                />
                <Input
                  type={"text"}
                  placeholder={"Surname"}
                  name={"surname"}
                  value={values.surname}
                  onChange={handleInput}
                  wmax={true}
                />
                <button type="submit" className="custom-btn">
                  Redaguoti
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
