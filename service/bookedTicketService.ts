const BASE_URL = "http://localhost:5197/api/v1";

export const getBookedTicket = async (bookedTicketId: string) => {
  const res = await fetch(`${BASE_URL}/get-booked-ticket/${bookedTicketId}`);

  if (!res.ok) throw new Error("Fetch failed");

  return res.json();
};

export const editBookedTicket = async (
  bookedTicketId: string,
  ticketCode: string,
  quantity: number,
) => {
  const res = await fetch(`${BASE_URL}/edit-booked-ticket/${bookedTicketId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([{ ticketCode, quantity }]),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const revokeTicket = async (
  bookedTicketId: string,
  ticketCode: string,
  quantity: number,
) => {
  const res = await fetch(
    `${BASE_URL}/revoke-ticket/${bookedTicketId}/${ticketCode}/${quantity}.`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) throw new Error("Delete failed");
  return res.status;
};
