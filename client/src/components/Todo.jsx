import "../../styles/style.css"
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";

const Todo = ({ task, toggleComplete,deleteTodo}) => {
  return (
    <Card className="todo w-full  flex space-x-20 justify-center px-4 py-4 mt-6">

      <CardContent onClick={() => toggleComplete(task.id)} className={`${task.completed ? "completed" : ""} cursor-pointer`}>
        <p>{task.task}</p>
      </CardContent>
      <div className="flex gap-2">

      {/* <ion-icon name="create-outline"></ion-icon> */}
      <ion-icon  onClick={() => deleteTodo(task.id)} name="trash-outline"></ion-icon>
        
      </div>
    </Card>
  );
};

export default Todo;
