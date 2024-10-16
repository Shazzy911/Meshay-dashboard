"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import style from "./UserForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormValues {
  username: string;
  email: string;
  password: string;
  selectedOption: string;
}

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:4500/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      // Handle successful submission (e.g., display success message)
    } catch (error) {
      console.error("Error Posting Contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h1 className={style.heading}>User Form</h1>

      <div className={style.inputContainer}>
        <label className={style.label}>User Name</label>
        <input
          type="text"
          placeholder="User Name"
          {...register("username", { required: true })}
        />
        {errors.username && <span className={style.error}>Required</span>}
      </div>
      <div className={style.inputContainer}>
        <label className={style.label}>E-mail Address</label>
        <input
          type="email"
          placeholder="E-mail Address"
          {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
        />
        {errors.email &&
          (errors.email.type === "required" ? (
            <span className={style.error}>Required</span>
          ) : (
            <span className={style.error}>Invalid email format</span>
          ))}
      </div>

      <div className={style.inputContainer}>
        <label className={style.label}>Password</label>
        <input
          type="text"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className={style.error}>Required</span>}
      </div>
      <Button text="Send Now" value="submit" href="/form" />
    </form>
  );
};

export default UserForm;
