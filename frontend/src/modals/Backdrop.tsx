
const Backdrop = ({onConfirm} : {onConfirm: () => void, }) => {
    return <div className="backdrop" onClick={onConfirm}></div>;
  };

  export default Backdrop 