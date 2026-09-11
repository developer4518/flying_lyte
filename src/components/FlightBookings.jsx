import { useQuery } from "@tanstack/react-query";
import { Plane, CalendarDays, IndianRupee, Ticket } from "lucide-react";
import { getFlightBookings } from "../services/bookingApi";

const getItinerary = (booking) => {
  return (
    booking?.tbo_response?.Response?.Response?.FlightItinerary ||
    booking?.tbo_response?.Response?.FlightItinerary ||
    booking?.FlightItinerary ||
    null
  );
};

const getTboResponse = (booking) => {
  return (
    booking?.tbo_response?.Response?.Response ||
    booking?.tbo_response?.Response ||
    null
  );
};

const formatDateTime = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const FlightBookings = () => {
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["flightBookings"],
    queryFn: getFlightBookings,
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
        Loading flights...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">
        {error?.response?.data?.message || "Failed to load flight bookings."}
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
        No flight bookings found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {bookings.map((booking) => {
        const itinerary = getItinerary(booking);
        const tbo = getTboResponse(booking);

        const segment = itinerary?.Segments?.[0];

        const pnr =
          booking?.pnr ||
          tbo?.PNR ||
          itinerary?.PNR ||
          segment?.AirlinePNR ||
          "N/A";

        const bookingId =
          booking?.booking_id ||
          tbo?.BookingId ||
          itinerary?.BookingId ||
          "N/A";

        const from =
          segment?.Origin?.Airport?.CityName || itinerary?.Origin || "N/A";

        const to =
          segment?.Destination?.Airport?.CityName ||
          itinerary?.Destination ||
          "N/A";

        const originCode =
          segment?.Origin?.Airport?.AirportCode || itinerary?.Origin || "";

        const destinationCode =
          segment?.Destination?.Airport?.AirportCode ||
          itinerary?.Destination ||
          "";

        const depTime = segment?.Origin?.DepTime;
        const arrTime = segment?.Destination?.ArrTime;

        const airlineName = segment?.Airline?.AirlineName || "Flight";
        const flightNo = segment?.Airline?.FlightNumber || "";

        const fare =
          booking?.total_amount ||
          itinerary?.Fare?.PublishedFare ||
          itinerary?.Fare?.OfferedFare ||
          0;

        const status =
          segment?.FlightStatus ||
          booking?.status ||
          (itinerary?.Status === 1 ? "Confirmed" : "Pending");

        return (
          <div
            key={booking.id || bookingId}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md transition hover:border-yellow-400/40 hover:bg-white/10"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-white/50">Booking ID</p>
                <h3 className="text-lg font-semibold text-white">
                  {bookingId}
                </h3>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  String(status).toLowerCase() === "confirmed"
                    ? "bg-green-500/15 text-green-300"
                    : "bg-yellow-500/15 text-yellow-300"
                }`}
              >
                {status}
              </span>
            </div>

            <div className="mb-5 rounded-2xl bg-black/20 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">{originCode}</p>
                  <p className="text-sm text-white/50">{from}</p>
                </div>

                <Plane className="h-5 w-5 shrink-0 text-yellow-300" />

                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {destinationCode}
                  </p>
                  <p className="text-sm text-white/50">{to}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/80">
                <Ticket className="h-4 w-4 text-yellow-300" />
                <span>
                  <b>PNR:</b> {pnr}
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/80">
                <Plane className="h-4 w-4 text-yellow-300" />
                <span>
                  <b>{airlineName}</b> {flightNo && `- ${flightNo}`}
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/80">
                <CalendarDays className="h-4 w-4 text-yellow-300" />
                <span>
                  <b>Departure:</b> {formatDateTime(depTime)}
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/80">
                <CalendarDays className="h-4 w-4 text-yellow-300" />
                <span>
                  <b>Arrival:</b> {formatDateTime(arrTime)}
                </span>
              </div>

              <div className="flex items-center gap-3 border-t border-white/10 pt-3 text-white">
                <IndianRupee className="h-4 w-4 text-yellow-300" />
                <span className="text-base font-semibold">
                  ₹ {Number(fare).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightBookings;
