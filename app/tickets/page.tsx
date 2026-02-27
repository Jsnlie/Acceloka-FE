"use client";
import TicketCard from "@/components/tickets/TicketCard";
import { useEffect, useState } from "react";
import { Ticket } from "@/types/Ticket";

export default function AvailableTicketPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        "http://localhost:5197/api/v1/get-available-ticket?page=1&pageSize=10",
      );
      const data = await res.json();
      setTickets(data.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-white py-16">
      <div className="w-full max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold text-black">
            Popular Tickets
          </h2>
        </div>

        {loading ? (
          <p>Loading tickets...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {tickets.map((ticket, index) => (
              <TicketCard
                key={ticket.ticketCode}
                ticket={ticket}
                 image={[
                    "/AVENGERS doomsday.jpeg",
                    "/Disney-Cruise.jpeg",
                    "/Ritz-Carlton Jakarta.avif",
                    "/H2H Fanmeeting.png",
                    "/whoosh.jpeg",
                    "/bali.jpeg",
                  ][index]}
                onBookSuccess={fetchTickets}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}