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
import { useAppDispatch, useAppSelector } from "../reduxHook";
import { getTasks } from "../Features/todoSlice";
import { deleteTask } from "../Features/todoSlice";
import CurrentTimeComponent from "../helpers/CurrentTimeComponent";
import { useNavigate } from "react-router";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MuiCard from "@mui/material/Card";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Badge from "@mui/material/Badge";
import BottomNavigation from "@mui/material/BottomNavigation";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";


function Card() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [value, setValue] = useState("one");
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector((state) => state.todo.tasks);
  console.log(tasksData);
  const isLoading = useAppSelector((state) => state.todo.loading);
  const openedCount = useAppSelector((state) => state.todo.openedCount);
  const closedCount = useAppSelector((state) => state.todo.closedCount);
  const openedTasks = useAppSelector((state) => state.todo.openedTasks);
  const closedTasks = useAppSelector((state) => state.todo.closedTasks);
  const [taskType, setTaskType] = useState(0);
  const navigateTo = useNavigate();

  const confirmHandler = () => {
    setFormIsOpen(false);
  };

  const addData = async (task: any) => {
    // We don't need this function since we're handling tasks through Redux.
    // If you have a form for adding tasks, you can dispatch the `AddTask` action instead.
    await dispatch(
      getTasks({
        onSuccess: () => {},
        onFail: () => {
          navigateTo("/login");
        },
      })
    );
    window.scrollTo(0, document.body.scrollHeight);
  };

  /*const deleteHandler = (taskId) => {
    dispatch(deleteTask(taskId));
    dispatch(getTasks());
  };*/
  async function deleteHandler(taskId?: number) {
    await dispatch(deleteTask(taskId as number));
    await dispatch(
      getTasks({
        onSuccess: () => {},
        onFail: () => {
          navigateTo("/login");
        },
      })
    );
    const deletingId = document.getElementById(
      `${(taskId as number) - 1}`
    ) as HTMLElement;
    window.scrollTo(0, deletingId.offsetTop - 20);
  }

  useEffect(() => {
    // Dispatch getTasks action to load tasks from the API
    dispatch(
      getTasks({
        onSuccess: () => {},
        onFail: () => {
          navigateTo("/login");
        },
      })
    );
  }, [dispatch, navigateTo]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#f9f9f9",
    ...theme.typography.body2,
    //padding: theme.spacing(1),
    textAlign: 'center',
    border : "none",
    boxShadow : "none",
    lineHeight : 3
  }));

  return (
    <>
      <FormModal
        formIsOpen={formIsOpen}
        setFormIsOpen={setFormIsOpen}
        onConfirm={confirmHandler}
        onInput={addData}
      />

      <Container maxWidth="md" style={{ marginTop: "100px",}}>
        <MuiCard sx={{ borderRadius: "40px", padding: "1%",backgroundColor: "#f9f9f9" }}>

            <Tabs
              value={value}
              onChange={handleTabChange}
              centered
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              
            >
              <Tab value="one" label="messages" />
              <Tab value="two" label="Today's tasks" />
              <Tab value="three" label="last activity" />
            </Tabs>


          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Item >
                {" "}
                <Typography variant="h5">Todays Task</Typography>
                {" "}
                <CurrentTimeComponent />
              </Item>
              <Item sx={{paddingTop : "3%"}}>
                {" "}
                <Button
                  size="large"
                  sx={{
                    backgroundColor: "#e2ebfa",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  onClick={() => {
                    setFormIsOpen(true);
                  }}
                >
                  + New Task
                </Button>
              </Item>
            </Stack>

            <BottomNavigation
              showLabels={true}
              value={taskType}
              onChange={(event, newValue) => {
                setTaskType(newValue);
              }}
              sx={{backgroundColor : "#f9f9f9", marginBottom : "15px"}}
            >
              <BottomNavigationAction
                label={`All`}
                value={0}
                icon={
                  <Badge
                    badgeContent={(tasksData ?? []).length}
                    color={taskType === 0 ? "primary" : "secondary"}
                    sx={{marginBottom : "10px"}}
                  />
                }
              />
              <BottomNavigationAction
                label={`Opened `}
                value={1}
                icon={
                  <Badge
                    badgeContent={openedCount}
                    color={taskType === 1 ? "primary" : "secondary"}
                    sx={{marginBottom : "10px"}}
                  />
                }
              />
              <BottomNavigationAction
                label={`Closed`}
                value={2}
                icon={
                  <Badge
                    badgeContent={closedCount}
                    color={taskType === 2 ? "primary" : "secondary"}
                    sx={{marginBottom : "10px"}}
                  />
                }
              />
              <BottomNavigationAction
                label={`Archived`}
                value={3}
                icon={<Badge badgeContent={2} color="secondary" sx={{marginBottom : "10px"}}/>}
              />
            </BottomNavigation>
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
          </CardContent>
        </MuiCard>
      </Container>
    </>
  );
}

export default Card;
