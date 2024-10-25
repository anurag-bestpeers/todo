import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { MdDone } from "react-icons/md";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    if (!taskInput) {
      toast.error("Task cannot be empty");
      return;
    }

    let obj = {
      task: taskInput,
      status: false,
    };

    setTodo([...todo, obj]);
    setTaskInput("");
    setIsModalOpen(false);
  };

  const handleCheckBox = (e, item, index) => {
    let updatedItem = {
      ...item,
      status: e.target.checked,
    };
    let updatedTodo = [...todo];
    updatedTodo[index] = updatedItem;
    setTodo(updatedTodo);
  };

  const handleDelete = (index) => {
    let newTodo = todo.filter((_, i) => i !== index);
    setTodo(newTodo);
  };

  const handleEdit = (item, index) => {
    if (!item.status) {
      setEditIndex(index);
      setEditData(item);
    } else {
      toast.error("Can't edit a completed task");
    }
  };

  const handleEditData = (e) => {
    setEditData({
      ...editData,
      task: e.target.value,
    });
  };

  const handleUpdate = () => {
    let updatedTodo = [...todo];
    updatedTodo[editIndex] = editData;
    setTodo(updatedTodo);
    setEditIndex(-1);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div className="parent">
        <div className="container1">
          <button onClick={handleClick}>Add Task</button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Add Task Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Add a New Task</h2>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter your task"
            className="input-todo"
          />
          <button onClick={handleAddTask}>Add Task</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Modal>

        {todo.length > 0 && (
          <div className="container2">
            {todo.map((item, index) => {
              if (editIndex === index) {
                return (
                  <div className="edit" key={index}>
                    <input
                      type="text"
                      value={editData.task}
                      onChange={handleEditData}
                    />
                    <button className="updateBtn" onClick={handleUpdate}>
                      <MdDone />
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="task" key={index}>
                    <div>
                      <input
                        onChange={(e) => handleCheckBox(e, item, index)}
                        type="checkbox"
                      />
                      <h3 className={item.status ? "active" : null}>
                        {item.task}
                      </h3>
                    </div>
                    <div>
                      <button onClick={() => handleEdit(item, index)}>
                        <MdEdit />
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
