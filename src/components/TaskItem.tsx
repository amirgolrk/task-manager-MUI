/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import React from "react";
import { useEffect, useState } from "react";
import TimeDisplay from "../helpers/TimeDisplay";
//import { useDispatch } from "react-redux";
import { doneTask, getTasks } from "../Features/todoSlice";
//import { useSelector } from "react-redux";
import { useAppDispatch } from "../reduxHook";
import { useNavigate } from "react-router";
import toaster from "../helpers/toaster";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import  {Checkbox}  from "@mui/material";
import Divider from '@mui/material/Divider';


interface tasksType {
  title: string;
  id: number;
  userId?: number;
  owner?: number;
  description: string;
  date: number;
  done: boolean;
  image?: any;
  onDeleteItem: (taskId: number) => void;
}

const TaskItem = (props: tasksType) => {
  const [toggle, setToggle] = useState(props.done);
  useEffect(() => {
    setToggle(props.done);
  }, [props.done]);
  const dispatch = useAppDispatch();
  //const tasksId = useAppSelector((state) => state.todo.tasks.id);
  const navigateTo = useNavigate();
  //const token = localStorage.getItem("token");
  //const headers = { Authorization: `Bearer ${token}`}
  const toggleHandler = async () => {
    try {
      dispatch(doneTask(props));
      setToggle((prevToggle: any) => !prevToggle);
      //alert("Task done status edited successfully");
      dispatch(
        getTasks({
          onSuccess: () => {},
          onFail: () => {
            navigateTo("/login");
          },
        })
      );
      const doneId = document.getElementById(`${props.id}`) as HTMLElement;
      await window.scrollTo(0, doneId.offsetTop - 20);
    } catch (error: any) {
      console.log(error);
      //alert(error)
      toaster(error, "error", 3000);
    }
  };
  const deleteHandler = async () => {
    //props?.setLoading(true)
    if (
      (String(props.userId) as string) !==
      (localStorage.getItem("id") as string)
    ) {
      alert("this task is not for you");
    }
    props.onDeleteItem(props.id);

    //dispatch(deleteTask(tasksId));
    dispatch(
      getTasks({
        onSuccess: () => {},
        onFail: () => {
          navigateTo("/login");
        },
      })
    );
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        id={`props.id`}
        sx={{boxShadow: '0px 0px 6px silver', margin: "10px auto",borderRadius : "20px"}}
        spacing={0.5}
        mb={3}
        pl={2}
      >
        <Grid container justifyContent="flex-end" direction="row" item>
          <Button color="error" aria-label="Close" onClick={deleteHandler}>
            <ClearIcon sx={{fontSize:"30px"}} />
          </Button>
        </Grid>

        <Grid container item direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item>
            {" "}
            {!toggle ? (
              <Typography variant="h5" style={{fontWeight:"bold"}}>{props.title}</Typography>
            ) : (
              <Typography component="s" style={{fontSize : "24px" , fontWeight:"bold"}}>{props.title}</Typography>
            )}
            <Typography component="p">{props.description}</Typography>
          </Grid>
          <Grid item>
            {" "}
            <Checkbox
              //sx={{ transform: "scale(1.25)" ,borderRadius: '50%'}}
              style={{marginRight : "15px", transform: "scale(1.25)" ,borderRadius: '50%'}}
              id={`check${props.id}`}
              name={`option${props.id}`}
              checked={toggle}
              onChange={toggleHandler}
            />
          </Grid>
        </Grid>
              <Divider sx={{zIndex : "1000"}}/>
        <Grid container item direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item>
            <TimeDisplay unixTime={props.date} />
          </Grid>
          <Grid item>
            <img src="#" width="50%" height="40px" alt="people" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskItem;
