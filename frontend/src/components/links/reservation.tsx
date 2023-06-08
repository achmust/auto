import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../helpers/url";
import {
  CarType,
  ReservationInputsType,
  User,
  UserInfo,
} from "../../types/types";
import { CarComponent } from "../forms/carcomponent";
import { ReservationInfoForm } from "../forms/reservationInfoForm";
import { UserComponent } from "../forms/usercomponent";

type Props = {
  user?: User;
  role: string;
};
export const Reservation = (props: Props) => {
  const [userId, setUserId] = useState<number>(0);
  const [carId, setCarId] = useState<number>(0);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo>({
    id: 0,
    name: "",
    surname: "",
    tel: "",
    email: "",
  });
  const [car, setCar] = useState<CarType>({
    carbrand: "",
    carmodel: "",
    caryear: "",
    carplate: "",
  });
  const [reservation, setReservation] = useState<ReservationInputsType>({
    date: "",
    time: "",
    description: "",
  });
  const deleteStates = () => {
    setUser({
      id: 0,
      name: "",
      surname: "",
      tel: "",
      email: "",
    });
    setCarId(0);
    setReservation({
      date: "",
      time: "",
      description: "",
    });
  };
  useEffect(() => {
    if (props.user?.id && props.role == "user") {
      axios.post(`${url}/getuser`, { id: props.user?.id }).then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      });
    }
  }, [props.user]);
  const formSubmit = (e: any) => {
    e.preventDefault();
    console.log({ userid: userId, carid: carId, ...reservation });
    axios
      .post(`${url}/reservation/create`, {
        userid: user.id,
        carid: carId,
        ...reservation,
      })
      .then((data) => {
        deleteStates();
      });
  };
  return (
    <div className="container">
      <div className="reservation">
        <div className="reservation-header center">
          <h1>Rezervacija vizitui</h1>
        </div>
        <div className="reservation-body">
          <>
            <form onSubmit={formSubmit} className="d-flex flex-column">
              <UserComponent user={user} setUser={setUser} />
              {user.id ? (
                <CarComponent
                  {...car}
                  userId={user.id}
                  setCar={setCar}
                  setCarId={setCarId}
                  carId={carId}
                />
              ) : (
                <></>
              )}
              {carId ? (
                <ReservationInfoForm
                  {...reservation}
                  setReservation={setReservation}
                />
              ) : (
                <></>
              )}
              {reservation.date &&
              reservation.description &&
              reservation.time ? (
                <button type="submit" className="custom-btn">
                  Rezervuoti
                </button>
              ) : (
                <></>
              )}
            </form>
          </>
        </div>
      </div>
    </div>
  );
};
