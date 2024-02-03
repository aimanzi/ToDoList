import { useSelector } from "react-redux";
import ToDOListImg from "../../assets/images/OIP.jpg";
import "./tosolistheader .scss";
import { Link } from "react-router-dom";

const ToDoListHeader: React.FC = () => {
  const usedata = useSelector(
    (state: any) => state.AllReducers.userdata.userdata
  );

  const LogOut = () => {
    const Postdata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const fetching = async () => {
      await fetch("http://localhost:5000/logout", Postdata)
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => console.log(error));
    };
    fetching();
  };
  return (
    <div className="header-main-container">
      <div>
        <img src={ToDOListImg} alt="tdlimg" />
      </div>
      <div>
        <h2>Hello {usedata.firstname + " " + usedata.lastname}</h2>
      </div>
      <div>
        <h1>List To Do</h1>
      </div>
      <div className="links-container">
        <ul className="list-item">
          <li className="linkto">
            <Link to={"/addtask"} className="link">
              Add Task
            </Link>
          </li>
          <li className="linkto">
            <Link to={"/"} className="link" onClick={LogOut}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ToDoListHeader;
