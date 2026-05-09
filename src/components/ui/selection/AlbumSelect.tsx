"use client";

import { useEffect, useState } from "react";
import { fetchAlbums } from "@/lib/api/fetchAlbum";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AlbumFormType } from "@/types/album";

type Props = {
  register: UseFormRegister<AlbumFormType>;
  errors?: FieldErrors<AlbumFormType>;
};

type Album = {
  id: string;
  title: string;
};

const AlbumSelect = ({ register, errors }: Props) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const res = await fetchAlbums();

        console.log("API RESPONSE:", res);

        // IMPORTANT FIX HERE 👇
        setAlbums(res.data || []);
      } catch (error) {
        console.error("Failed to load albums", error);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  return (
    <div>
      <label>Select Album</label>

      <select {...register("albumId")} disabled={loading}>
        <option value="">
          {loading ? "Loading albums..." : "Select Album"}
        </option>

        {albums.map((album) => (
          <option key={album.id} value={album.id}>
            {album.title}
          </option>
        ))}
      </select>

      {errors?.albumId && <span style={{ color: "red" }}>Required</span>}
    </div>
  );
};

export default AlbumSelect;
