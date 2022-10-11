interface ValidatePhotoResult {
  response: Response;
  body: {
    message: string;
    errorCodes?: string[];
  };
}

export const validatePhoto = async (
  blob: Blob
): Promise<ValidatePhotoResult> => {
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

  return {
    response,
    body: await response.json(),
  };
};
