export const postArtist = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/artist", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create artist");
  }

  return response.json();
};
