const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
};

export const convertDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

export const truncateHostnames = (hostnames, maxLength) => {
  const combined = hostnames.join(", ");
  return combined.slice(0, maxLength - 3) + "...";
};