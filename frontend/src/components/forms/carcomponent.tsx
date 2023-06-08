import { useEffect, useState } from "react";
import { CarType } from "../../types/types";
import Select from "react-select";
import { CarModal } from "../modal/carModal";
import axios from "axios";
import { url } from "../../helpers/url";
import { Dialog } from "../../helpers/dialog";
type Props = {
  setCar: React.Dispatch<React.SetStateAction<CarType>>;
  setCarId: React.Dispatch<React.SetStateAction<number>>;
  userId?: number | undefined;
  register?: boolean;
  carId?: number;
} & CarType;
export const CarComponent = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    []
  );
  const [value, setValue] = useState<{ value: number; label: string }>();
  const car = {
    carbrand: props.carbrand,
    carmodel: props.carmodel,
    caryear: props.caryear,
    carplate: props.carplate,
  };
  useEffect(() => {
    if (props.userId) {
      axios.post(`${url}/cars/get`, { userid: props.userId }).then((res) => {
        const data = res.data.cars.map((car: any) => {
          return {
            value: car.id,
            label: `${car.carbrand} ${car.carmodel}`,
          };
        });
        setOptions(data);
      });
    }
  }, [props.userId, expand]);
  const onSubmit = () => {
    if (car.carbrand && car.carmodel && car.carplate && car.caryear) {
      axios
        .post(`${url}/add/car`, { car, userid: props.userId })
        .then((res: any) => {
          if (res.data.success) {
            clearState();
            setExpand(false);
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 2000);
          }
        });
    }
  };
  const clearState = () => {
    props.setCar({
      carbrand: "",
      carmodel: "",
      caryear: "",
      carplate: "",
    });
  };
  useEffect(() => {
    if (options.length != 0 && props.carId) {
      setValue(options.find((item) => item.value == props.carId));
    }
  }, [options]);

  return (
    <div className="dropdown p-2">
      <div className="dropdown-head d-flex align-items-center">
        <div className="name w-50 p-2">Kliento automobilis</div>
      </div>
      <div className={`dropdown-form expand-open`}>
        <div className="w-100 pt-3">
          <Select
            options={options}
            placeholder={"Pasirinkite..."}
            value={value}
            onChange={(value) => {
              if (value) {
                props.setCarId(value.value);
                setValue(value);
              }
            }}
          />
          <div
            className="custom-btn"
            onClick={() => {
              setExpand(true);
            }}
          >
            NAUJAS AUTOMOBILIS
          </div>
        </div>
        {showDialog && <Dialog title="Sėkmingai!" text="Sėkmingai sukurtas!" />}
        {expand && (
          <CarModal
            buttonText="Pridėti"
            setCar={props.setCar}
            setExpand={() => {
              setExpand(false);
              clearState();
            }}
            onSubmit={onSubmit}
            {...car}
          />
        )}
      </div>
    </div>
  );
};
