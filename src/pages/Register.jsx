import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/Authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Register() {
  const navigate = useNavigate(true);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/users/Register", values);
      message.success("Registeration Successfully");
      setLoading(false);
    } catch (error) {
      message.error("something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("SheyMoney-users")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>SHEY-MONEY / REGISTER</h1>

            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered, Click Here To Login</Link>
              <button className="primary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
