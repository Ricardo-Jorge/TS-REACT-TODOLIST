// Styles
import "./App.css";

// Hooks
import { useState } from "react";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";

// Interface
import { ITask } from "./interfaces/Task";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty };

    const updatedItens = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItens);

    hideOrShowModal(false);
  };

  return (
    <div>
      <Modal
        title="Editar Tarefa"
        children={
          <TaskForm
            btnText="Editar Tarefa"
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />
      <div className="main">
        <div>
          <h2>O que você vai fazer</h2>
          <TaskForm
            btnText="Criar Tarefa"
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
