"use client";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { sendHotelChangeRequest } from "../../../services/sendHotelChangeRequest";

const HotelBookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [changeLoading, setChangeLoading] = useState(false);
  const [changeMsg, setChangeMsg] = useState(null);
  const [changeError, setChangeError] = useState(null);

  const [booking, setBooking] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [guestDetails, setGuestDetails] = useState([]);
  const [paymentData, setPaymentData] = useState({
    net: 0,
    total: 0,
    convenienceFee: 0,
  });

  const [loading, setLoading] = useState(true);
  const [cancelData] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const extractBookingData = (bookingData) => {
    return (
      bookingData?.data?.data ||
      bookingData?.data?.Response ||
      bookingData?.data ||
      bookingData?.Response ||
      bookingData
    );
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("hotelBookingData") || "{}",
      );

      let bookingData = location.state?.booking;

      if (!bookingData) {
        bookingData = saved.bookingResponse;
      }

      if (!bookingData) throw new Error("No booking data");

      const finalBooking = extractBookingData(bookingData);

      setBooking(finalBooking);
      setHotel(saved.hotel || null);
      setGuestDetails(saved.guestList || []);

      setPaymentData({
        net: Number(saved.net || finalBooking?.NetAmount || 0),
        total: Number(
          saved.total ||
            finalBooking?.InvoiceAmount ||
            finalBooking?.NetAmount ||
            saved.net ||
            0,
        ),
        convenienceFee: Number(saved.convenienceFee || 0),
      });
    } catch (err) {
      console.error("BOOKING LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  }, [location.state]);

  const handleInvoiceClick = () => {
    alert(`Invoice No: ${booking?.InvoiceNumber || "Not available"}`);
  };

  const handleChangeRequest = async () => {
    if (!booking?.BookingId) {
      setChangeError("Booking ID not found");
      return;
    }

    const remarks = window.prompt("Enter change request reason");
    if (!remarks) return;

    try {
      setChangeLoading(true);
      setChangeMsg(null);
      setChangeError(null);

      const res = await sendHotelChangeRequest(booking.BookingId, remarks);

      if (res?.success) {
        setChangeMsg(
          `${res.message || "Change request sent successfully"}${
            res.data?.ChangeRequestId
              ? ` (Request ID: ${res.data.ChangeRequestId})`
              : ""
          }`,
        );
      } else {
        setChangeError(
          res?.message || res?.Error?.ErrorMessage || "Change request failed",
        );
      }
    } catch (err) {
      setChangeError(
        err?.response?.data?.message ||
          err?.response?.data?.Error?.ErrorMessage ||
          "Something went wrong",
      );
    } finally {
      setChangeLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white text-center py-24">
        Loading booking...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-10 text-center text-white bg-[#0B0B0F] min-h-screen">
        <h2 className="text-red-400 mb-4">⚠️ Booking not found</h2>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-yellow-400 text-black rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  const bookingId =
    booking?.BookingId || booking?.BookingID || booking?.bookingId;
  const invoiceNumber = booking?.InvoiceNumber || booking?.InvoiceNo;
  const bookingStatus =
    booking?.HotelBookingStatus || booking?.BookingStatus || "Confirmed";

  const amount =
    paymentData.total ||
    paymentData.net ||
    booking?.InvoiceAmount ||
    booking?.NetAmount ||
    0;

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white px-4 md:px-10 py-24">
      {/* HEADER */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-5">
          <span className="text-5xl">✅</span>
        </div>

        <h1 className="text-3xl font-bold text-green-400">
          Booking Confirmed!
        </h1>

        <p className="text-gray-400 mt-2">
          Your hotel booking has been completed successfully.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* HOTEL */}
          <div className="bg-[#15151C] p-6 rounded-3xl border border-gray-800">
            <h2 className="text-xl text-yellow-400">
              {hotel?.hotel_name || hotel?.HotelName || "Hotel Booking"}
            </h2>

            <div className="text-sm text-gray-400 mt-3 space-y-1">
              <p>🏨 Booking ID: {bookingId || "N/A"}</p>

              <p>
                📄 Invoice:{" "}
                {invoiceNumber ? (
                  <>
                    {invoiceNumber?.slice(0, 2)}
                    <span
                      onClick={handleInvoiceClick}
                      className="text-blue-400 underline cursor-pointer"
                    >
                      {invoiceNumber?.slice(2)}
                    </span>
                  </>
                ) : (
                  "N/A"
                )}
              </p>

              <p>🔖 Ref: {booking?.BookingRefNo || "N/A"}</p>
              <p>🔐 Confirmation: {booking?.ConfirmationNo || "N/A"}</p>

              <p className="text-green-400">Status: {bookingStatus}</p>
            </div>
          </div>

          {/* GUESTS */}
          {guestDetails.length > 0 && (
            <div className="bg-[#15151C] p-6 rounded-3xl border border-gray-800">
              <h3 className="text-yellow-300 mb-3">Guests</h3>

              <div className="space-y-2">
                {guestDetails.map((g, i) => (
                  <div
                    key={i}
                    className="text-sm py-2 border-b border-gray-800 last:border-b-0"
                  >
                    <p>
                      {g.Title} {g.FirstName} {g.LastName}
                    </p>

                    <p className="text-xs text-gray-500">
                      {g.PaxType === 1 ? "Adult" : "Child"}{" "}
                      {g.Age ? `• Age ${g.Age}` : ""}
                      {g.LeadPassenger ? " • Lead Passenger" : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => {
                if (!bookingId) {
                  setChangeError("Booking ID not found");
                  return;
                }

                setViewLoading(true);
                navigate(`/booking-details/${bookingId}`);
              }}
              className="px-5 py-2 bg-blue-500 rounded-lg"
            >
              {viewLoading ? "Loading..." : "View Details"}
            </button>

            <button
              onClick={handleChangeRequest}
              disabled={changeLoading}
              className="px-5 py-2 bg-yellow-400 text-black rounded-lg disabled:opacity-60"
            >
              {changeLoading ? "Sending..." : "Send Change Request"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#15151C] p-6 rounded-3xl border border-gray-800 h-fit">
          <h3 className="text-yellow-300 mb-4">Payment</h3>

          <div className="space-y-2 text-sm">
            {paymentData.net > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Net Amount</span>
                <span>₹ {Math.round(paymentData.net)}</span>
              </div>
            )}

            {paymentData.convenienceFee > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Convenience Fee</span>
                <span>₹ {Math.round(paymentData.convenienceFee)}</span>
              </div>
            )}

            <hr className="border-gray-700" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total Paid</span>
              <span className="text-yellow-400">₹ {Math.round(amount)}</span>
            </div>
          </div>

          <p className="text-green-400 mt-4">Success</p>
        </div>
      </div>

      {cancelData && (
        <div className="mt-6 text-green-400">
          Refunded ₹ {cancelData.RefundedAmount}
        </div>
      )}

      {changeMsg && (
        <div className="mt-6 bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-green-400">
          {changeMsg}
        </div>
      )}

      {changeError && (
        <div className="mt-6 bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400">
          {changeError}
        </div>
      )}
    </div>
  );
};

export default HotelBookingSuccess;
