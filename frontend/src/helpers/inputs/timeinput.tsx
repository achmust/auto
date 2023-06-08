import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import OutsideAlerter from "../outclick";
import { url } from "../url";
type Props = {
  handleInput: (key: string, value: string) => void;
  time: string;
  date: string;
};
const time = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
export const TimeInput = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [workerLenght, setWokerLenght] = useState<number>(0);
  const [timeList, setTimeList] = useState<{ time: string; count: number }[]>(
    []
  );
  useEffect(() => {
    axios
      .post(`${url}/get/rezervations/dates`, { date: props.date })
      .then((res) => {
        setTimeList(
          time.map((item) => {
            return { time: item, count: countTime(item, res.data.data) };
          })
        );
      });
    axios.post(`${url}/workers`).then((res) => {
      setWokerLenght(res.data.data.length);
    });
  }, [props.date]);
  const countTime = (time: string, arr: { Time: string }[]) => {
    let count = 0;
    arr.map((item) => {
      if (item.Time == time) {
        count += 1;
      }
    });
    return count;
  };
  const ref = React.useRef();
  return (
    <div className="form__group field p-2">
      <input
        type="text"
        className="form__field"
        name="time"
        autoComplete="off"
        onFocus={() => {
          setExpand(true);
        }}
        onChange={() => {
          return props.time;
        }}
        value={props.time}
      />
      <label htmlFor="time" className="form__label">
        Laikas
      </label>
      {expand && (
        <OutsideAlerter
          outsideClick={() => {
            setExpand(false);
          }}
        >
          <div className="time-modal d-flex box-shadow">
            {timeList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`time-modal-item m-1 ${
                    props.time == item.time ? "active" : ""
                  } ${workerLenght == item.count && "disabledTime"}`}
                  onClick={() => {
                    props.handleInput("time", item.time);
                    setExpand(false);
                  }}
                >
                  {item.time}
                </div>
              );
            })}
          </div>
        </OutsideAlerter>
      )}
    </div>
  );
};
