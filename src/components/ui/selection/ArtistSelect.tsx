"use client";

import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { fetchArtists } from "@/lib/api/fetchArtists";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

type Artist = {
  id: string;
  name: string;
};

type ApiResponse = {
  success: boolean;
  data: Artist[];
  message: string;
};

const ArtistSelect = <T extends FieldValues>({
  register,
  errors,
}: Props<T>) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const res: ApiResponse = await fetchArtists();
        setArtists(res.data || []);
      } catch (error) {
        console.error("Failed to load artists", error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  return (
    <div>
      <label>Select Artist</label>

      <select
        defaultValue=""
        {...register("artistId" as Path<T>)}
        disabled={loading}
      >
        <option value="" disabled>
          Select an artist
        </option>

        {artists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>

      {errors?.["artistId"] && <span style={{ color: "red" }}>Required</span>}
    </div>
  );
};

export default ArtistSelect;
