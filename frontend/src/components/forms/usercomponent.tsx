import { useEffect, useState } from "react";
import { Input } from "../../helpers/inputs/input";
import { UserInfo } from "../../types/types";
import * as BsIcons from "react-icons/bs";
import Select from "react-select";
import axios from "axios";
import { url } from "../../helpers/url";
import { useNavigate } from "react-router-dom";
type Props = {
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  disabled?: boolean;
  register?: boolean;
  user: UserInfo;
};

export const UserComponent = (props: Props) => {
  const [options, setOptions] = useState<{ value: number; label: string }[]>();
  const [value, setValue] = useState<{ value: number; label: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    axios.post(`${url}/profiles`).then((res) => {
      const data = res.data.data.map((user: UserInfo) => {
        return {
          value: user.id,
          label: `${user.name} ${user.surname}`,
        };
      });
      setOptions(data);
    });
  }, []);

  useEffect(() => {
    if (options) {
      setValue(options.find((item) => item.value == props.user.id));
    }
  }, [props.user, options]);
  return (
    <div className="dropdown p-2">
      <div className="dropdown-head d-flex align-items-center">
        <div className="name w-50 p-2">Klientas</div>
      </div>
      <div className={`dropdown-form expand-open`}>
        <div className="w-100 pt-3">
          <Select
            options={options}
            value={value}
            placeholder={"Pasirinkite..."}
            onChange={(data: any) => {
              props.setUser({ ...props.user, id: data.value });
            }}
          />
          <div
            className="custom-btn"
            onClick={() => {
              navigate("/admin/create/user");
            }}
          >
            NAUJAS VAROTOTOJAS
          </div>
        </div>
      </div>
    </div>
  );
};
