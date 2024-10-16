"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import style from "./ArtistForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  genre: string;
  bio: string;
  img: string;
  selectedOption: string;
}

const ArtistForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:4500/artist", {
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
      <h1 className={style.heading}>Artist Form</h1>

      <div className={style.inputContainer}>
        <label className={style.label}>Artist Name</label>
        <input
          type="text"
          placeholder="Artist Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span className={style.error}>Required</span>}
      </div>
      <div className={style.inputContainer}>
        <label className={style.label}>Genre</label>
        <input
          type="text"
          placeholder="Genre"
          {...register("genre", { required: true })}
        />
        {errors.genre &&
          (errors.genre.type === "required" ? (
            <span className={style.error}>Required</span>
          ) : (
            <span className={style.error}>Invalid email format</span>
          ))}
      </div>

      <div className={style.inputContainer}>
        <label className={style.label}>Bio</label>
        <input
          type="text"
          placeholder="bio"
          {...register("bio", { required: true })}
        />
        {errors.bio && <span className={style.error}>Required</span>}
      </div>
      <div className={style.inputContainer}>
        <label className={style.label}>Image</label>
        <input
          type="text"
          placeholder="img"
          {...register("img", { required: true })}
        />
        {errors.img && <span className={style.error}>Required</span>}
      </div>
      {/* <div className={style.select}>
        <label className={style.label}>Select Artist</label>
        <select {...register("selectedOption", { required: true })}>
          <option value="">Select User</option>
          <option value="id">User 1</option>
          <option value="id">User 1</option>
          <option value="id">User 1</option>
        </select>
        {errors.selectedOption && <span className={style.error}>Required</span>}
      </div>
      <div className={style.select}>
        <label className={style.label}>Select Artist</label>
        <select {...register("selectedOption", { required: true })}>
          <option value="">Select User</option>
          <option value="id">User 1</option>
          <option value="id">User 1</option>
          <option value="id">User 1</option>
        </select>
        {errors.selectedOption && <span className={style.error}>Required</span>}
      </div> */}
      <Button text="Send Now" value="submit" href="/form/artistform" />
    </form>
  );
};

export default ArtistForm;
