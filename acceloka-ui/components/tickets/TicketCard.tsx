import { Ticket } from "@/types/Ticket";

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition duration-300">
      <p className="text-sm text-gray-500">{ticket.categoryName}</p>

      <h3 className="text-xl font-bold mt-2">
        {ticket.ticketName}
      </h3>

      <p className="text-gray-600 mt-2">
        {new Date(ticket.eventDate).toLocaleDateString()}
      </p>

      <p className="text-red-600 font-bold mt-4">
        Rp {ticket.price.toLocaleString("id-ID")}
      </p>

      <p className="text-sm text-gray-400 mt-1">
        Sisa Kuota: {ticket.remainingQuota}
      </p>
    </div>
  );
}