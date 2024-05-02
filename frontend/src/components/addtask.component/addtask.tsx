import { useNavigate } from "react-router-dom";
import "./addtask.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddTask: React.FC = () => {
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const userInfo = useSelector(
    (state: any) => state.AllReducers.userdata.userdata
  );

  const navigate = useNavigate();

  const BackToDoList = () => {
    navigate("/toDoList");
  };

  const addTask = () => {
    if (taskDescription === "" || startDate === "" || endDate === "") {
      setMsg("Task Data Is Missing");
    } else {
      let taskData = {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        userid: userInfo._id,
        task: {
          taskDescription,
          startDate,
          endDate,
        },
      };
      const Postdata = {
        method: "POST",
        headers: {
          "Access-Control": "Allow-Origin, ",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      };

      const fetching = async () => {
        await fetch("http://localhost:5000/user/tasklist/addtask", Postdata)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.adding_status) {
              setMsg(data.message);
              ClearInputs();
            }
          })
          .catch((error) => console.log(error));
      };
      fetching();
    }
  };

  const ClearInputs = () => {
    setTaskDescription("");
    setStartDate("");
    setEndDate("");
    setMsg("");
  };

  return (
    <div className="addtask-container">
      <div className="ats-inputs-con">
        <div className="inputs-con">
          <label>Task Description :</label>
          <input
            value={taskDescription}
            type="text"
            onChange={(ndes) => setTaskDescription(ndes.target.value)}
          />
        </div>
        <div className="inputs-con">
          <label>Task Start Day :</label>
          <input
            value={startDate}
            type="date"
            onChange={(sd) => setStartDate(sd.target.value)}
          />
        </div>
        <div className="inputs-con">
          <label>Task End Day :</label>
          <input
            value={endDate}
            type="date"
            onChange={(ed) => setEndDate(ed.target.value)}
          />
        </div>
      </div>
      <div className="button-con">
        <button type="submit" onClick={addTask}>
          Add Task
        </button>
        <button type="button" onClick={BackToDoList}>
          Back
        </button>
      </div>
      <div className="msg-container">
        <label>{msg}</label>
      </div>
    </div>
  );
};

export default AddTask;
