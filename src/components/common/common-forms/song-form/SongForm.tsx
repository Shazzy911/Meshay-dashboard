"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./SongForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const SongFormData = z.object({
  artistId: z.string(),
  albumId: z.string(),
  title: z.string(),
  duration: z.string(),
  genre: z.string(),
  releaseDate: z.string(),
  img: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0)
    .refine((fileList) => {
      const allowedExtensions: string[] = [".jpeg", ".jpg", ".png"];
      return allowedExtensions.some((extension) =>
        fileList[0].name.toLowerCase().endsWith(extension)
      );
    }),
  songUrl: z
    .instanceof(FileList)
    .refine(
      (fileList) =>
        fileList.length > 0 &&
        fileList[0].type.startsWith("audio/") &&
        [".mp3", ".wav", ".ogg", ".aac"].some((extension) =>
          fileList[0].name.toLowerCase().endsWith(extension)
        )
    ),
});

type SongFormType = z.infer<typeof SongFormData>;

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
      const response = await fetch("http://localhost:8000/song", {
        method: "POST",

        body: formData,
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
      <h1 className={style.heading}>Song Form</h1>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}

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
          <label>Song Duration</label>
          <input
            type="text"
            placeholder="duration"
            {...register("duration", { required: true })}
          />
          {errors.duration && <span className={style.error}>Required</span>}
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
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Song Url</label>
          <input
            type="file"
            placeholder="Song File"
            {...register("songUrl", { required: true })}
          />
          {errors.songUrl && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Release Date</label>
          <input
            type="datetime-local"
            {...register("releaseDate", { required: true })}
          />
          {errors.releaseDate && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Select Album</label>
          <select {...register("albumId", { required: true })}>
            <option>Select User</option>
            <option value="cm29dxoj6000ec0f9asr9lugo">Folk Flore</option>
            <option value="266">User 1</option>
            <option value="277">User 1</option>
          </select>
          {errors.albumId && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Select Artist</label>
          <select {...register("artistId", { required: true })}>
            <option>Album</option>
            <option value="cm29ca9iq0004muahjfe10fbp">Taylor Swift</option>
            <option value="id">User 1</option>
            <option value="id">User 1</option>
          </select>
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
