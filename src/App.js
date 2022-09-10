import logo from "./logo.svg";
import "./App.css";
import AllTasks from "./Components/AllTasks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTask from "./Components/CreateTask";
import UpdateTask from "./Components/UpdateTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/updateTask/:taskId" element={<UpdateTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
