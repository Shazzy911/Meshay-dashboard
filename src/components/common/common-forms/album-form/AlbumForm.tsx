"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./AlbumForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Custom validation for FileList (client-side only)
const isFileList = (value: unknown): value is FileList => {
  return typeof window !== "undefined" && value instanceof FileList;
};
const AlbumFormData = z.object({
  title: z.string().min(1, "Title is required"),
  genre: z.string().min(1, "Genre is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  artistId: z.string().min(1, "Artist ID is required"),
  img: z
    .any()
    .refine((value) => isFileList(value), "Expected a FileList")
    .refine((fileList) => fileList.length > 0, "At least one file is required")
    .refine((fileList) => {
      const allowedExtensions = [".jpeg", ".jpg", ".png"];
      return Array.from(fileList).every((file: File) =>
        allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );
    }, "Only .jpeg, .jpg, and .png files are allowed"),
});

// const AlbumFormData = z.object({
//   title: z.string(),
//   genre: z.string(),
//   releaseDate: z.string(),
//   artistId: z.string(),
//   img: z
//     .instanceof(FileList)
//     .refine((fileList) => fileList.length > 0)
//     .refine((fileList) => {
//       const allowedExtensions: string[] = [".jpeg", ".jpg", ".png"];
//       return allowedExtensions.some((extension) =>
//         fileList[0].name.toLowerCase().endsWith(extension)
//       );
//     }),
// });
type AlbumFormType = z.infer<typeof AlbumFormData>;

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
      const response = await fetch("http://localhost:8000/album", {
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
            type="file"
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
            {...register("releaseDate", { required: true })}
          />
          {errors.releaseDate && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Select Artist</label>
          <select {...register("artistId", { required: true })}>
            <option value="">Select Artist</option>
            <option value="cm6l38o6q0001bs2hf1jsgo2u">Harry Style</option>
            <option value="cm6l35gm00000bs2hv87rqla9">Zayn Malik</option>
            <option value="277">User 1</option>
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
        <Button text="User Table" href="/table/albumtable" />
      </div>
    </form>
  );
};

export default AlbumForm;
