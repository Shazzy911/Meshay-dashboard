"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./ArtistForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Custom validation for FileList (client-side only)
const isFileList = (value: unknown): value is FileList => {
  return typeof window !== "undefined" && value instanceof FileList;
};

const ArtistFormData = z.object({
  name: z.string().min(1, "Name is required"),
  genre: z.string().min(1, "Genre is required"),
  bio: z.string().min(1, "Bio is required"),
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

type ArtistFormType = z.infer<typeof ArtistFormData>;

const ArtistForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArtistFormType>({ resolver: zodResolver(ArtistFormData) });

  const onSubmit: SubmitHandler<ArtistFormType> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("genre", data.genre);
    formData.append("bio", data.bio);
    formData.append("img", data.img[0]);

    try {
      const response = await fetch("http://localhost:8000/artist", {
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
      <h1 className={style.heading}>Artist Form</h1>
      <div className={style.form_container}>
        {/* Name Field */}
        <div>
          <label>Artist Name</label>
          <input
            type="text"
            placeholder="Artist Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className={style.error}>{errors.name.message}</span>
          )}
        </div>

        {/* Genre Field */}
        <div>
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            {...register("genre", { required: true })}
          />
          {errors.genre && (
            <span className={style.error}>{errors.genre.message}</span>
          )}
        </div>

        {/* Bio Field */}
        <div>
          <label>Bio</label>
          <input
            type="text"
            placeholder="Bio"
            {...register("bio", { required: true })}
          />
          {errors.bio && (
            <span className={style.error}>{errors.bio.message}</span>
          )}
        </div>

        {/* Image Field */}
        <div>
          <label>Image</label>
          <input
            type="file"
            {...register("img", { required: true })}
          />
          {errors.img && (
            <span className={style.error}>{errors.img.message}</span>
          )}
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <p className={style.success} style={{ color: "green" }}>
          Submitted successfully!
        </p>
      )}

      {/* Buttons */}
      <div className={style.button_container}>
        <Button text="Submit" value="submit" href="" />
        <Button text="Table" href="/table/artisttable" />
      </div>
    </form>
  );
};

export default ArtistForm;
