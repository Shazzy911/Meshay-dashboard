"use client";

import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { fetchArtists } from "@/lib/api/fetchArtists";
import { AlbumFormType } from "@/types/album";

type Props = {
  register: UseFormRegister<AlbumFormType>;
  errors?: FieldErrors<AlbumFormType>;
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

const ArtistSelect = ({ register, errors }: Props) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const res: ApiResponse = await fetchArtists();

        console.log("Artists API Response:", res);

        // ✅ FIXED: backend now uses `data`
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

      <select {...register("artistId")} disabled={loading}>
        {artists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>

      {errors?.artistId && <span style={{ color: "red" }}>Required</span>}
    </div>
  );
};

export default ArtistSelect;
