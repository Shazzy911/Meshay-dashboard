"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./PlaylistForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PlaylistFormData = z.object({
  name: z.string(),
  description: z.string(),
  selectedOption: z.string(),
});
type PlaylistFormType = z.infer<typeof PlaylistFormData>;

const PlaylistForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlaylistFormType>({ resolver: zodResolver(PlaylistFormData) });

  const onSubmit: SubmitHandler<PlaylistFormType> = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
      <h1 className={style.heading}>Playlist Form</h1>
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
          <label>Playlist Description</label>
          <input
            type="text"
            placeholder="description"
            {...register("description", { required: true })}
          />
          {errors.description && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Select User</label>
          <select {...register("selectedOption", { required: true })}>
            <option value="">Select User</option>
            <option value="id">User 1</option>
            <option value="id">User 1</option>
            <option value="id">User 1</option>
          </select>
          {errors.selectedOption && (
            <span className={style.error}>Required</span>
          )}
        </div>
      </div>
      {successMessage && (
        <p className={style.success} style={{ color: "red" }}>
          Submitted successfully!
        </p>
      )}
      <div className={style.button_container}>
        <Button text="Submit" value="submit" href="/form" />
        <Button text="User Table" href="/table/playlisttable" />
      </div>
    </form>
  );
};

export default PlaylistForm;
