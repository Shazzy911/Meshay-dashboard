export const fetchArtists = async () => {
  const res = await fetch("http://localhost:8000/artist");

  if (!res.ok) {
    throw new Error("Failed to fetch artists");
  }

  return res.json();
};
