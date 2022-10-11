interface ValidatePhotoResult {
  response: Response;
  body: {
    message: string;
    errorCodes?: string[];
  };
}

const BASE_URL = import.meta.env.VITE_PHOTO_VALIDATION_BASE_URL;

export const validatePhoto = async (
  blob: Blob
): Promise<ValidatePhotoResult> => {
  const response = await fetch(`${BASE_URL}/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: blob,
  });

  return {
    response,
    body: await response.json(),
  };
};
