"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./SongForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ArtistSelect from "@/components/ui/selection/ArtistSelect";
import { postSong } from "@/lib/api/postSong";

import { SongFormData, SongFormType } from "@/types/song";
import AlbumSelect from "@/components/ui/selection/AlbumSelect";

const SongForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SongFormType>({ resolver: zodResolver(SongFormData) });

  const onSubmit: SubmitHandler<SongFormType> = async (data) => {
    const formData = new FormData();
    formData.append("artistId", data.artistId);
    formData.append("albumId", data.albumId);
    formData.append("title", data.title);
    formData.append("duration", data.duration);
    formData.append("genre", data.genre);
    formData.append("releaseDate", data.releaseDate);
    formData.append("songUrl", data.songUrl[0]);
    formData.append("img", data.img[0]);
    try {
      const result = await postSong(formData);

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
      <h1 className={style.heading}>Song Form</h1>

      <div className={style.form_container}>
        <div>
          <label>Song</label>
          <input
            type="text"
            placeholder="Song"
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
          <label>Song Duration</label>
          <input
            type="text"
            placeholder="duration"
            {...register("duration", { required: true })}
          />
          {errors.duration && <span className={style.error}>Required</span>}
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
          <label>Song Url</label>
          <input
            type="file"
            placeholder="Song File"
            {...register("songUrl", { required: true })}
          />
          {errors.songUrl && <span className={style.error}>Required</span>}
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
          <AlbumSelect register={register} errors={errors} />
          {errors.albumId && <span className={style.error}>Required</span>}
        </div>

        <div>
          <ArtistSelect<SongFormType> register={register} errors={errors} />

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
        <Button text="Table" href="/table/songtable" />
      </div>
    </form>
  );
};

export default SongForm;
