//import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { logOut } from "../Features/loginSlice";
import { useNavigate } from "react-router";
import toaster from "../helpers/toaster";

interface propTypes {
  onConfirm : () => void
}

const LogOutOverLay = ({ onConfirm } :propTypes) => {
    const dispatchTo = useDispatch()
    const navigateTo = useNavigate()
    const logoutHandler = () => {
        dispatchTo(
          logOut({
            onSuccess: () => {
              navigateTo("login");
            },
            onFail: () => {
              toaster("some error ocurred","error",3000)
            },
          })
        );
          onConfirm()
      };

  return (
    <div className="rounded-5 modalStyle2">
      <div className="container mx-auto">
        <div className="card mx-auto">
          <div className="card-header">
            <h3 className="card-title fs-3 fw-3 text-center">Are you Sure ?</h3>
          </div>
          <div className="card-body d-flex justify-content-around mt-2">
            <button type="button" onClick={logoutHandler} className="btn bg-danger fs-4 fw-bold">
              Log out
            </button>
            <button
              type="button"
              className="btn bg-success fs-4 fw-bold px-4"
              onClick={()=> {onConfirm()}}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutOverLay;
