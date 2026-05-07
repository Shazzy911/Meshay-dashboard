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
type Artist = {
  id: string;
  name: string;
};

const ArtistSelect = ({ register, errors }: Props) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data.response || []);
      } catch (error) {
        console.error("Failed to load artists", error);
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
        <option value="">
          {loading ? "Loading artists..." : "Select Artist"}
        </option>

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
