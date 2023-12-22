import ToDoListHeader from "../todolist-header.component/tosolistheader";
import { Button, ButtonGroup } from "react-bootstrap";
import { Trash, PencilFill, Calendar2, Save2Fill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addtask } from "../redux/taskdata.mjs";
import "./todolist.scss";

const ToDoList: React.FC = () => {
  const [taskinfo, setTaskInfo] = useState([]);
  const [refreshKey, setRefreshKey] = useState(true);
  const [isClicked, setIsClicked] = useState(true);

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
      fetch("http://localhost:5000/user/tasklist", Postdata)
        .then((response) => response.json())
        .then((data) => {
          setTaskInfo(data.taskdata[0].task);
          dispach(addtask(data.taskdata[0].task));
          setRefreshKey(false);
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
          console.log(data);
          setRefreshKey(true);
        })
        .catch((error) => console.log(error));
    };
    fetching();
  };

  const ClickCheck = (index: number) => {
    console.log(isClicked);
    const id = "task" + index;
    if (isClicked === true) {
      AddClass("checkbox", "clicked", id);
      AddClass("task-td", "done", id);
      setIsClicked(!isClicked);
    } else {
      RemoveClass("checkbox", "clicked", id);
      RemoveClass("task-td", "done", id);
      setIsClicked(!isClicked);
    }
  };

  const AddClass = (classname: string, additionalclass: string, id: string) => {
    const selectItem = document.querySelector("#" + id);
    const taskItem = selectItem?.querySelector("." + classname);
    if (taskItem) {
      taskItem.classList.add(additionalclass);
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
    }
  };

  return (
    <div className="main-todolist-container">
      <div>
        <ToDoListHeader />
      </div>
      <div className="task-container">
        <table className="table-con">
          <thead>
            <tr>
              <th>Task Description</th>
              <th>
                <Calendar2 /> Start Date
              </th>
              <th>
                <Calendar2 />
                End Data
              </th>
              <th>Status</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {taskinfo.map((ti: any, index: any) => {
              return (
                <tr key={index} id={`task${index}`} className="tr-con">
                  <td className="task-td">{ti.taskDescription}</td>
                  <td>{ti.startDate}</td>
                  <td>{ti.endDate}</td>
                  <td>
                    <input
                      type="checkbox"
                      onClick={() => ClickCheck(index)}
                      className="checkbox"
                    />
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button onClick={() => editTask(index)}>
                        <PencilFill
                          style={{ height: "25px", width: "25px" }}
                        ></PencilFill>
                      </Button>
                      <Button onClick={() => deleteItem(index)}>
                        <Trash style={{ height: "25px", width: "25px" }} />
                      </Button>
                      <Button>
                        <Save2Fill
                          style={{ height: "25px", width: "25px" }}
                        ></Save2Fill>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ToDoList;
