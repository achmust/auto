import { useState } from "react";
import { Input } from "../../helpers/inputs/input";
import { UserInfo } from "../../types/types";
import * as BsIcons from "react-icons/bs";
import Select from "react-select";
import { UserModal } from "../modal/userModal";
type Props = {
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  disabled?: boolean;
  userId?: number | undefined;
  register?: boolean;
} & UserInfo;
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const UserForm = (props: Props) => {
  const handleChanges = (e: any) => {
    props.setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="dropdown p-2">
      <div className="dropdown-head d-flex align-items-center">
        <div className="name w-50 p-2">Naudotojo duomenys</div>
      </div>

      <div className="d-flex">
        <Input
          type={"text"}
          placeholder={"Vardas"}
          name={"name"}
          value={props.name}
          onChange={handleChanges}
          disabled={props.disabled}
        />

        <Input
          type={"text"}
          placeholder={"Pavarde"}
          name={"surname"}
          value={props.surname}
          onChange={handleChanges}
          disabled={props.disabled}
        />
      </div>
      <div className="d-flex">
        <Input
          type={"number"}
          placeholder={"Telefono Numeris"}
          name={"tel"}
          value={`${Number(props.tel)}`}
          onChange={handleChanges}
          disabled={props.disabled}
        />
        <Input
          type={"email"}
          placeholder={"El.Paštas"}
          name={"email"}
          value={props.email}
          onChange={handleChanges}
          disabled={true}
        />
      </div>
    </div>
  );
};
