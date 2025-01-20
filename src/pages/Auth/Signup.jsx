import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const form = useForm({
    // resolver:zod
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Create Project Data", data);
  };
  return <div>bfdgd</div>;
};

export default Signup;
