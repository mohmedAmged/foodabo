import React from "react";
import { toast, ToastContainer } from "react-toastify";
import MyRouter from "routers/index";

function App() {

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <ToastContainer />
      <MyRouter />
    </div>
  );
}

export default App;
