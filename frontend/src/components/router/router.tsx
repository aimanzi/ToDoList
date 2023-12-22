import { Route, Routes } from "react-router-dom";
import MainPage from "../mainpage.components/mainpage";
import SignUp from "../signup.component/signup";
import LogIn from "../login.component/login";
import ToDoList from "../todolist.component/todolist";
import AddTask from "../addtask.component/addtask";
import EditTask from "../edittask.component/edittask";

const Router: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/toDoList" element={<ToDoList />} />
        <Route path="/addtask" element={<AddTask />}></Route>
        <Route path="/edittask" element={<EditTask />}></Route>
      </Routes>
    </div>
  );
};

export default Router;
