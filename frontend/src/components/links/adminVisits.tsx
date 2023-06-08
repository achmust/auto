import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { url } from "../../helpers/url";
import { ReservationsType, User } from "../../types/types";
import Modal from "../modal/modal";
import { UserReservation } from "./userReservation";
type Props = {
  user?: User;
};
export const AdminVisits = (props: Props) => {
  const [reservations, setReservations] = useState<ReservationsType[]>();
  const [role, setRole] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const [rezervationId, setRezervationId] = useState<number>();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${url}/admin/reservations`, { userid: props.user?.id })
      .then((res) => {
        const data: ReservationsType[] = res.data.data;
        setReservations(data);
      });
  }, [props.user?.id, expand]);
  useEffect(() => {
    axios.post(`${url}/get/role`, { userid: props.user?.id }).then((res) => {
      setRole(res.data.user[0].rolename);
    });
  }, []);
  return (
    <>
      <div className="reservations">
        <div className="reservations-header center">
          <h1>Rezervacijos</h1>
        </div>

        <div className="container">
          <div
            className="custom-btn"
            onClick={() => {
              if (role == "user") {
                navigate("/reservation");
              } else {
                navigate("/admin/reservation");
              }
            }}
          >
            Nauja rezervacija
          </div>
          <div className="reservation-header d-flex">
            <div className="res brand">Klientas</div>
            <div className="res brand">Gamintojas</div>
            <div className="res model">Modelis</div>
            <div className="res year">Metai</div>
            <div className="res status h-100">Būsena</div>
            <div className="res date">Data</div>
            <div className="res time">Laikas</div>
            <div className="res time">Sąskaita</div>
          </div>
          <div className="reservations-body d-flex flex-column">
            {reservations &&
              reservations.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setExpand(true);
                      setRezervationId(item.ReservationId);
                    }}
                    className="reservations-body-item d-flex"
                    key={index}
                  >
                    <div className="res brand ps-2">
                      {item.name} {item.surname}
                    </div>
                    <div className="res brand ps-2">{item.carbrand}</div>
                    <div className="res model ps-2">{item.carmodel}</div>
                    <div className="res year ps-2">{item.caryear}</div>
                    <div className={`res status ps-2 bg-${item.color}`}>
                      {item.text}
                    </div>
                    <div className="res date ps-2">{item.Date}</div>
                    <div className="res time ps-2">{item.Time}</div>
                    <div className="res pdf ps-2">-</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {expand && (
        <Modal setOpenModal={setExpand} title={"Rezervacija"} fullscreen={true}>
          <UserReservation
            role={role}
            buttonTitle={"Redaguoti"}
            reservationId={rezervationId}
            user={props.user}
            setExpand={setExpand}
            modal={true}
          />
        </Modal>
      )}
    </>
  );
};
