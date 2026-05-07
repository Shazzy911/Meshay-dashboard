import { z } from "zod";

export const SongFormData = z.object({
  artistId: z.string().min(1, "Artist ID is required"),
  albumId: z.string().min(1, "Album ID is required"),
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  genre: z.string().min(1, "Genre is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  img: z
    .custom<FileList>((value) => value instanceof FileList, {
      message: "Expected a FileList",
    })
    .refine((files) => files.length > 0, {
      message: "At least one file is required",
    })
    .refine(
      (files) => {
        const allowedExtensions = [".jpeg", ".jpg", ".png"];

        return Array.from(files).every((file) =>
          allowedExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
          ),
        );
      },
      {
        message: "Only .jpeg, .jpg, and .png files are allowed",
      },
    ),
  songUrl: z
    .custom<FileList>((value) => value instanceof FileList, {
      message: "Expected a FileList for audio",
    })
    .refine((files) => files.length > 0, {
      message: "At least one audio file is required",
    })
    .refine(
      (files) => {
        const allowedExtensions = [".mp3", ".wav", ".ogg", ".aac"];

        return Array.from(files).every((file) =>
          allowedExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
          ),
        );
      },
      {
        message: "Only .mp3, .wav, .ogg, and .aac files are allowed for audio",
      },
    )
    .refine(
      (files) => {
        return Array.from(files).every((file) =>
          file.type.startsWith("audio/"),
        );
      },
      {
        message: "Uploaded file must be an audio type",
      },
    ),
});

export type SongFormType = z.infer<typeof SongFormData>;
