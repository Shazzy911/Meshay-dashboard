"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import style from "./SongForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormValues {
  artistId: string;
  albumId: string;
  title: string;
  duration: number;
  img: string;
  genre: string;
  releaseDate: string;
  songUrl: string;
}
// "artistId": "cm29dgzp1001y3uneq03diuj1",
// "albumId": "cm29dhzb0001z3unegtvt8jbv",
// "title": "Dark Paradise",
// "duration": 215,
// "img": "http://example.com",
// "genre": "Country",
// "songUrl": "http://song.com",
// "releaseDate": "2020-03-20T00:00:00.000Z",

// const fetchingArtist = async()=>{

// }

const SongForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:4500/song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      //   console.log(data);
      // Handle successful submission (e.g., display success message)
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
          <label>Song Name</label>
          <input
            type="text"
            placeholder="Song Name"
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
            type="number"
            placeholder="duration"
            {...register("duration", { required: true, valueAsNumber: true })}
          />
          {errors.duration && <span className={style.error}>Required</span>}
        </div>
        {/* //////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////// */}
        <div>
          <label>Image</label>
          <input
            type="text"
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
            type="text"
            placeholder="Song Url"
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
      <div className={style.button_container}>
        <Button text="Submit" value="submit" href="/form" />
        <Button text="Table" href="/table/songtable" />
      </div>
    </form>
  );
};

export default SongForm;
