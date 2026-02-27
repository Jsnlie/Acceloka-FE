"use client";

import { useState } from "react";
import { revokeTicket } from "@/service/bookedTicketService";

type Props = {
  bookedTicketId: string;
  ticketCode: string;
  ticketName: string;
  currentQty: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function DeleteTicketModal({
  bookedTicketId,
  ticketCode,
  ticketName,
  currentQty,
  onClose,
  onSuccess,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (quantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }
    if (quantity > currentQty) {
      setError(`Quantity cannot exceed current quantity (${currentQty}).`);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await revokeTicket(bookedTicketId, ticketCode, quantity);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to delete ticket. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-900/50 rounded-lg p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold">Remove Ticket</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6" />

        {/* Ticket Info */}
        <div className="bg-gray-800 rounded-lg px-4 py-3 mb-6">
          <p className="text-white font-semibold text-sm">{ticketName}</p>
          <p className="text-[#948D55] font-mono text-xs mt-1">{ticketCode}</p>
          <p className="text-gray-400 text-xs mt-1">Current Qty: <span className="text-white font-semibold">{currentQty}</span></p>
        </div>

        {/* Warning */}
        <div className="bg-red-900/20 border border-red-800 rounded-lg px-4 py-3 mb-6">
          <p className="text-red-400 text-xs">
            {`If quantity equals current qty (${currentQty}), ticket will be fully removed. If less, only selected quantity will be deducted.`}
          </p>
        </div>

        {/* Quantity Input */}
        <div className="mb-6">
          <label className="text-gray-400 text-xs mb-2 block">
            Quantity to Remove <span className="text-gray-500">(max: {currentQty})</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="bg-gray-700 hover:bg-gray-600 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg transition"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={currentQty}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-white text-center rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button
              onClick={() => setQuantity((q) => Math.min(currentQty, q + 1))}
              className="bg-gray-700 hover:bg-gray-600 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg transition"
            >
              +
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-4">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-gray-300 bg-gray-700 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-50 font-semibold"
          >
            {loading ? "Removing..." : "Remove Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}