export interface Ticket {
  categoryName: string;
  ticketCode: string;
  ticketName: string;
  eventDate: string;
  price: number;
  quota: number;
  remainingQuota: number;
  bookedTicketId : string;
}