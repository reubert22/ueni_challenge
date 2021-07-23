import fetchEvents from "./fetchEvents";

export const getAllEvents = async () => {
  try {
    const response = await fetchEvents();
    return response.data;
  } catch (e) {
    return [];
  }
};
