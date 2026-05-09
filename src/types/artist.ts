import { z } from "zod";

export const ArtistFormData = z.object({
  name: z.string().min(1, "Name is required"),
  genre: z.string().min(1, "Genre is required"),
  bio: z.string().min(1, "Bio is required"),
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

export type ArtistFormType = z.infer<typeof ArtistFormData>;
