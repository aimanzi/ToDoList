import "./header.scss";
import { useNavigate } from "react-router-dom";
import HeaderImg from "../../assets/images/OIP.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { ButtonGroup } from "react-bootstrap";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const ConnectingToMD = (status: string) => {
    if (status === "login") {
      navigate("/login");
    } else {
      if (status === "signup") {
        navigate("signup");
      }
    }

    const Postdata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const fetching = async () => {
      await fetch("http://localhost:5000/connectToDb", Postdata)
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => console.log(error));
    };
    fetching();
  };

  return (
    <div className="header-main-container">
      <div>
        <img src={HeaderImg} alt="tdlimg" />
      </div>
      <div>
        <h1>List To Do</h1>
      </div>
      <div>
        <ButtonGroup>
          <button
            className="btn btn-info"
            onClick={() => ConnectingToMD("login")}
          >
            Longin
          </button>
          <button
            className="btn btn-info"
            onClick={() => ConnectingToMD("signup")}
          >
            SignUp
          </button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Header;
