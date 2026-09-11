"use client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { privateApi } from "../../../services/api";

const FlightBookingDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        console.log("👉 Route ID:", id);

        const saved = JSON.parse(
          localStorage.getItem("flightBookingData") || "{}",
        );

        console.log("👉 LocalStorage:", saved);

        const bookingId =
          id ||
          saved?.booking?.data?.Response?.BookingId ||
          saved?.booking?.Response?.BookingId ||
          saved?.booking?.BookingId;

        console.log("👉 Final BookingId:", bookingId);

        if (!bookingId) {
          throw new Error("BookingId missing");
        }

        const res = await privateApi.post("/api/airlines/booking-details/", {
          BookingId: bookingId,
        });

        console.log("🔍 RAW RESPONSE:", res.data);

        let apiData = res?.data;

        if (apiData?.data) {
          apiData = apiData.data;
        }

        if (!apiData?.Response) {
          throw new Error("Invalid API response structure");
        }

        setData(apiData);
      } catch (err) {
        console.error(
          "❌ BOOKING DETAILS ERROR:",
          err?.response?.data || err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse text-lg">Fetching Booking...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Booking not found
      </div>
    );
  }

  /* ---------------- DATA EXTRACTION ---------------- */

  const itinerary = data?.Response?.FlightItinerary;

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid booking structure
      </div>
    );
  }

  const passengers = Array.isArray(itinerary?.Passenger)
    ? itinerary.Passenger
    : itinerary?.Passenger
      ? [itinerary.Passenger]
      : [];

  const segments = Array.isArray(itinerary?.Segments)
    ? itinerary.Segments
    : itinerary?.Segments
      ? [itinerary.Segments]
      : [];

  const fare = itinerary?.Fare || {};

  const stored = JSON.parse(localStorage.getItem("flightBookingData") || "{}");

  const pricingData = stored?.pricing;

  if (!pricingData) {
    console.error("❌ Pricing missing from ReviewBooking");
  }

  const flightFare = Number(pricingData?.flightFare ?? 0);
  const seatPrice = Number(pricingData?.seatPrice ?? 0);
  const mealPrice = Number(pricingData?.mealPrice ?? 0);
  const baggagePrice = Number(pricingData?.baggagePrice ?? 0);
  const convenienceFee = Number(pricingData?.convenienceFee ?? 0);

  const totalFare = Number(pricingData?.totalPrice ?? 0);

  const finalBookingId =
    itinerary?.BookingId ||
    stored?.booking?.data?.Response?.BookingId ||
    stored?.booking?.Response?.BookingId ||
    id;

  const firstSeg = segments?.[0];
  const lastSeg = segments?.[segments.length - 1];

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0B0B0F] to-black text-white px-4 md:px-10 py-16">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-[#15151C]/80 p-6 rounded-3xl border border-gray-800">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400">
                {itinerary?.Origin} → {itinerary?.Destination}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                {firstSeg?.Origin?.Airport?.CityName} →{" "}
                {lastSeg?.Destination?.Airport?.CityName}
              </p>
            </div>

            <div className="mt-4 md:mt-0 text-sm text-gray-400 space-y-1">
              <p>PNR: {itinerary?.PNR || "N/A"}</p>
              <p>Booking ID: {finalBookingId}</p>
              <p>
                Status:{" "}
                <span className="text-green-400 font-medium">
                  {itinerary?.Status === 5 ? "Confirmed" : "Pending"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* SEGMENTS */}
        {segments.length > 0 &&
          segments.map((seg, i) => (
            <div
              key={i}
              className="bg-[#15151C]/80 p-6 rounded-3xl border border-gray-800"
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex-1">
                  <p className="text-yellow-300 font-medium">
                    {seg?.Airline?.AirlineName}
                  </p>
                  <p className="text-sm text-gray-400">
                    {seg?.Airline?.AirlineCode}-{seg?.Airline?.FlightNumber}
                  </p>
                </div>

                <div className="flex-1 text-center my-4 md:my-0">
                  <p className="font-semibold">
                    {new Date(seg?.Origin?.DepTime).toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {seg?.Origin?.Airport?.CityName}
                  </p>

                  <div className="my-2 text-gray-500">──── ✈ ────</div>

                  <p className="font-semibold">
                    {new Date(seg?.Destination?.ArrTime).toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {seg?.Destination?.Airport?.CityName}
                  </p>
                </div>

                <div className="flex-1 text-right text-sm text-gray-400">
                  <p>🧳 {seg?.Baggage || "N/A"}</p>
                  <p>💼 {seg?.CabinBaggage || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}

        {/* PASSENGERS */}
        <div className="bg-[#15151C]/80 p-6 rounded-3xl border border-gray-800">
          <h3 className="text-yellow-300 mb-4 font-semibold text-lg">
            Passengers
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {passengers.map((p, i) => (
              <div
                key={i}
                className="bg-black/40 p-4 rounded-xl border border-gray-800"
              >
                <p className="font-medium">
                  {p?.Title} {p?.FirstName} {p?.LastName}
                </p>

                <p className="text-xs text-gray-400">
                  Ticket: {p?.Ticket?.TicketNumber || "N/A"}
                </p>

                {p?.IsLeadPax && (
                  <span className="text-green-400 text-xs">Lead Passenger</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="bg-linear-to-r from-yellow-400/10 to-yellow-500/5 p-6 rounded-3xl border border-yellow-400/20">
          <h3 className="text-yellow-300 mb-4 font-semibold text-lg">
            Price Summary
          </h3>

          <div className="space-y-2 text-sm">
            <Row label="Flight Fare" value={flightFare} />

            {seatPrice > 0 && <Row label="Seat Charges" value={seatPrice} />}

            {mealPrice > 0 && <Row label="Meal Charges" value={mealPrice} />}

            {baggagePrice > 0 && (
              <Row label="Baggage Charges" value={baggagePrice} />
            )}

            {convenienceFee > 0 && (
              <Row label="Convenience Fee" value={convenienceFee} />
            )}

            <div className="border-t border-gray-700 my-3"></div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total Paid</span>
              <span className="text-yellow-400">₹ {totalFare}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span>₹ {Math.round(value || 0)}</span>
  </div>
);

export default FlightBookingDetails;
