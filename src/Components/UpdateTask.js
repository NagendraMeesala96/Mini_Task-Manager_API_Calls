import { Fragment } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function UpdateTask() {


  const navigate = useNavigate();

  let { taskId } = useParams();

  const [taskName, setTaskName] = React.useState("");

  const [date, setDate] = React.useState("");

  const [taskPriority, setPriority] = React.useState("");

  const [assignUser, setAssignUser] = React.useState("");

  const [usersList, setUsersList] = React.useState([]);

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const assignUserHandleChange = (event) => {
    setAssignUser(event.target.value);
  };

  const taskNameHandler = (event) => {
    setTaskName(event.target.value);
  };

  const dateHandler = (event) => {
    setDate(event.target.value+" "+"12:12:12");
  };

  //Go Back handler
  const goBackHandler = () =>{
    navigate('/')
  }

  //Submit Handler
  const submitHandler = () => {
    if (taskName == "") {
      alert("please enter task name");
    } else {
      const formData = new FormData();
      formData.append("taskid", taskId.toString());
      formData.append("message", taskName.toString());
      formData.append("priority", taskPriority.toString());
      formData.append("assigned_to", assignUser.toString());
      formData.append("due_date", date.toString());

      console.log(formData)

      axios
        .post("https://devza.com/tests/tasks/update", formData, {
          headers: {
            AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
          },
        })
        .then((res) => {
          alert(res.data.status);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //First time API Call
  React.useEffect(() => {
    axios
      .get("https://devza.com/tests/tasks/listusers", {
        headers: {
          AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
        },
      })
      .then((res) => {
        console.log(res.data.users);
        setUsersList(res.data.users);
      });
  }, []);
  return (
    <Fragment>
      <div className="container">
        <button className="mt-3 btn btn-info" onClick={goBackHandler}>Go Back</button>
        <div className="create-task">
          <h1 className="p-4">Mini-Task Manager</h1>
          <div className="card" style={{ width: 600 }}>
            <div className="card-header d-flex">
              <h4>Update Task</h4>
            </div>
            <div className="card-body">
              <TextField
                required
                id="outlined-required"
                label="Message"
                className="w-100"
                onChange={taskNameHandler}
              />
              <FormControl className="mt-3 w-50">
                <InputLabel id="demo-simple-select-label">Assign To</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assignUser}
                  label="Age"
                  onChange={assignUserHandleChange}
                >
                  {usersList.map((user) => {
                    return (
                      <MenuItem value={user.id} key={user.id}>
                        {user.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className="mt-3 w-50">
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={taskPriority}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>High</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>Low</MenuItem>
                </Select>
              </FormControl>
              <div className="d-flex">
                <FormControl className="mt-3 w-50">
                  <input
                    type="date"
                    className="form-control"
                    onChange={dateHandler}
                  ></input>
                </FormControl>
                <FormControl className="mt-3 m-3 w-25 d-flex justify-content-center">
                  <button
                    className="btn btn-primary form-control"
                    onClick={submitHandler}
                  >
                    Update
                  </button>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateTask;
