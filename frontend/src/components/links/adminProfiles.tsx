import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../helpers/url";
import { UserInfo } from "../../types/types";
import { UserModal } from "../modal/userModal";
type Profile = {
  id: number;
} & UserInfo;
type Props = {
  userId: number;
};
export const AdminProfiles = (props: Props) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [expand, setExpand] = useState<boolean>(false);
  const [user, setUser] = useState<Profile>({
    id: 0,
    name: "",
    surname: "",
    tel: "",
    email: "",
  });
  useEffect(() => {
    axios.post(`${url}/profiles`).then((res) => {
      setProfiles(res.data.data);
    });
  }, [expand]);
  const update = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url}/user/update`, { ...user, modifyUser: props.userId })
      .then((res) => {
        console.log(res.data);
        setExpand(false);
      });
  };
  return (
    <>
      <div className="reservation-body">
        <div className="reservation-header center">
          <h1>Klientų paskyros</h1>
        </div>
        <div className="container">
          <div className="w-100">
            <div className="cars-list-header d-flex w-100">
              <div className="car-brand w-25 ps-2">Vardas</div>
              <div className="car-model w-25 ps-2">Pavardė</div>
              <div className="car-year w-25 ps-2">Elektroninis paštas</div>
              <div className="car-plate w-25 ps-2">Telefono numeris</div>
            </div>
            <div className="cars-list-body d-flex flex-column w-100 pt-2">
              {profiles &&
                profiles.map((profile) => {
                  return (
                    <div
                      className="car-item w-100 d-flex"
                      key={profile.id}
                      onClick={() => {
                        setUser(profile);
                        setExpand(true);
                      }}
                    >
                      <div className="car-brand w-25 ps-2">{profile.name}</div>
                      <div className="car-model w-25 ps-2">
                        {profile.surname}
                      </div>
                      <div className="car-year w-25 ps-2">{profile.email}</div>
                      <div className="car-plate w-25 ps-2">{profile.tel}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {expand && (
        <UserModal
          setUser={setUser}
          setExpand={setExpand}
          buttonText={"Redaguoti"}
          submit={update}
          {...user}
        />
      )}
    </>
  );
};
