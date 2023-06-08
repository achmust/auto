import { Input } from "../../helpers/inputs/input";
import { UserInfo } from "../../types/types";
import Modal from "./modal";
type Props = {
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  register?: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  buttonText: string;
  submit: (e: any) => void;
} & UserInfo;
export const UserModal = (props: Props) => {
  const handleChanges = (e: any) => {
    props.setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <Modal setOpenModal={props.setExpand} title={`Naujas | Naujas vartotojas`}>
      <div className="container p-4">
        <div className="reservation-header center">
          <h1>Vartotojas</h1>
        </div>
        <div className="dropdown-head d-flex align-items-center">
          <div className="name w-50 p-2">Naudotojo duomenys</div>
        </div>
        <form onSubmit={props.submit}>
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
              disabled={props.disabled}
            />
          </div>
          <button type="submit" className="custom-btn">
            {props.buttonText}
          </button>
        </form>
      </div>
    </Modal>
  );
};
