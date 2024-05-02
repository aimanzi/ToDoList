import ToDoListHeader from "../todolist-header.component/tosolistheader";
import { ButtonGroup } from "react-bootstrap";
import { Trash, PencilFill, Calendar2EventFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addtask } from "../redux/taskdata.mjs";
import "./todolist.scss";
import Loader from "../loder/loader";

const ToDoList: React.FC = () => {
  const [taskinfo, setTaskInfo] = useState([]);
  const [refreshKey, setRefreshKey] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isloder, setIsLoder] = useState<boolean>(false);

  console.log(isClicked);

  const navigate = useNavigate();
  const dispach = useDispatch();

  const userid = useSelector(
    (state: any) => state.AllReducers.userdata.userdata._id
  );

  useEffect(() => {
    const Postdata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid }),
    };

    const fetching = () => {
      setIsLoder(true);
      fetch("http://localhost:5000/user/tasklist", Postdata)
        .then((response) => response.json())
        .then((data) => {
          setTaskInfo(data.taskdata[0].task);
          dispach(addtask(data.taskdata[0].task));
          setRefreshKey(false);
          setIsLoder(false);
        })
        .catch((error) => console.log(error));
    };
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const editTask = (index: number) => {
    const data = `${index}`;
    navigate("/edittask", { state: { data } });
  };

  const deleteItem = (index: number) => {
    const Postdata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index, userid }),
    };

    const fetching = () => {
      fetch("http://localhost:5000/user/tasklist/deletetask", Postdata)
        .then((response) => response.json())
        .then((data) => {
          setRefreshKey(true);
        })
        .catch((error) => console.log(error));
    };
    fetching();
  };

  const ClickCheck = (index: number) => {
    const id = `task${index}`;
    if (isClicked !== true) {
      AddClass("task-td", "done", id);
    } else {
      RemoveClass("task-td", "done", id);
    }
  };

  const AddClass = (classname: string, additionalclass: string, id: string) => {
    const selectItem = document.querySelector("#" + id);
    const taskItem = selectItem?.querySelector("." + classname);
    if (taskItem) {
      taskItem.classList.add(additionalclass);
      setIsClicked(!isClicked);
    }
  };

  const RemoveClass = (
    classname: string,
    additionalclass: string,
    id: string
  ) => {
    const selectItem = document.querySelector("#" + id);
    const taskItem = selectItem?.querySelector("." + classname);
    if (taskItem) {
      taskItem.classList.remove(additionalclass);
      setIsClicked(!isClicked);
    }
  };

  const AddTask = () => {
    navigate("/addtask");
  };

  return (
    <div className="main-todolist-container">
      {isloder ? <Loader /> : ""}
      <div>
        <ToDoListHeader />
      </div>
      <div className="task-container">
        <table className="table-con">
          <thead>
            <tr>
              <th>Task Description</th>
              <th>
                <Calendar2EventFill />
                Start Date
              </th>
              <th>
                <Calendar2EventFill />
                End Data
              </th>
              <th>Status</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {taskinfo.map((ti: any, index: any) => {
              return (
                <tr key={index} className="tr-con" id={`task${index}`}>
                  <td className="task-td">{ti.taskDescription}</td>
                  <td>{ti.startDate}</td>
                  <td>{ti.endDate}</td>
                  <td id={`task${index}`}>
                    <input
                      type="checkbox"
                      onClick={() => {
                        ClickCheck(index);
                      }}
                      className={"checkbox"}
                    />
                  </td>
                  <td>
                    <ButtonGroup>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => editTask(index)}
                      >
                        <PencilFill
                          style={{
                            height: "25px",
                            width: "25px",
                          }}
                        ></PencilFill>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => deleteItem(index)}
                      >
                        <Trash
                          style={{
                            height: "25px",
                            width: "25px",
                          }}
                        />
                      </button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="addtask-con">
        <button className="btn btn-outline-success" onClick={AddTask}>
          + New Task
        </button>
      </div>
    </div>
  );
};
export default ToDoList;
