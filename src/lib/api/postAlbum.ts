export const postAlbum = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/album", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create album");
  }

  return response.json();
};
