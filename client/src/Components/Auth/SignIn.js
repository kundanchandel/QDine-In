import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AiOutlineUser } from "react-icons/ai";
import axios from "../../services/Axios";
import "./SignIn.css";

function Copyright() {
  return (
    <Typography>
      {"Copyright © "}
      <Link color="inherit" href="/">
        QDine-In
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Incomplete Fields");
    } else {
      const data = { email, password };
      const response = await axios.post("/login", data);
      if (response.data.token) {
        console.log(response);
        localStorage.setItem("x-access-token", response.data.token);
        window.open("/", "_self");
      } else {
        alert("Invalid Email or Password");
      }
    }
  };

  const handleForgotCLick = async () => {
    if (email != "") {
      const response = await axios.post("/forgotpassword", { email });
      if (response.data.err) {
        window.alert(response.data.err);
      } else {
        window.alert("An email has been sent to given mail Id");
      }
    } else {
      window.alert("Email field is required!!!");
    }
  };

  return (
    <div className="container">
      <div className="brand">
        <h1>
          <span className="q">Q</span>Dine-In
        </h1>
      </div>
      <div className="form">
        <div className="avtar">
          <AiOutlineUser className="avtarLogo" />
        </div>
        <form noValidate>
          <div>
            <div>
              <input
                className="inputField"
                required
                placeholder="Email*"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="inputField"
                placeholder="Password*"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="linkContainer">
            <div className="link">
              <Link
                style={{ color: "#1492e6", fontSize: "12px" }}
                href="/SignUp"
              >
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="link">
              <Link
                style={{ color: "#1492e6", fontSize: "12px" }}
                onClick={handleForgotCLick}
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            fullWidth
            className="submitBtn"
            onClick={handelSubmit}
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
