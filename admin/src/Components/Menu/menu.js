import React, { useEffect, useState } from "react";
import axios from "../../services/Axios";
import AddItem from "./AddItem";
import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function Menu() {
  const [menu, setmenu] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    const response = await axios.get("/dish");
    if (response.data) {
      setmenu(response.data);
    }
  };
  const pushData=(data)=>{
    var tempdata = menu
    tempdata.push(data);
    setmenu(tempdata);
  }
  return (
    <div>
      {console.log(menu)}
      <button type="button" onClick={handleOpen}>
        Add Dish
      </button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{fontWeight:"bold"}}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((item) => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell >{item.desc}</TableCell>
                <TableCell >{item.category}</TableCell>
                <TableCell >{item.price}₹</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            width: "500px",
            background: "white",
            height: "500px",
            margin: "auto",
            marginTop: "100px",
            padding: "10px",
          }}
        >
          <div
            style={{
              float: "right",
              fontSize: "24px",
              fontWeight: "bolder",
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            X
          </div>
          <AddItem pushData={pushData} handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
}