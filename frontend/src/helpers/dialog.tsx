import * as AiIcons from "react-icons/ai";
type Props = {
  title: string;
  text: string;
};
export const Dialog = (props: Props) => {
  return (
    <div className="dialog box-shadow">
      <div className="dialog-header w-100 h-50 d-flex">
        <h4 className="pt-3 ps-3">{props.title}</h4>
        <AiIcons.AiOutlineCheckSquare
          style={{ fontSize: "30px" }}
          className="ms-2 mt-3"
        />
      </div>
      <div className="dialog-text w-100 h-50 pt-1 ps-3">{props.text}</div>
    </div>
  );
};
