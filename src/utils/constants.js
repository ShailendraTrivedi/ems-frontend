export const EventAction = {
  DISPLAY: "display",
  CREATE: "create",
  UPDATE: "update",
};

export const dateFormat = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
};
