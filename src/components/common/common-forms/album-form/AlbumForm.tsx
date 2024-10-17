"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import style from "./AlbumForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormValues {
  title: string;
  genre: string;
  bio: string;
  img: string;
  datetime: string;
  artistId: string;
}

// const fetchingArtist = async()=>{

// }

const AlbumForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:4500/album", {
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
      <h1 className={style.heading}>Album Form</h1>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.form_container}>
        <div>
          <label>Album Name</label>
          <input
            type="text"
            placeholder="Album Name"
            {...register("title", { required: true })}
          />
          {errors.title && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Genre</label>
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
        <div>
          <label>Image</label>
          <input
            type="text"
            placeholder="img"
            {...register("img", { required: true })}
          />
          {errors.img && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Release Date</label>
          <input
            type="datetime-local"
            {...register("datetime", { required: true })}
          />
          {errors.datetime && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Select Artist</label>
          <select {...register("artistId", { required: true })}>
            <option value="">Select Artist</option>
            <option value="cm29ca9iq0006muahlz1gccij">Billie Ellish</option>
            <option value="266">User 1</option>
            <option value="277">User 1</option>
          </select>
          {errors.artistId && <span className={style.error}>Required</span>}
        </div>
      </div>
      <div className={style.button_container}>
        <Button text="Submit" value="submit" href="/form" />
        <Button text="User Table" href="/table/albumtable" />
      </div>
    </form>
  );
};

export default AlbumForm;
