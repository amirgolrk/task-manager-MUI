/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
//import people1 from "../assets/Screenshot 2023-07-05 142051.png";
//import people2 from "../assets/Screenshot 2023-07-05 154910.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
import Tasks from "../components/Tasks";
import FormModal from "../modals/FormModal";
//import axios from "axios";
import Loader from "../helpers/Loader";
//import { useDispatch, useSelecstor } from "react-redux";
import { useAppDispatch,useAppSelector } from "../reduxHook";
import { getTasks } from "../Features/todoSlice";
import { deleteTask } from "../Features/todoSlice";
import CurrentTimeComponent from "../helpers/CurrentTimeComponent";
import { useNavigate } from "react-router";


function Card() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector((state) => state.todo.tasks);
  console.log(tasksData);
  const isLoading = useAppSelector((state) => state.todo.loading);
  const openedCount = useAppSelector((state) => state.todo.openedCount);
  const closedCount = useAppSelector((state) => state.todo.closedCount);
  const openedTasks = useAppSelector((state) => state.todo.openedTasks);
  const closedTasks = useAppSelector((state) => state.todo.closedTasks);
  const [taskType, setTaskType] = useState(0);
  const navigateTo = useNavigate()

  const confirmHandler = () => {
    setFormIsOpen(false);
  };

  const addData = async (task: any) => {
    // We don't need this function since we're handling tasks through Redux.
    // If you have a form for adding tasks, you can dispatch the `AddTask` action instead.
    await dispatch(getTasks({onSuccess : () => {},onFail :() =>{navigateTo("/login")}}))
    window.scrollTo(0,document.body.scrollHeight)

  };

  /*const deleteHandler = (taskId) => {
    dispatch(deleteTask(taskId));
    dispatch(getTasks());
  };*/
  async function deleteHandler(taskId ?: number) {

    
    await dispatch(deleteTask(taskId as number));
    await dispatch(getTasks({onSuccess : () => {},onFail :() =>{navigateTo("/login")}}))
    const deletingId = document.getElementById(`${taskId as number - 1}`) as HTMLElement
    window.scrollTo(0,deletingId.offsetTop - 20)
  }

  useEffect(() => {
    // Dispatch getTasks action to load tasks from the API
    dispatch(getTasks({onSuccess : () => {},onFail :() =>{navigateTo("/login")}}))
  }, [dispatch,navigateTo]);

  return (
    <>
      {/*formIsOpen && <FormModal onConfirm={confirmHandler} onInput={addData} />*/}
      <FormModal
        formIsOpen={formIsOpen}
        setFormIsOpen={setFormIsOpen}
        onConfirm={confirmHandler}
        onInput={addData}
      />
        
      <div className="container-fluid custom-width-45 mt-3">
        <div className="card mx-auto my-auto rounded-5">
          <div className="card-header">
          <div className="d-flex justify-content-between row py-2 text-center">
              <div className="col navbar-items"><a href="#">messages</a></div>
              <div className="col navbar-items active"><a href="#">toaday tasks</a></div>
              <div className="col navbar-items"><a href="#">last activity</a></div>
          </div>
          </div>
          <div className="card-body rounded-5">
            <div className="row">
              <div className="col">
                <h3 className="card-title">Todays Task</h3>
                {/*CurrentTimeComponent()*/ }
                <CurrentTimeComponent/>
              </div>
              <div className="col">
                <button
                  className="btn addbtn mt-3 float-end me-1"
                  onClick={() => {
                    setFormIsOpen(true);
                  }}
                >
                  + New Task
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3 text-center">
              <div className="col dash-nav">
                <a
                  href="/#"
                  className={`${taskType === 0 && "text-primary"}`}
                  onClick={() => {
                    setTaskType(0);
                  }}
                >
                  all{" "}
                  <span
                    className={`badge ${
                      taskType === 0 ? "bg-primary" : "bg-secondary"
                    } rounded-pill ms-1`}
                  >
                    {tasksData?.length}
                  </span>
                </a>
              </div>
              <div className="col dash-nav">
                <a
                  href="/#"
                  className={`${taskType === 1 && "text-primary"}`}
                  onClick={() => {
                    setTaskType(1);
                  }}
                >
                  Opened{" "}
                  <span
                    className={`badge ${
                      taskType === 1 ? "bg-primary" : "bg-secondary"
                    } rounded-pill ms-1`}
                  >
                    {openedCount}
                  </span>
                </a>
              </div>
              <div className="col dash-nav">
                <a
                  href="/#"
                  className={`${taskType === 2 && "text-primary"}`}
                  onClick={() => {
                    setTaskType(2);
                  }}
                >
                  Closed{" "}
                  <span
                    className={`badge ${
                      taskType === 2 ? "bg-primary" : "bg-secondary"
                    } rounded-pill ms-1`}
                  >
                    {closedCount}
                  </span>
                </a>
              </div>
              <div className="col dash-nav">
                <a href="/#">
                  Archived{" "}
                  <span className="badge bg-secondary rounded-pill ms-1">
                    2
                  </span>
                </a>
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : taskType === 0 ? (
              <Tasks items={tasksData} onDeleteItem={deleteHandler} />
            ) : taskType === 1 ? (
              <Tasks items={openedTasks} onDeleteItem={deleteHandler} />
            ) : taskType === 2 ? (
              <Tasks items={closedTasks} onDeleteItem={deleteHandler} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
