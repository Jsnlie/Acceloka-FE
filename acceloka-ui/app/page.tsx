"use client";
import Image from "next/image";
import Link from "next/link";
import TicketCard from "@/components/tickets/TicketCard";
import { useEffect, useState } from "react";
import { Ticket } from "@/types/Ticket";

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
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
    }
    fetchTickets();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <Image
          src="/Hero-bg.jpg"
          alt="bg"
          fill
          priority
          quality={80}
          className="object-cover opacity-30"
        />

        <div className="relative z-20 flex flex-col gap-4 px-14 py-12 max-w-[520px]">
          <h1 className="flex flex-col gap-1 m-0">
            <span className="text-5xl font-extrabold text-white leading-tight">
              All Your Tickets.
            </span>
            <span className="text-5xl font-extrabold text-[#948D55] leading-tight">
              One Platform.
            </span>
          </h1>

          <p className="text-sm text-[#9B9A91] font-normal leading-relaxed max-w-[380px] drop-shadow">
            Book movie tickets, train tickets, ferry tickets, plane tickets,
            <br />
            and hotels quickly, easily, and reliably.
          </p>
        </div>
      </section>

      {/* POPULAR TICKETS */}
      <section className="min-h-screen flex items-center bg-white py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-extrabold text-black">
              Popular Tickets
            </h2>

            <Link
              href="/tickets"
              className="text-[#948D55] font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <p>Loading tickets...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {tickets.slice(0, 3).map((ticket) => (
                <TicketCard key={ticket.ticketCode} ticket={ticket} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* ABOUT SECTION */}
      <section>
          <div>
            
          </div>
      </section>
    </div>
  );
}
