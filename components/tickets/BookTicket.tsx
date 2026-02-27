"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Ticket } from "@/types/Ticket";

interface BookTicketProps {
  ticket: Ticket;
  onClose: () => void;
  onSuccess?: () => void; // ← tambah ini
}

export default function BookTicket({ ticket, onClose, onSuccess }: BookTicketProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBook = async () => {
    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5197/api/v1/book-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tickets: [
            {
              ticketCode: ticket.ticketCode,
              quantity: quantity,
            },
          ],
        }),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      onSuccess?.(); // ← panggil setelah berhasil
    } catch {
      setError("Failed to book ticket.");
    } finally {
      setLoading(false);
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          w-screen h-screen
          md:w-full md:max-w-md md:h-auto
          md:rounded-2xl
          shadow-2xl
          p-8
          overflow-y-auto
          relative
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-black"
        >
          &times;
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-green-500 text-6xl">✓</div>

            <h2 className="text-2xl font-bold text-black">
              Booking Confirmed!
            </h2>

            <p className="text-center text-gray-500">
              Successfully booked{" "}
              <b>
                {quantity}x {ticket.ticketName}
              </b>
            </p>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-[#948D55] text-white py-3 rounded-xl"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-black">Book Ticket</h2>

            {/* INFO */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-6">
              <p className="text-gray-800 font-bold text-base">
                {ticket.ticketName}
              </p>
              <p className="text-gray-600 text-sm">
                Code:{" "}
                <span className="font-mono text-[#948D55]">
                  {ticket.ticketCode}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Category:{" "}
                <span className="text-gray-800 font-semibold">
                  {ticket.categoryName}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Price:{" "}
                <span className="text-gray-800 font-semibold">
                  Rp {ticket.price.toLocaleString("id-ID")}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Quota:{" "}
                <span className="text-gray-800 font-semibold">
                  {ticket.quota}
                </span>
              </p>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-3 mb-6 text-black">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="border px-4 py-2 rounded-lg"
              >
                -
              </button>

              <input
                type="number"
                value={quantity}
                min={1}
                max={ticket.quota}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border w-20 text-center py-2 rounded-lg"
              />

              <button
                onClick={() =>
                  setQuantity((q) => Math.min(ticket.quota, q + 1))
                }
                className="border px-4 py-2 rounded-lg"
              >
                +
              </button>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between mb-6 font-bold text-black">
              <span>Total</span>
              <span>
                Rp {(ticket.price * quantity).toLocaleString("id-ID")}
              </span>
            </div>

            {/* ERROR */}
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            {/* BUTTON */}
            <button
              onClick={handleBook}
              disabled={loading}
              className="
                w-full
                bg-[#948D55]
                text-white
                py-3
                rounded-xl
                disabled:opacity-50
              "
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
