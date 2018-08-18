export const toImageJson = data => {
  if (data) {
    return {
      image: data.image,
      extension: data.extension
    };
  }
  return null;
};

export const toImage = data => {
  if (data) {
    return {
      fileUrl: data.fileUrl,
      fileName: data.fileName
    };
  }
  return null;
};
