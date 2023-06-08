type Props = {
  type: string;
  placeholder: string;
  name: string;
  value: string | number;
  onChange: (e: any) => void;
  disabled?: boolean;
  wmax?: boolean;
};

export const Input = (props: Props) => {
  return (
    <div
      className={`form__group field p-2 ${
        props.wmax && props.wmax ? "w-100" : "w-50"
      }`}
    >
      <input
        type={props.type}
        className="form__field"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled ? true : false}
        style={{ color: props.disabled ? "grey" : "black" }}
      />
      <label htmlFor={props.name} className="form__label">
        {props.placeholder}
      </label>
    </div>
  );
};
