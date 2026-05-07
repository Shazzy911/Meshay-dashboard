"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./SongForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SongFormData = z.object({
  artistId: z.string().min(1, "Artist ID is required"),
  albumId: z.string().min(1, "Album ID is required"),
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  genre: z.string().min(1, "Genre is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  img: z
    .custom<FileList>((value) => value instanceof FileList, {
      message: "Expected a FileList",
    })
    .refine((files) => files.length > 0, {
      message: "At least one file is required",
    })
    .refine(
      (files) => {
        const allowedExtensions = [".jpeg", ".jpg", ".png"];

        return Array.from(files).every((file) =>
          allowedExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
          ),
        );
      },
      {
        message: "Only .jpeg, .jpg, and .png files are allowed",
      },
    ),
  songUrl: z
    .custom<FileList>((value) => value instanceof FileList, {
      message: "Expected a FileList for audio",
    })
    .refine((files) => files.length > 0, {
      message: "At least one audio file is required",
    })
    .refine(
      (files) => {
        const allowedExtensions = [".mp3", ".wav", ".ogg", ".aac"];

        return Array.from(files).every((file) =>
          allowedExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
          ),
        );
      },
      {
        message: "Only .mp3, .wav, .ogg, and .aac files are allowed for audio",
      },
    )
    .refine(
      (files) => {
        return Array.from(files).every((file) =>
          file.type.startsWith("audio/"),
        );
      },
      {
        message: "Uploaded file must be an audio type",
      },
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
            <option value="cm6r66osa0007a928gskexf87">Last Dream</option>
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
            <option value="cm6l38o6q0001bs2hf1jsgo2u">Harry Style</option>
            <option value="cm6l35gm00000bs2hv87rqla9">Zayn Malik</option>
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
