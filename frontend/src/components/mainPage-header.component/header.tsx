import "./header.scss";
import HeaderImg from "../../assets/images/OIP.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userSelect } from "../redux/userOption.mjs";
import { ListUl } from "react-bootstrap-icons";
import { useState } from "react";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const SelectionHandling = (status: string) => {
    if (status === "login") {
      setShow(false);
      dispatch(userSelect(status));
    } else {
      if (status === "signup") {
        setShow(false);
        dispatch(userSelect("signup"));
      }
    }

    // const Postdata = {
    //   method: "POST",
    //   headers: {
    //     "Access-Control": "Allow-Origin",
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // };
    // const fetching = async () => {
    //   await fetch("http://localhost:5000/connectToDb", Postdata)
    //     .then((response) => response.json())
    //     .then((data) => {})
    //     .catch((error) => console.log(error));
    // };
    // fetching();
  };

  return (
    <div className="mainpage-header-container">
      <div>
        <img src={HeaderImg} alt="tdlimg" />
      </div>
      <div>
        <h1>List To Do</h1>
      </div>
      <div className="offcanvas-container">
        <button
          className="btn btn-info"
          onClick={() => {
            setShow(!show);
            dispatch(userSelect(""));
          }}
        >
          <ListUl style={{ height: "40px", width: "40px" }} />
          Menu
        </button>
        <Offcanvas placement="end" show={show}>
          <Offcanvas.Header>
            <h3> Menu Option's</h3>
            <button
              onClick={() => setShow(!show)}
              className="btn btn-close"
            ></button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul>
              <li>
                <h4 onClick={() => SelectionHandling("login")}> Login</h4>
              </li>
              <li>
                <h4 onClick={() => SelectionHandling("signup")}> SignUp</h4>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default Header;
