import { useLocation, useNavigate } from "react-router-dom";
import "./edittask.scss";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const EditTask: React.FC = () => {
  const [msg, setMsg] = useState<string>("");
  const location = useLocation();
  const index = location.state?.data || null;
  const navigate = useNavigate();

  const taskInfo = useSelector(
    (state: any) => state.AllReducers.usertask.taskinfo[index]
  );

  const userid = useSelector(
    (state: any) => state.AllReducers.userdata.userdata._id
  );

  let new_TaskDescription = useRef(taskInfo.taskDescription);
  let new_startDate = useRef(taskInfo.startDate);
  let new_endDate = useRef(taskInfo.endDate);

  const BackToDoList = () => {
    navigate("/toDoList");
  };

  const editTask = () => {
    let taskData = {
      taskDescription: new_TaskDescription.current.value,
      startDate: new_startDate.current.value,
      endDate: new_endDate.current.value,
    };

    const Postdata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskData, index, userid }),
    };

    const fetching = () => {
      fetch("http://localhost:5000/user/tasklist/editTask", Postdata)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.editing_status) {
            setMsg(data.message);
          }
        })
        .catch((error) => console.log(error));
    };
    fetching();
  };

  return (
    <div className="edittask-container">
      <div className="ets-inputs-con">
        <div className="inputs-con">
          <label>Task Description :</label>
          <input
            type="text"
            id="tnd"
            ref={new_TaskDescription}
            defaultValue={taskInfo.taskDescription}
          />
        </div>
        <div className="inputs-con">
          <label>Task Start Day :</label>
          <input
            type="date"
            id="tsd"
            ref={new_startDate}
            defaultValue={taskInfo.startDate}
          />
        </div>
        <div className="inputs-con">
          <label>Task End Day :</label>
          <input
            type="date"
            id="ted"
            ref={new_endDate}
            defaultValue={taskInfo.endDate}
          />
        </div>
      </div>
      <div className="button-con">
        <button type="submit" onClick={editTask}>
          Save
        </button>
        <button type="button" onClick={BackToDoList}>
          Back
        </button>
      </div>
      <div style={{ marginTop: "15px" }}>
        <strong>{msg}</strong>
      </div>
    </div>
  );
};

export default EditTask;
