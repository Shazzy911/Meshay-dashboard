"use client";

import { useEffect, useState } from "react";
import { fetchAlbums } from "@/lib/api/fetchAlbum";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

type HasAlbumId = {
  albumId: string;
};

type Props<T extends HasAlbumId> = {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

type Album = {
  id: string;
  title: string;
};

const AlbumSelect = <T extends HasAlbumId>({ register, errors }: Props<T>) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const res = await fetchAlbums();
        setAlbums(res.data || []);
      } catch (error) {
        console.error("Failed to load albums", error);
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  return (
    <div>
      <label>Select Album</label>

      <select
        defaultValue=""
        {...register("albumId" as Path<T>)}
        disabled={loading}
      >
        <option value="" disabled>
          Select Album
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
