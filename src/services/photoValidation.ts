export const validatePhoto = async (blob: Blob) => {
  const response = await fetch(
    "https://99c5jwwg1d.execute-api.eu-west-1.amazonaws.com/validate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: blob,
    }
  );

  return response.json();
};
