import api from "./api";

export const notif = async (bookId, message) => {
  try {
    await api.post("/notifications", { book_id: bookId, message });
  } catch (error) {
    console.error(error);
  }
};
