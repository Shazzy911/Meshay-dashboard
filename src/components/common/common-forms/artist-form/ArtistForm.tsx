"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./ArtistForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ArtistFormData = z.object({
  name: z.string(),
  genre: z.string(),
  bio: z.string(),
  img: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0)
    .refine((fileList) => {
      const allowedExtensions: string[] = [".jpeg", ".jpg", ".png"];
      return allowedExtensions.some((extension) =>
        fileList[0].name.toLowerCase().endsWith(extension)
      );
    }),
});

type ArtistFormType = z.infer<typeof ArtistFormData>;

const ArtistForm = () => {
  const [successMessage, setSuccessMessage] = useState(true);

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
      {successMessage && (
        <p className={style.success} style={{ color: "red" }}>
          Submitted successfully!
        </p>
      )}
      <div className={style.button_container}>
        <Button text="Submit" value="submit" href="" />
        <Button text="Table" href="/table/artisttable" />
      </div>
    </form>
  );
};

export default ArtistForm;
