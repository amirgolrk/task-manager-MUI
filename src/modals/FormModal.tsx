/* eslint-disable @typescript-eslint/no-explicit-any */

import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";
import "./FormModal.css";
//import "bootstrap/dist/css/bootstrap.min.css";

interface propTypes {
  formIsOpen : boolean,
  setFormIsOpen : (arg0: boolean) => void,
  onConfirm : () => void,
  onInput : (a : any) => void,
}

const FormModal = ({ formIsOpen, setFormIsOpen, onConfirm, onInput } : propTypes) => {
  if (!formIsOpen) {
    return null; 
  }

  const backdropRoot: HTMLElement | null = document.getElementById(
    "backdrop-root"
  );
  const overlayRoot: HTMLElement | null = document.getElementById(
    "overlay-root"
  );

  if (!backdropRoot || !overlayRoot) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={() => setFormIsOpen(false)} />,
        backdropRoot
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={() => {
            setFormIsOpen(false);
            onConfirm();
          }}
          onInput={onInput}
        />,
        overlayRoot
      )}
    </>
  );
};

export default FormModal;

