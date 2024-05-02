import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TimeDate: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const userData = useSelector(
    (state: any) => state.AllReducers.userdata.userdata
  );

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const time: string = `${hours}:${minutes < 10 ? "0" : ""}${minutes} `;

      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const date = `${day}/${month < 10 ? "0" : ""}${month}/${year}`;
      setCurrentTime(date + " " + time);
      
      const status = ampm === "PM" ? "Good Evening" : "Good Morning";
      setStatus(status);
    };
    updateCurrentTime();
  }, [status, currentTime]);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h4>{status + " " + userData.firstname + " " + userData.lastname}</h4>
        <time> {currentTime}</time>
      </div>
    </div>
  );
};

export default TimeDate;
