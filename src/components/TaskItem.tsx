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
import { Checkbox } from "@mui/material";

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
      >
        <Grid justifyContent="flex-end" direction="row" item>
          <Button aria-label="Close" onClick={deleteHandler}>
            <ClearIcon />
          </Button>
        </Grid>

        <Grid direction="row" item>
          {!toggle ? (
            <Typography component="span">{props.title}</Typography>
          ) : (
            <Typography component="s">{props.title}</Typography>
          )}

          <Typography component="p">{props.description}</Typography>

          <Checkbox
            sx={{ transform: "scale(1.5)" }}
            id={`check${props.id}`}
            name={`option${props.id}`}
            checked={toggle}
            onChange={toggleHandler}
          />
        </Grid>

        <hr />

        <Grid item>
          <TimeDisplay unixTime={props.date} />
          <img src="#" width="50%" height="40px" alt="people" />
        </Grid>
      </Grid>
    </>
  );
};

export default TaskItem;
