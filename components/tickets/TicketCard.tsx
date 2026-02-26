import Image from "next/image";
import { useState } from "react";
import { Ticket } from "@/types/Ticket";
import BookTicket from "./BookTicket";

interface TicketCardProps {
  ticket: Ticket;
  image?: string;
}

export default function TicketCard({ ticket, image }: TicketCardProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      <div className="relative w-full h-48">
        <Image
          src={image ?? "/placeholder"}
          alt={ticket.ticketName}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500">{ticket.categoryName}</p>

        <h3 className="text-xl font-bold mt-2 text-black">
          {ticket.ticketName}
        </h3>

        <p className="text-gray-600 mt-2">
          {new Date(ticket.eventDate).toLocaleDateString()}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-red-600 font-bold mt-4">
              Rp {ticket.price.toLocaleString("id-ID")}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Sisa Kuota: {ticket.remainingQuota}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#948D55] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#7a7347] transition"
          >
            Book
          </button>
        </div>
      </div>

      {showModal && (
        <BookTicket ticket={ticket} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
