"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./UserForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserFormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(15),
});

type UserFormType = z.infer<typeof UserFormSchema>;

const UserForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormType>({ resolver: zodResolver(UserFormSchema) });

  const onSubmit: SubmitHandler<UserFormType> = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setSuccessMessage(true);
        reset(); // Reset form fields
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      console.error("Error Posting Contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h1>User Form</h1>
      <div className={style.form_container}>
        <div>
          <label>User Name</label>
          <input
            type="text"
            placeholder="User Name"
            {...register("username", { required: true })}
          />
          {errors.username && <span className={style.error}>Required</span>}
        </div>
        <div>
          <label>E-mail Address</label>
          <input
            type="email"
            placeholder="E-mail Address"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors.email &&
            (errors.email.type === "required" ? (
              <span className={style.error}>Required</span>
            ) : (
              <span className={style.error}>Invalid email format</span>
            ))}
        </div>

        <div>
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span className={style.error}>Required</span>}
        </div>
      </div>
      {successMessage && (
        <p className={style.success} style={{ color: "red" }}>
          Submitted successfully!
        </p>
      )}
      <div className={style.button_container}>
        <Button text="Submit" value="submit" href="" />
        <Button text="User Table" href="/table/usertable" />
      </div>
    </form>
  );
};

export default UserForm;
