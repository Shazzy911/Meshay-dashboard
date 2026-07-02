export const postUser = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/user", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};
