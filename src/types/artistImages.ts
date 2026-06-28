import { z } from "zod";

export const ArtistImagesFormData = z.object({
  artistId: z.string().min(1, "Artist is required"), // ✅ ADD THIS
  img: z
    .custom<FileList>((value) => value instanceof FileList, {
      message: "Expected a FileList",
    })
    .refine((files) => files.length > 0, {
      message: "At least one file is required",
    })
    .refine((files) => files.length <= 5, {
      message: "You can upload a maximum of 5 images",
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

export type ArtistImagesFormType = z.infer<typeof ArtistImagesFormData>;
