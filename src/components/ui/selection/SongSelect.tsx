"use client";

import React, { useEffect, useState } from "react";
import { fetchArtists } from "@/lib/api/fetchArtists";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AlbumFormType } from "@/types/album";

// type AlbumFormType = z.infer<typeof AlbumFormData>;
type Props = {
  register: UseFormRegister<AlbumFormType>;
  errors?: FieldErrors<AlbumFormType>;
};
type Song = {
  id: string;
  name: string;
};

const SongSelect = ({ register, errors }: Props) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await fetchArtists();
        setSongs(data.response || []);
      } catch (error) {
        console.error("Failed to load artists", error);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  return (
    <div>
      <label>Select Song</label>

      <select {...register("artistId")} disabled={loading}>
        <option value="">{loading ? "Loading songs..." : "Select Song"}</option>

        {songs.map((song) => (
          <option key={song.id} value={song.id}>
            {song.name}
          </option>
        ))}
      </select>

      {errors?.artistId && <span style={{ color: "red" }}>Required</span>}
    </div>
  );
};

export default SongSelect;
