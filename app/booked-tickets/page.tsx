"use client";

import { useState } from "react";
import { Ticket } from "@/types/Ticket";
import { getBookedTicket, revokeTicket } from "@/service/bookedTicketService";
import EditTicketModal from "@/components/EditTicketModal";
import DeleteTicketModal from "@/components/DeleteTicketModal";

type BookedTicketResponse = {
  qtyPerCategory: number;
  categoryName: string;
  tickets: Ticket[];
};

type EditTarget = {
  ticketCode: string;
  ticketName: string;
  currentQty: number;
  bookedTicketId: string;
};

export default function BookedTicketPage() {
  const [bookedTicketId, setBookedTicketId] = useState("");
  const [data, setData] = useState<BookedTicketResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EditTarget | null>(null);

  const fetchBookedTicket = async () => {
    if (!bookedTicketId) return;
    setLoading(true);
    try {
      const res = await getBookedTicket(bookedTicketId);
      setData(res);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-100">
      {/* HERO SEARCH SECTION */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center px-4"
        style={{
          backgroundImage: "url('/airplane.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Search Card */}
        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
          {/* Icon */}
          <div className="bg-[#f5f0dc] rounded-full p-4 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#948D55]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Search Booked Ticket
          </h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            Retrieve your travel details by entering your unique Booking ID.
          </p>

          {/* Input */}
          <div className="w-full mb-4">
            <label className="text-gray-700 text-xs font-semibold mb-1 block">
              Booked Ticket ID
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="e.g. TKT-8829-XJ"
                value={bookedTicketId}
                onChange={(e) => setBookedTicketId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchBookedTicket()}
                className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#948D55] placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={fetchBookedTicket}
            disabled={loading}
            className="w-full bg-[#948D55] hover:bg-[#7a7347] transition text-white py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              "Searching..."
            ) : (
              <>
                Find Ticket
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RESULTS SECTION */}
      {data.length > 0 && (
        <div className="w-full max-w-6xl mx-auto px-10 py-12">
          {/* CARD TABLE */}
          {data.map((category, index) => (
            <div key={index} className="mb-10">
              {/* Header Row */}
              <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-4 px-6 pb-3 border-b border-gray-700">
                <span className="text-black text-sm font-semibold">
                  Ticket Code
                </span>
                <span className="text-black text-sm font-semibold">
                  Booking Details
                </span>
                <span className="text-black text-sm font-semibold">
                  Category
                </span>
                <span className="text-black text-sm font-semibold">
                  Event Date
                </span>
                <span className="text-black text-sm font-semibold">
                  Quantity
                </span>
                <span className="text-black text-sm font-semibold text-right">
                  Actions
                </span>
              </div>

              {/* Ticket Rows */}
              <div className="bg-gray-900 rounded-xl mt-2 divide-y divide-gray-800 border border-gray-800">
                {category.tickets.map((ticket) => (
                  <div
                    key={ticket.ticketCode}
                    className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 hover:bg-gray-800 transition"
                  >
                    {/* Ticket Code */}
                    <div>
                      <p className="text-[#948D55] font-mono text-sm font-semibold">
                        {ticket.ticketCode}
                      </p>
                    </div>

                    {/* Booking Details */}
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-700 rounded-lg p-3 shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-[#948D55]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                          />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm">
                        {ticket.ticketName}
                      </p>
                    </div>

                    {/* Category */}
                    <div>
                      <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                        {category.categoryName}
                      </span>
                    </div>

                    {/* Event Date */}
                    <div>
                      <p className="text-white text-sm">
                        {new Date(ticket.eventDate).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    {/* Qty */}
                    <div>
                      <p className="text-white text-sm">
                        {(ticket as any).quantity ??
                          ticket.remainingQuota ??
                          "-"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() =>
                          setEditTarget({
                            ticketCode: ticket.ticketCode,
                            ticketName: ticket.ticketName,
                            currentQty:
                              (ticket as any).quantity ??
                              ticket.remainingQuota ??
                              0,
                            bookedTicketId: bookedTicketId,
                          })
                        }
                        className="p-2 rounded-lg bg-gray-700 hover:bg-yellow-500 hover:text-black text-gray-300 transition"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setDeleteTarget({
                            ticketCode: ticket.ticketCode,
                            ticketName: ticket.ticketName,
                            currentQty:
                              (ticket as any).quantity ??
                              ticket.remainingQuota ??
                              0,
                            bookedTicketId: bookedTicketId,
                          })
                        }
                        className="p-2 rounded-lg bg-gray-700 hover:bg-red-600 hover:text-white text-gray-300 transition"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editTarget && (
        <EditTicketModal
          bookedTicketId={editTarget.bookedTicketId}
          ticketCode={editTarget.ticketCode}
          ticketName={editTarget.ticketName}
          currentQty={editTarget.currentQty}
          onClose={() => setEditTarget(null)}
          onSuccess={fetchBookedTicket}
        />
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <DeleteTicketModal
          bookedTicketId={deleteTarget.bookedTicketId}
          ticketCode={deleteTarget.ticketCode}
          ticketName={deleteTarget.ticketName}
          currentQty={deleteTarget.currentQty}
          onClose={() => setDeleteTarget(null)}
          onSuccess={fetchBookedTicket}
        />
      )}
    </section>
  );
}