export const postSong = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/song", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create song");
  }

  return response.json();
};
