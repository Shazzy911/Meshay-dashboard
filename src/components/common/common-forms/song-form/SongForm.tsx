"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import style from "./SongForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormValues {
  title: string;
  img: string;
  genre: string;
  duration: number;
  datetime: string;
  songUrl: string;
  selectedOption: string;
}

// const fetchingArtist = async()=>{

// }

const SongForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      //   const response = await fetch("http://localhost:4500/artist", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });
      console.log(data);
      // Handle successful submission (e.g., display success message)
    } catch (error) {
      console.error("Error Posting Contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h1 className={style.heading}>Song Form</h1>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.inputContainer}>
        <label className={style.label}>Song Name</label>
        <input
          type="text"
          placeholder="Song Name"
          {...register("title", { required: true })}
        />
        {errors.title && <span className={style.error}>Required</span>}
      </div>

      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
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
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.inputContainer}>
        <label className={style.label}>Bio</label>
        <input
          type="number"
          placeholder="duration"
          {...register("duration", { required: true })}
        />
        {errors.duration && <span className={style.error}>Required</span>}
      </div>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.inputContainer}>
        <label className={style.label}>Image</label>
        <input
          type="text"
          placeholder="img"
          {...register("img", { required: true })}
        />
        {errors.img && <span className={style.error}>Required</span>}
      </div>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.inputContainer}>
        <label className={style.label}>Song Url</label>
        <input
          type="text"
          placeholder="Song Url"
          {...register("songUrl", { required: true })}
        />
        {errors.songUrl && <span className={style.error}>Required</span>}
      </div>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.inputContainer}>
        <label className={style.label}>Release Date</label>
        <input
          type="datetime-local"
          {...register("datetime", { required: true })}
        />
        {errors.datetime && <span className={style.error}>Required</span>}
      </div>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.select}>
        <label className={style.label}>Select Artist</label>
        <select {...register("selectedOption", { required: true })}>
          <option value="">Select User</option>
          <option value="255">User 1</option>
          <option value="266">User 1</option>
          <option value="277">User 1</option>
        </select>
        {errors.selectedOption && <span className={style.error}>Required</span>}
      </div>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.select}>
        <label className={style.label}>Select Album</label>
        <select {...register("selectedOption", { required: true })}>
          <option value="">Select User</option>
          <option value="id">User 1</option>
          <option value="id">User 1</option>
          <option value="id">User 1</option>
        </select>
        {errors.selectedOption && <span className={style.error}>Required</span>}
      </div>
      <Button text="Send Now" value="submit" href="/form/artistform" />
    </form>
  );
};

export default SongForm;
