import React from "react";
import Todo from "./components/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={700} />
      <Todo />
    </div>
  );
};

export default App;
