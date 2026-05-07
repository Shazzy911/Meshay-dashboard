import { z } from "zod";

export const AlbumFormData = z.object({
  title: z.string().min(1, "Title is required"),
  genre: z.string().min(1, "Genre is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  artistId: z.string().min(1, "Artist ID is required"),
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
});

export type AlbumFormType = z.infer<typeof AlbumFormData>;
