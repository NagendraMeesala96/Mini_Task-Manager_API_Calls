import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import { Fragment, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const columns = [
  { id: "S.NO", label: "S.No", minWidth: 70, align: "center" },
  { id: "Message", label: "Task Name", minWidth: 170, align: "center" },
  {
    id: "Assigned Name",
    label: "Assigned Name",
    minWidth: 150,
    align: "center",
  },
  {
    id: "Priority",
    label: "Priority",
    minWidth: 170,
    align: "center",
  },
  {
    id: "created_on",
    label: "Created_on",
    minWidth: 170,
    align: "center",
  },
  {
    id: "due_date",
    label: "Due_date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];
const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  border: 1,
};
function AllTasks() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [rows, setRows] = React.useState([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searched, setSearched] = React.useState("");

  const [filteredData, setFilteredData] = React.useState("");

  const [filterTaskPriority, setFilterTaskPriority] = React.useState("");

  const [filterDate, setFilterDate] = React.useState("");

  const handleChange = (event) => {
    setFilterTaskPriority(event.target.value);
  };

  const handleFilterDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Delete Task Handler
  const deleteHandler = (taskId) => {
    const formData = new FormData();
    formData.append("taskid", taskId.toString());

    axios
      .post("https://devza.com/tests/tasks/delete", formData, {
        headers: {
          AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
        },
      })
      .then((res) => {
        alert(res.data.message);
        loadAllTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadAllTasks();
  }, []);

  //Load All Tasks
  const loadAllTasks = () => {
    axios
      .get("https://devza.com/tests/tasks/list", {
        headers: {
          AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
        },
      })
      .then((res) => {
        setRows(res.data.tasks);
        setFilteredData(res.data.tasks);
        console.log(res.data.tasks);
      });
  };

  const requestSearch = (event) => {
    setSearched(event.target.value);
    const filteredRows = filteredData.filter((row) => {
      return row.message
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRows(filteredRows);
  };

  //Create Task Page Navigation
  const createTask = () => {
    console.log("clicked");
    navigate("/createTask");
  };

  //Update Task
  const updateTask = (taskId) => {
    navigate(`/updateTask/${taskId}`);
  };

  //Filter Handler
  const filterSearchHandler = () => {
    const filteredRows = filteredData.filter((row) => {
      return row.priority.includes(filterTaskPriority);
    });
    console.log(filteredRows);
    setRows(filteredRows);
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <h1>Mini-Task Manager</h1>
        <div className="d-flex justify-content-end container-fluid mt-3">
          <button className="btn btn-primary" onClick={createTask}>
            Create Task
          </button>
        </div>
        <Box className="mt-2">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <div className="d-flex justify-content-between container-fluid mt-3">
              <button className="btn btn-primary btn-lg" onClick={handleShow}>
                Filter
              </button>
              <TextField
                required
                id="outlined-required"
                label="Search"
                className="w-50"
                value={searched}
                onChange={requestSearch}
              />
            </div>
            <TableContainer sx={{ maxHeight: 440, mt: 3 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        className="fw-bold bg-dark text-white"
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell className="text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.message}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.assigned_name
                              ? row.assigned_name
                              : "Not Assigned"}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.priority == 1
                              ? "High"
                              : row.priority == 2
                              ? "Medium"
                              : "Low"}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.created_on}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.due_date ? row.due_date : "null"}
                          </TableCell>
                          <TableCell className="d-flex justify-content-around align-items-center">
                            <EditIcon
                              className="action-icon"
                              onClick={() => {
                                updateTask(row.id);
                              }}
                            />
                            <DeleteIcon
                              className="action-icon"
                              onClick={() => {
                                deleteHandler(row.id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 15, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
      {/* Filter Model */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Task Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <FormControl className="mt-3 w-100">
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterTaskPriority}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={1}>High</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>Low</MenuItem>
            </Select>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              filterSearchHandler();
            }}
          >
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AllTasks;
