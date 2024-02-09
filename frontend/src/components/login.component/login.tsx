import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { adduser } from "../redux/userdata.mjs";
import { useDispatch } from "react-redux";
import { BoxArrowInRight, PeopleFill } from "react-bootstrap-icons";
import { userSelect } from "../redux/userOption.mjs";

const LogIn: React.FC = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginerror, setLoginError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BackTo = () => {
    dispatch(userSelect(""));
  };

  const LoginTo = () => {
    if (username === "" && password === "") {
      setLoginError("user name/password is missing");
    } else {
      if (username === "") {
        setLoginError("user name is missing");
      } else {
        if (password === "" || null) {
          setLoginError("password is missing");
        } else {
          const loginData = {
            username,
            password,
          };
          const Postdata = {
            method: "POST",
            headers: {
              "Access-Control": "Allow-Origin",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          };
          const fetching = async () => {
            await fetch("http://localhost:5000/login", Postdata)
              .then((response) => response.json())
              .then((data) => {
                if (data.login_status) {
                  dispatch(adduser(data.userdata));
                  navigate("/toDoList");
                  ClearInputs();
                } else {
                  setLoginError(data.message);
                }
              })
              .catch((error) => console.log(error));
          };
          fetching();
        }
      }
    }
  };

  const ClearInputs = () => {
    setUserName("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="loginInput-container">
        <div className="input-con">
          <PeopleFill />
          <label>User Name : </label>
          <input
            type="email"
            required
            value={username}
            onChange={(nme) => setUserName(nme.target.value)}
            className="form-control"
            placeholder="mail"
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="input-con">
          <BoxArrowInRight />
          <label>Password : </label>
          <input
            type="password"
            required
            value={password}
            onChange={(pwrd) => setPassword(pwrd.target.value)}
            className="form-control"
            placeholder="password"
            style={{ textAlign: "center" }}
          />
        </div>
      </div>
      <div className="login-buttons-container">
        <div className="button-con">
          <button type="submit" className="button" onClick={LoginTo}>
            login
          </button>
        </div>
        <div className="button-con">
          <button type="button" className="button" onClick={BackTo}>
            {/* <Link to={"/"} className="linkto"> */}
            Back
            {/* </Link> */}
          </button>
        </div>
      </div>
      <div>
        <h5>{loginerror}</h5>
      </div>
    </div>
  );
};
export default LogIn;
