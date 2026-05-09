"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./AlbumForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ArtistSelect from "@/components/ui/selection/ArtistSelect";
import { AlbumFormType, AlbumFormData } from "@/types/album";
import { postAlbum } from "@/lib/api/postAlbum";

const AlbumForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AlbumFormType>({ resolver: zodResolver(AlbumFormData) });

  const onSubmit: SubmitHandler<AlbumFormType> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("genre", data.genre);
    formData.append("img", data.img[0]);
    formData.append("artistId", data.artistId);
    formData.append("releaseDate", data.releaseDate);

    try {
      const result = await postAlbum(formData);
      if (result.success) {
        setSuccessMessage(true);
        reset(); // Reset form fields
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      console.error("Error Posting Album:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h1 className={style.heading}>Album Form</h1>
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

        <div>
          <label>Image</label>
          <input
            type="file"
            placeholder="img"
            {...register("img", { required: true })}
          />
          {errors.img && <span className={style.error}>Required</span>}
        </div>

        <div>
          <label>Release Date</label>
          <input
            type="datetime-local"
            {...register("releaseDate", { required: true })}
          />
          {errors.releaseDate && <span className={style.error}>Required</span>}
        </div>

        <div>
          <ArtistSelect register={register} errors={errors} />
          {errors.artistId && <span className={style.error}>Required</span>}
        </div>
      </div>
      {successMessage && (
        <p className={style.success} style={{ color: "red" }}>
          Submitted successfully!
        </p>
      )}
      <div className={style.button_container}>
        <Button text="Submit" value="submit" href="" />
        <Button text="User Table" href="/table/albumtable" />
      </div>
    </form>
  );
};

export default AlbumForm;
