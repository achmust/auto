import React, { ReactNode } from "react";
import * as FaIcons from "react-icons/fa";
type ModalProps = {
  children: ReactNode;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  fullscreen?: boolean;
};
function Modal({ title, children, setOpenModal, fullscreen }: ModalProps) {
  return (
    <div className="modalBackground">
      <div className={`modalBody fullscreen-${fullscreen ? "on" : "off"}`}>
        <div className="modalHeader w-100 d-flex">
          <div className="modalTitle w-50 d-flex align-items-center">
            <span>{title}</span>
          </div>
          <div
            className="titleCloseBtn h-100 pe-3 w-50"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <FaIcons.FaWindowClose />
          </div>
        </div>
        <div className="modalContainer">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
