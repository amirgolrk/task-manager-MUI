/* eslint-disable @typescript-eslint/no-explicit-any */
//import React from "react";
//import { useEffect,useState } from "react";
import TaskItem from "./TaskItem";

interface taskListType {
  items : {
    image?: any;
    title : string,
    id : number,
    userId : number,
    owner ?: number,
    description : string,
    date : number,
    done : boolean
  }[],
  onDeleteItem : (taskId : number) => void
}

const TasksList = ({ items, onDeleteItem } : taskListType) => {
  /*const [loading ,setLoading]=useState<boolean>(false)
  useEffect(()=>{
    setLoading(false)
  },[items])
 
  console.log(items);
  //fixed key from elem.userId to ${elem.userId}-${index} to make it unique
    return (
    <>{items?.[0] ? <>
      {!loading && items?.map((elem,index) => (
        <TaskItem
          setLoading={setLoading}
          onDeleteItem={onDeleteItem}
          key={`${elem.userId}-${index}`}
          userId={elem.userId}
          owner={elem.owner}
          id={elem.id}
          title={elem.title}
          description={elem.description}
          date={elem.date}
          image={elem.image}
          done={elem.done}
        />
      ))} </>:<h2 className="mt-3" style={{textAlign:"center"}}>No tasks found</h2>}
   
    </>
  );*/
  if (items.length === 0) {
    return <h2 className="mt-3" style={{textAlign:"center"}}>No tasks found</h2>;
  }
  console.log(items);
  //fixed key from elem.userId to ${elem.userId}-${index} to make it unique
  return (
    <>
      {items.map((elem,index) => (
        <TaskItem
          onDeleteItem={onDeleteItem}
          key={`${elem.userId}-${index}`}
          userId={elem.userId}
          owner={elem.owner}
          id={elem.id}
          title={elem.title}
          description={elem.description}
          date={elem.date}
          done={elem.done}
        />
      ))}
    </>
  );
};

export default TasksList;
