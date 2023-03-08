import React, { useEffect, useState } from "react";

//Redux
import {
  loginFailure,
  loginSuccess,
  loginStart,
  registeredSuccess,
  registeredFailure,
} from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { registered } = useSelector((state) => state.user);

  useEffect(() => {
    if (registered) {
      toast.success("Logged succesfully!", {
        duration: 5000,
      });
    }

    return;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(registeredFailure());
    }, 5000);
  }, [registered]);

  return (
    <>
      <Toaster position="top-center" />
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
