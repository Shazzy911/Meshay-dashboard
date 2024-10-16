"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import style from "./ArtistForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  genre: string;
  description: string;
  selectedOption: string;
}

const ArtistForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:4500/artist", {
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
      <h1 className={style.heading}>Artist Form</h1>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.inputContainer}>
        <label className={style.label}>Artist Name</label>
        <input
          type="text"
          placeholder="Artist Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span className={style.error}>Required</span>}
      </div>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.inputContainer}>
        <label className={style.label}>Playlist Description</label>
        <input
          type="text"
          placeholder="description"
          {...register("description", { required: true })}
        />
        {errors.description && <span className={style.error}>Required</span>}
      </div>
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      <div className={style.select}>
        <label className={style.label}>Select User</label>
        <select {...register("selectedOption", { required: true })}>
          <option value="">Select User</option>
          <option value="id">User 1</option>
          <option value="id">User 1</option>
          <option value="id">User 1</option>
        </select>
        {errors.selectedOption && <span className={style.error}>Required</span>}
      </div>

      <Button text="Send Now" value="submit" href="/form/artistform" />
    </form>
  );
};

export default ArtistForm;
