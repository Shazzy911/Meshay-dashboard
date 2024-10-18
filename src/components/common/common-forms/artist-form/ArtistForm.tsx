"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import style from "./ArtistForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  genre: string;
  bio: string;
  img: FileList; // Note the type change for file;
}

const ArtistForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("genre", data.genre);
    formData.append("bio", data.bio);
    formData.append("img", data.img[0]);

    try {
      const response = await fetch("http://localhost:7500/artist", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      // Handle successful submission (e.g., display success message)
    } catch (error) {
      console.error("Error Posting Contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h1 className={style.heading}>Artist Form</h1>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.form_container}>
        <div>
          <label>Artist Name</label>
          <input
            type="text"
            placeholder="Artist Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className={style.error}>Required</span>}
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
          <label>Bio</label>
          <input
            type="text"
            placeholder="bio"
            {...register("bio", { required: true })}
          />
          {errors.bio && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Image</label>
          <input
            type="file"
            placeholder="img"
            {...register("img", { required: true })}
          />
          {errors.img && <span className={style.error}>Required</span>}
        </div>
      </div>
      <div className={style.button_container}>
        <Button text="Submit" value="submit" href="/form" />
        <Button text="Table" href="/table/artisttable" />
      </div>
    </form>
  );
};

export default ArtistForm;
