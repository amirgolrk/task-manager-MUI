/* eslint-disable @typescript-eslint/no-explicit-any */
//import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../Features/loginSlice";
import { useNavigate } from "react-router";
import toaster from "../helpers/toaster";
import { makeStyles } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface propTypes {
  onConfirm : () => void
}

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; palette: { error: { main: any; }; common: { white: any; }; success: { main: any; }; }; }) => ({
  modalContainer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 400,
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
  },
  dangerButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  successButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '1.25rem',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const LogOutOverLay = ({ onConfirm } :propTypes) => {
  const classes = useStyles();
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
    <Paper className={`${classes.modalContainer} modalStyle2`} elevation={5}>
      <div>
        <Typography variant="h5" className={classes.cardHeader}>
          Are you Sure ?
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          onClick={logoutHandler}
          className={classes.dangerButton}
        >
          Log out
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          className={classes.successButton}
        >
          No
        </Button>
      </div>
    </Paper>
  );
};

export default LogOutOverLay;
