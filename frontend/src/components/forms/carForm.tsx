import { useState } from "react";
import { Input } from "../../helpers/inputs/input";
import { CarType } from "../../types/types";
import * as BsIcons from "react-icons/bs";
import Select from "react-select";
import Modal from "../modal/modal";
import { CarModal } from "../modal/carModal";
type Props = {
  setCar: React.Dispatch<React.SetStateAction<CarType>>;
  userId?: number | undefined;
  register?: boolean;
} & CarType;
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const CarForm = (props: Props) => {
  const handleChanges = (e: any) => {
    props.setCar((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="dropdown p-2">
      <div className="dropdown-head d-flex align-items-center">
        <div className="name w-50 p-2">Automobilio duomenys</div>
      </div>
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
    </div>
  );
};
