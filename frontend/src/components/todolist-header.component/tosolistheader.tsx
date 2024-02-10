import { useDispatch, useSelector } from "react-redux";
import ToDOListImg from "../../assets/images/OIP.jpg";
import "./tosolistheader .scss";
import { userSelect } from "../redux/userOption.mjs";
import { useNavigate } from "react-router-dom";

const ToDoListHeader: React.FC = () => {
  const usedata = useSelector(
    (state: any) => state.AllReducers.userdata.userdata
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = () => {
    dispatch(userSelect(""));
    navigate("/");
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
        <h3>Hello {usedata.firstname + " " + usedata.lastname}</h3>
      </div>
      <div className="btn-group">
        <button className="btn btn-outline-danger" onClick={LogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ToDoListHeader;
