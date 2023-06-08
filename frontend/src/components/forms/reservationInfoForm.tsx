import { useEffect, useState } from "react";
import { Input } from "../../helpers/inputs/input";
import { ReservationInputsType } from "../../types/types";
import * as BsIcons from "react-icons/bs";
import { TimeInput } from "../../helpers/inputs/timeinput";
import axios from "axios";
import { url } from "../../helpers/url";
import Select from "react-select";
import { MiniCalendar } from "../../helpers/inputs/dateinput";

const fixoptions = [
  { value: 1, label: "Ratų keitimas" },
  { value: 2, label: "Padangos remontas" },
  { value: 3, label: "Lemputės keitimas" },
  { value: 4, label: "Alyvos keitimas" },
  { value: 5, label: "Ratų suvedimas" },
  { value: 6, label: "Kondicionieriaus pildymas, remontas" },
  { value: 7, label: "Akumliatoriaus patikra, keitimas" },
  { value: 8, label: "Kompiuterinė diagnostika" },
  { value: 9, label: "Pakabos, stabdžių remontas" },
  { value: 10, label: "Variklio remontas, keitimas" },
  { value: 11, label: "Kiti autoserviso darbai" },
];
type Props = {
  setReservation: React.Dispatch<React.SetStateAction<ReservationInputsType>>;
  setStatus?: React.Dispatch<
    React.SetStateAction<
      | {
          statusId: number;
          color: string;
          text: string;
        }
      | undefined
    >
  >;
  setWorkerId?: React.Dispatch<React.SetStateAction<number>>;
  admin?: boolean;
  workerId?: number;
  status?: {
    statusId: number;
    color: string;
    text: string;
  };
} & ReservationInputsType;
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
type Worker = {
  id: number;
  Name: string;
  Surname: string;
};
type Option = {
  value: number;
  label: string;
};
export const ReservationInfoForm = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(true);
  const [workers, setWorkers] = useState<Option[]>([]);
  const [workersList, setWorkersList] = useState<Option[]>([]);
  const [statusList, setStatusList] = useState<Option[]>([]);
  const [woker, setWorker] = useState<Option>();
  const [status, setStatus] = useState<Option>();
  const [value, setValue] = useState<Option>();
  const handleChanges = (e: any) => {
    props.setReservation((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleInput = (key: string, value: string) => {
    props.setReservation((prev) => {
      return { ...prev, [key]: value };
    });
  };
  useEffect(() => {
    if (props.admin) {
      axios.post(`${url}/workers`).then((res) => {
        const data = res.data.data.map((item: Worker) => {
          return {
            value: item.id,
            label: `${item.Name.toUpperCase()} ${item.Surname.toUpperCase()}`,
          };
        });
        setWorkersList(data);
      });
      axios
        .post(`${url}/workers/date`, { date: props.date, time: props.time })
        .then((res) => {
          const data = res.data.data.map((item: Worker) => {
            return {
              value: item.id,
              label: `${item.Name.toUpperCase()} ${item.Surname.toUpperCase()}`,
            };
          });
          setWorkers(data);
        });
    }
  }, []);
  useEffect(() => {
    if (props.admin) {
      axios.post(`${url}/get/status`).then((res) => {
        const data = res.data.data.map((item: any) => {
          return { value: item.Id, label: `${item.text}` };
        });
        setStatusList(data);
      });
    }
  }, []);
  const onChangeWorker = (data: any) => {
    if (props.setWorkerId) {
      props.setWorkerId(data.value);
    }
  };
  const onChangeStatus = (data: any) => {
    if (props.setStatus && props.status) {
      props.setStatus({ ...props.status, statusId: data.value });
    }
  };
  useEffect(() => {
    if (workersList.length != 0 && props.workerId) {
      setWorker(workersList.find((item) => item.value == props.workerId));
    }
    if (statusList.length != 0 && props.status?.statusId) {
      setStatus(
        statusList.find((item) => item.value == Number(props.status?.statusId))
      );
    }
    if (fixoptions.length != 0 && props.description) {
      setValue(fixoptions.find((item) => item.label == props.description));
    }
  }, [workers, statusList, props.workerId, props.status, props.description]);
  return (
    <>
      <div className="dropdown p-2">
        <div className="dropdown-head d-flex align-items-center">
          <div className="name w-50 p-2">Rezervacijos informacija</div>
        </div>
        <div className={`dropdown-form expand-open mb-2`}>
          <div className="d-flex">
            <MiniCalendar handleInput={handleInput} date={props.date} />

            <TimeInput
              handleInput={handleInput}
              time={props.time}
              date={props.date}
            />
          </div>
          <div className="d-flex">
            <div className="form__group field p-2">
              <label htmlFor="Aprašymas" className="form__label">
                Vizito priežastis
              </label>
              <div className="mt-3">
                <Select
                  options={fixoptions}
                  value={value}
                  onChange={(value) => {
                    if (value) {
                      props.setReservation((prev) => {
                        return { ...prev, description: value?.label };
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.admin && props.status && (
        <div className="dropdown p-2">
          <div className="dropdown-head d-flex align-items-center">
            <div className="name w-50 p-2">Rezervacijos statusas</div>
          </div>
          <div className="w-100 d-flex">
            <div className="w-50">
              <div className="w-100 center status-head">Statusas</div>
              <div className="w-100 p-2">
                <div
                  className={`w-100 status-value mt-2 center bg-${props.status.color}`}
                >
                  {props.status.text}
                </div>
                <div className="pt-2">
                  <Select
                    placeholder={"Pasirinkite..."}
                    options={statusList}
                    value={status}
                    onChange={onChangeStatus}
                  />
                </div>
              </div>
            </div>
            <div className="w-50">
              <div className="w-100 center status-head">Darbuotojas</div>
              <div className="w-100 p-2">
                <div className={`w-100 status-value mt-2`}>
                  <Select
                    placeholder={"Pasirinkite..."}
                    defaultValue={woker}
                    options={workers}
                    value={woker}
                    onChange={onChangeWorker}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
