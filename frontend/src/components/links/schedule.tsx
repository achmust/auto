import axios from "axios";
import { useEffect, useState } from "react";
import { getToday } from "../../helpers/helpers";
import { MiniCalendar } from "../../helpers/inputs/dateinput";
import { url } from "../../helpers/url";
import { User } from "../../types/types";
import Modal from "../modal/modal";
import { UserReservation } from "./userReservation";

const hours = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
type reservation = {
  CarId: number;
  Date: string;
  Description: string;
  IsDeleted: number;
  ReservationId: number;
  StatusId: number;
  Time: string;
  UserId: number;
  WorkerId: number;
};
type worker = { id: number; Name: string; Surname: string };
type Props = {
  user: {
    fullname: string;
    id: number;
    role: string;
  };
};
export const Schedule = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [workers, setWorkers] = useState<worker[]>();
  const [reservations, setReservations] = useState<reservation[]>([]);
  const [reservationId, setReservationId] = useState<number>();
  const [date, setDate] = useState<string>(getToday(new Date()));
  useEffect(() => {
    axios.post(`${url}/workers`).then((res: any) => {
      setWorkers(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios.post(`${url}/get/reservations`, { date }).then((res) => {
      setReservations(res.data.data);
    });
  }, [date]);
  return (
    <>
      <div className="container">
        <div className="reservation">
          <div className="reservation-header center">
            <h1>Kalendorius</h1>
          </div>
          <div className="reservation-body m-2">
            <div className="center m-4">
              <MiniCalendar setDate={setDate} date={date} />
            </div>

            <div className="schedule w-100">
              <div className="schedule-header d-flex">
                {workers &&
                  workers.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className="center header-child"
                        style={{
                          width: `${100 / workers.length}%`,
                          borderRight: "1px solid white",
                        }}
                      >
                        {`${item.Name} ${item.Surname}`}
                      </div>
                    );
                  })}
              </div>
              <div className="schedule-body w-100 d-flex">
                <div className="hours">
                  {hours.map((item, index) => {
                    return (
                      <div className="hours-item center" key={index}>
                        {item}
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex body-worker">
                  {workers &&
                    workers.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            width: `${100 / workers.length}%`,
                            position: "relative",
                            borderRight: "1px solid black",
                          }}
                        >
                          {reservations.map((res) => {
                            return (
                              res.WorkerId === item.id && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: `${
                                      hours.indexOf(res.Time) * 50 + 5
                                    }px`,
                                    width: "90%",
                                    height: "40px",
                                    left: "5%",
                                    background: "rgba(125,125,125,0.5)",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setReservationId(res.ReservationId);
                                    setExpand(true);
                                  }}
                                  key={res.ReservationId}
                                >
                                  {res.Description}
                                </div>
                              )
                            );
                          })}
                          {hours.map((hour, index) => {
                            return (
                              <div
                                className="w-100 body-worker-item"
                                key={index}
                              ></div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {expand && (
        <Modal setOpenModal={setExpand} title={"Rezervacija"} fullscreen={true}>
          <UserReservation
            role={props.user.role}
            buttonTitle={"Redaguoti"}
            reservationId={reservationId}
            user={{ fullname: props.user.fullname, id: props.user.id }}
            setExpand={setExpand}
            modal={true}
          />
        </Modal>
      )}
    </>
  );
};
