export const postArtistImages = async (
  artistId: string,
  formData: FormData,
) => {
  const response = await fetch(
    `http://localhost:8000/artist/${artistId}/images`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create artist images");
  }

  return response.json();
};
