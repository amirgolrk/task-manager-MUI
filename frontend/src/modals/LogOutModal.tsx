import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import LogOutOverLay from "./LogOutOverlay";
import "./logOutModal.css"

  interface propTypes {
    logOutModalOpen : boolean,
    setLogOutModalOpen : (a : boolean) => void
  }

const LogOutModal = ({
  logOutModalOpen,
  setLogOutModalOpen
} : propTypes) => {
  if (!logOutModalOpen) {
    return null; // If logOutModalOpen is false, do not render the modal
  }
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={() => setLogOutModalOpen(false)} />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <LogOutOverLay
          onConfirm={() => {
            setLogOutModalOpen(false);
          }}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </>
  );
};

export default LogOutModal;
