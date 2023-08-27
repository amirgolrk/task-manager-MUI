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
  useEffect(() =>{
    setToggle(props.done)
  },[props.done])
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
  const deleteHandler = async() => {
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
      <div id={`props.id`} className="card rounded-5 shadow mt-4">
        <div className="card body rounded-4">
          <div className="text-right pe-3 pt-2">
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Close"
              onClick={deleteHandler}
            ></button>
          </div>
          <div className="row mt-2 ms-2">
            <div className="clearfix">
              <div className="float-start">
                {!toggle ? (
                  <span className="card-title tasktitle">{props.title}</span>
                ) : (
                  <s className="card-title tasktitle">{props.title}</s>
                )}
                <p className="lead tasklead">{props.description}</p>
              </div>
              <div className="float-end pe-4 pt-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input rounded-circle"
                    style={{ transform: "scale(1.5)" }}
                    id={`check${props.id}`}
                    name={`option${props.id}`}
                    //value={Math.floor(Math.random() * 1000)}
                    checked={toggle}
                    onChange={
                      toggleHandler
                      /*() => {
                      setToggle(!toggle);*/
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-9 ps-5">
              {/*<p className="lead taskdate">{new Date(date * 1000).toLocaleString()}</p>*/}
              <TimeDisplay unixTime={props.date} />
            </div>
            <div className="col-sm-3">
              <img
                src="#"
                className="float-end me-4 pb-2"
                width="50%"
                height="40px"
                alt="people"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
