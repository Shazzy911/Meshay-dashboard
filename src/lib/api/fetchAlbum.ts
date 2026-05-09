export const fetchAlbums = async () => {
  const res = await fetch("http://localhost:8000/album");

  if (!res.ok) {
    throw new Error("Failed to fetch albums");
  }

  return res.json();
};
