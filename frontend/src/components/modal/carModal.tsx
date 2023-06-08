import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Input } from "../../helpers/inputs/input";
import { url } from "../../helpers/url";
import { CarType } from "../../types/types";
import Modal from "./modal";

type Props = {
  setCar: React.Dispatch<React.SetStateAction<CarType>>;
  setUserId?: React.Dispatch<React.SetStateAction<number>>;
  register?: boolean;
  setExpand: () => void;
  buttonText: string;
  onSubmit: () => void;
  admin?: boolean;
} & CarType;
export const CarModal = (props: Props) => {
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    []
  );
  const handleChanges = (e: any) => {
    props.setCar((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    if (props.admin) {
      axios.post(`${url}/profiles`).then((res) => {
        const data = res.data.data.map((item: any) => {
          return { value: item.id, label: `${item.name} ${item.surname}` };
        });
        setOptions(data);
      });
    }
  }, []);
  const onChange = (value: any) => {
    if (props.setUserId) {
      props.setUserId(value.value);
    }
  };
  return (
    <Modal setOpenModal={props.setExpand} title={`Naujas | Naujas automobilis`}>
      <div className="container p-4">
        <div className="reservation-header center">
          <h1>Automobilis</h1>
        </div>
        {props.admin && (
          <>
            <div className="dropdown-head d-flex align-items-center">
              <div className="name w-50 p-2">Savininkas</div>
            </div>
            <div className="mt-3 mb-3">
              <Select
                placeholder={"Pasirinkite..."}
                options={options}
                onChange={onChange}
              />
            </div>
          </>
        )}

        <div className="dropdown-head d-flex align-items-center">
          <div className="name w-50 p-2">Automobilio duomenys</div>
        </div>
        <div>
          <div className="d-flex">
            <Input
              type={"text"}
              placeholder={"Gamintojas"}
              name={"carbrand"}
              value={props.carbrand}
              onChange={handleChanges}
            />

            <Input
              type={"text"}
              placeholder={"Modelis"}
              name={"carmodel"}
              value={props.carmodel}
              onChange={handleChanges}
            />
          </div>
          <div className="d-flex">
            {/* <div className="form__group field p-2">
              <Select placeholder={"Pasirinkite..."} />
            </div> */}
            <Input
              type={"number"}
              placeholder={"Metai"}
              name={"caryear"}
              value={props.caryear}
              onChange={handleChanges}
            />
            <Input
              type={"text"}
              placeholder={"Valstybinis numeris"}
              name={"carplate"}
              value={props.carplate}
              onChange={handleChanges}
            />
          </div>
          <div onClick={props.onSubmit} className="custom-btn">
            {props.buttonText}
          </div>
        </div>
      </div>
    </Modal>
  );
};
