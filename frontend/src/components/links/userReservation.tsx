import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../helpers/url";
import {
  CarType,
  ReservationInputsType,
  User,
  UserInfo,
} from "../../types/types";
import { ReservationInfoForm } from "../forms/reservationInfoForm";
import { UserForm } from "../forms/userForm";
import { CarComponent } from "../forms/carcomponent";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../../helpers/dialog";

type Props = {
  user?: User;
  modal?: boolean;
  role: string;
  reservationId?: number;
  buttonTitle: string;
  setExpand?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserReservation = (props: Props) => {
  const [msg, setMsg] = useState<string>("");
  const [carid, setCarId] = useState<number>(0);
  const [workerId, setWorkerId] = useState<number>(0);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const [status, setStatus] = useState<{
    statusId: number;
    color: string;
    text: string;
  }>();
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

  const formSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url}/reservation/create`, {
        carid,
        userid: user.id,
        ...reservation,
        reservationId: props.reservationId,
        statusId: status?.statusId,
        workerId,
      })
      .then((data) => {
        if (data.data.success) {
          if (props.reservationId) {
            setMsg("Sėkmingai atnaujinta!");
          } else {
            setReservation({
              date: "",
              time: "",
              description: "",
            });
            setCarId(0);
            setMsg("Sėkmingai sukurta!");
          }
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
            setMsg("");
          }, 2000);
        }
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
  useEffect(() => {
    if (props.reservationId) {
      axios
        .post(`${url}/get/reservation`, { id: props.reservationId })
        .then((res) => {
          const {
            userId,
            statusId,
            carId,
            carbrand,
            carmodel,
            carplate,
            caryear,
            color,
            email,
            name,
            surname,
            tel,
            text,
            Description,
            Date,
            Time,
            WorkerId,
          } = res.data.data[0];
          setCar({ carbrand, carmodel, caryear, carplate });
          setUser({ id: userId, name, surname, tel, email });
          setReservation({ date: Date, time: Time, description: Description });
          setStatus({ statusId, color, text });
          setCarId(Number(carId));
          setWorkerId(Number(WorkerId));
        });
    }
  }, [props.reservationId]);
  const submitButton = () => {
    if (reservation.date && reservation.description && reservation.time) {
      if (!status) {
        return (
          <button type="submit" className="custom-btn">
            {props.buttonTitle}
          </button>
        );
      }
      if (
        (status?.statusId == 1 && workerId == 0) ||
        (status?.statusId == 3 && workerId == 0)
      ) {
        return (
          <button type="submit" className="custom-btn">
            {props.buttonTitle}
          </button>
        );
      } else if (status?.statusId !== 1 && workerId !== 0) {
        return (
          <button type="submit" className="custom-btn">
            {props.buttonTitle}
          </button>
        );
      }
    }
    return <></>;
  };
  return (
    <>
      <div
        className={`container pt-4 ${props.modal ? "reservation-modal" : ""}`}
      >
        <div className="reservation">
          <div className="reservation-header center">
            <h1>Rezervacija vizitui</h1>
          </div>
          <div className="reservation-body">
            <>
              <form onSubmit={formSubmit} className="d-flex flex-column">
                <UserForm
                  {...user}
                  userId={user.id}
                  setUser={setUser}
                  disabled={true}
                />
                {user.id ? (
                  <CarComponent
                    {...car}
                    userId={user.id}
                    setCar={setCar}
                    setCarId={setCarId}
                    carId={carid}
                  />
                ) : (
                  <></>
                )}
                {carid ? (
                  <ReservationInfoForm
                    {...reservation}
                    setReservation={setReservation}
                    status={status}
                    setStatus={setStatus}
                    setWorkerId={setWorkerId}
                    workerId={workerId}
                    admin={props.role == "user" ? false : true}
                  />
                ) : (
                  <></>
                )}
                {submitButton()}
              </form>
            </>
          </div>
        </div>
      </div>

      {showDialog && <Dialog title="Sėkmingai!" text={msg} />}
    </>
  );
};
