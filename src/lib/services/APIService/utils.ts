const getURLWithQueryParams = (
  url: string,
  params?: Record<string, string | undefined | number>,
) => {
  const queryParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) {
      queryParams.set(key, value.toString());
    }
  });

  return `${url}?${queryParams.toString()}`;
};

const generateBody = (
  params: Record<string, string | undefined | number | boolean>,
) => {
  const body: Record<string, string | undefined | number | boolean> = {};

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      body[key] = value;
    }
  });

  return body;
};

export { generateBody, getURLWithQueryParams };
