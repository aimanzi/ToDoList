import { useState } from "react";
import "./signup.scss";
import { useDispatch } from "react-redux";
import { userSelect } from "../redux/userOption.mjs";

const SignUp: React.FC = () => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRePassword] = useState("");
  const [passworerror, setPasswordError] = useState<string>("");
  const [mailerror, setMailError] = useState<string>("");

  const dispatch = useDispatch();
  const BackTo = () => {
    dispatch(userSelect(""));
  };

  const SignUpValidation = () => {
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    );
    if (!emailRegex.test(mail)) {
      setMailError("Mail must meet the specified criteria.");
    } else {
      setMailError("");
    }

    const passwordRegex = new RegExp(/^(?!.*[#!])(?=.*[A-Z])(?=.*[0-9]).{8,}$/);
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must meet the specified criteria.");
    } else {
      setPasswordError("");
      ToSignUp();
    }
  };

  const ToSignUp = () => {
    const signupData = {
      fname,
      lname,
      mail,
      password,
      repassword,
    };

    const Postdata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin, ",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    };
    const fetching = async () => {
      await fetch("http://localhost:5000/signup", Postdata)
        .then((response) => response.json())
        .then((data) => {
          if (data.signup_status) {
            clearInputs();
          }
        })
        .catch((error) => console.log(error));
    };
    fetching();
  };

  const clearInputs = () => {
    setFname("");
    setLname("");
    setMail("");
    setPassword("");
    setRePassword("");
  };

  return (
    <div className="main-signup-container">
      <div className="signinInput-container">
        <div className="input-con">
          <label>First Name : </label>
          <input
            type="text"
            value={fname}
            onChange={(f_name) => setFname(f_name.target.value)}
            className="form-control"
            placeholder="first name"
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="input-con">
          <label>Last Name : </label>
          <input
            type="text"
            value={lname}
            onChange={(l_name) => setLname(l_name.target.value)}
            className="form-control"
            placeholder="last name"
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="input-con">
          <label>Mail :</label>
          <input
            type="text"
            value={mail}
            onChange={(email) => setMail(email.target.value)}
            className="form-control"
            placeholder="mail address"
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="input-con">
          <label>Password :</label>
          <input
            type="password"
            value={password}
            onChange={(passwrd) => setPassword(passwrd.target.value)}
            className="form-control"
            placeholder="at least 8 digits"
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="input-con">
          <label>Re-Enter Password :</label>
          <input
            type="password"
            value={repassword}
            onChange={(rpasswrd) => setRePassword(rpasswrd.target.value)}
            className="form-control"
            placeholder="re-enter password"
            style={{ textAlign: "center" }}
          />
        </div>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-info"
          onClick={SignUpValidation}
        >
          Submit
        </button>
        <button type="button" className="btn btn-info" onClick={BackTo}>
          Back
        </button>
      </div>
      <div>
        <h5>{mailerror}</h5>
        <h5>{passworerror}</h5>
      </div>
    </div>
  );
};
export default SignUp;
