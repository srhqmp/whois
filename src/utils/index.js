const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
};

export const convertDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

export const truncateHostnames = (hostnames, maxLength) => {
  const combined = hostnames.join(", ");

  if (combined.length > maxLength) {
    return combined.slice(0, maxLength - 3) + "...";
  }

  return combined;
};
