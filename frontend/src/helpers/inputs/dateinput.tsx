import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getToday } from "../helpers";
import OutsideAlerter from "../outclick";

type Props = {
  handleInput?: (key: string, value: string) => void;
  date: string;
  setDate?: (value: string) => void;
};
export const MiniCalendar = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);
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
        value={props.date}
        onChange={() => {
          return props.date;
        }}
      />
      <label htmlFor="time" className="form__label">
        Data
      </label>
      {expand && (
        <OutsideAlerter
          outsideClick={() => {
            setExpand(false);
          }}
        >
          <div className="mini-calendar-child">
            <Calendar
              onChange={(value) => {
                if (props.handleInput) {
                  props.handleInput("date", getToday(new Date(String(value))));
                }
                if (props.setDate) {
                  props.setDate(getToday(new Date(String(value))));
                }
                setExpand(false);
              }}
              value={new Date()}
            />
          </div>
        </OutsideAlerter>
      )}
    </div>
  );
};
