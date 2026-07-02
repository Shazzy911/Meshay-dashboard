"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import style from "./ArtistImagesForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ArtistSelect from "@/components/ui/selection/ArtistSelect";
import {
  ArtistImagesFormType,
  ArtistImagesFormData,
} from "@/types/artistImages";
import { postArtistImages } from "@/lib/api/postArtistImages";
const ArtistImagesForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArtistImagesFormType>({
    resolver: zodResolver(ArtistImagesFormData),
  });

  const onSubmit: SubmitHandler<ArtistImagesFormType> = async (data) => {
    if (data.img.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }
    const formData = new FormData();

    formData.append("artistId", data.artistId);

    Array.from(data.img).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const result = await postArtistImages(data.artistId, formData);
      if (result.success) {
        setSuccessMessage(true);
        reset(); // Reset form fields
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      console.error("Error Posting Artist Images:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h1 className={style.heading}>Artist Images</h1>
      <div className={style.form_container}>
        <div>
          <label>Image</label>
          <input
            type="file"
            multiple
            accept=".jpeg, .jpg, .png"
            placeholder="img"
            {...register("img", { required: true })}
          />
          {errors.img && <span className={style.error}>Required</span>}
          <p style={{ fontSize: "12px", color: "#777" }}>
            Maximum 5 images (.jpg, .jpeg, .png)
          </p>
        </div>

        <div>
          <ArtistSelect<ArtistImagesFormType>
            register={register}
            errors={errors}
          />
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
        <Button text="User Table" href="/table/artiststable" />
      </div>
    </form>
  );
};

export default ArtistImagesForm;
