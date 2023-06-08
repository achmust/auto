type Props = {
  text: string;
  click: () => void;
};

export const Alert = (props: Props) => {
  return (
    <div className="modalBackground">
      <div className="alert">
        <div className="alert-title h-25 w-100">Klaida!</div>
        <div className="alert-text h-50 w-100">{props.text}</div>
        <div className="h-25 w-100 d-flex">
          <div className="box-shadow alert-button center" onClick={props.click}>
            Ok
          </div>
        </div>
      </div>
    </div>
  );
};
