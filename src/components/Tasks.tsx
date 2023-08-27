/* eslint-disable @typescript-eslint/no-explicit-any */

import TasksList from "./TasksList";


interface tasksType {
  items : {
    title : string,
    id : number,
    userId : number,
    owner ?: number,
    description : string,
    date : number,
    done : boolean,
  }[] | null,
  onDeleteItem : () => void
}


const Tasks = ({items,onDeleteItem} : tasksType) => {
  return (
    <>
      <TasksList onDeleteItem={onDeleteItem} items={items ?? []}/>
    </>
  );
};
export default Tasks;
