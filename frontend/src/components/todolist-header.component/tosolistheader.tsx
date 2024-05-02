import { useDispatch } from "react-redux";
import ToDOListImg from "../../assets/images/OIP.jpg";
import "./tosolistheader .scss";
import { userSelect } from "../redux/userOption.mjs";
import { useNavigate } from "react-router-dom";
import TimeDate from "../timeDate.component/timeDate";

const ToDoListHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = () => {
    dispatch(userSelect(""));
    navigate("/");
    // const Postdata = {
    //   method: "POST",
    //   headers: {
    //     "Access-Control": "Allow-Origin",
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // };

    // const fetching = async () => {
    //   await fetch("http://localhost:5000/logout", Postdata)
    //     .then((response) => response.json())
    //     .then((data) => {})
    //     .catch((error) => console.log(error));
    // };
    // fetching();
  };

  return (
    <div className="todolist-header-container">
      <div>
        <img src={ToDOListImg} alt="tdlimg" />
      </div>
      <div>
        <TimeDate />
      </div>
      <div className="btn btn-group-lg">
        <button className="btn btn-outline-danger" onClick={LogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ToDoListHeader;
