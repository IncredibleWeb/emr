export const toHome = data => {
  if (data) {
    return {
      id: data.id,
      name: data.name,
      title: data.title,
      html: data.html,
      url: data.url,
      meta: toMeta(data.meta)
    };
  }
};

export const toMeta = data => {
  if (data) {
    return {
      title: data.title
    };
  }
};
