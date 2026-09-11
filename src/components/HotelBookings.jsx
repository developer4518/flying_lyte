import { useQuery } from "@tanstack/react-query";
import { getHotelBookings } from "../services/bookingApi";

const HotelBookings = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["hotelBookings"],
    queryFn: getHotelBookings,
  });

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-400">Loading bookings...</div>
    );

  const confirmedBookings = data.filter((b) => b.status === "CONFIRMED");

  if (!confirmedBookings.length)
    return (
      <div className="text-center py-10 text-gray-400">
        No confirmed bookings found
      </div>
    );

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-3 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
        My Bookings
      </h2>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {confirmedBookings.map((b) => {
          return (
            <div
              key={b.id}
              className="
  w-full min-w-0 max-w-full overflow-hidden
  space-y-4 rounded-2xl
  border border-white/10
  bg-linear-to-br from-[#111] to-[#1a1a1a]
  p-4 sm:p-5
  shadow-lg
  transition-all duration-300
  sm:hover:scale-[1.02] sm:hover:shadow-xl
"
            >
              {/* Header */}
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                <span className="min-w-0 flex-1 break-all text-xs text-gray-400">
                  Booking ID: {b.booking_id || "N/A"}
                </span>

                <span className="shrink-0 rounded-full bg-green-400/10 px-2.5 py-1 text-xs font-semibold text-green-400">
                  CONFIRMED
                </span>
              </div>

              {/* Booking Code */}
              <p className="w-full max-w-full [overflow-wrap:anywhere] text-xs leading-5 text-gray-500">
                {b.booking_code}
              </p>

              {/* Guests Section */}
              <div>
                <p className="text-sm text-gray-400 mb-2">
                  Guests ({b.passengers?.length || 0})
                </p>

                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                  {b.passengers?.map((p, index) => (
                    <div
                      key={index}
                      className={`flex min-w-0 items-center justify-between gap-2 rounded-lg p-2 text-sm ${p.LeadPassenger
                        ? "bg-green-400/10 border border-green-400/20"
                        : "bg-white/5"
                        }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="break-words text-white">
                          {[p.Title, p.FirstName, p.LastName]
                            .filter(Boolean)
                            .join(" ")}
                        </p>
                        {p.Age && (
                          <p className="text-xs text-gray-400">Age: {p.Age}</p>
                        )}
                      </div>

                      {p.LeadPassenger && (
                        <span className="shrink-0 text-xs text-green-400">Lead</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Row */}
              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-gray-400">Nationality</p>
                  <p className="text-white font-medium">
                    {b.guest_nationality}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Booked On</p>
                  <p className="text-white font-medium">
                    {new Date(b.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10" />

              {/* Booking Details */}
              <div className="min-w-0 space-y-2 text-sm">
                {b.confirmation_no && (
                  <p>
                    <span className="text-gray-400">Confirmation:</span>{" "}
                    <span className="break-all text-white">
                      {b.confirmation_no}
                    </span>
                  </p>
                )}

                {b.booking_ref_no && (
                  <p className="min-w-0 break-words">
                    <span className="text-gray-400">Ref No:</span>{" "}
                    <span className="[overflow-wrap:anywhere] text-white">
                      {b.booking_ref_no}
                    </span>
                  </p>
                )}

                {b.invoice_number && (
                  <p>
                    <span className="text-gray-400">Invoice:</span>{" "}
                    <span className="break-all text-white">
                      {b.invoice_number}
                    </span>
                  </p>
                )}

                {b.hotel_booking_status && (
                  <p>
                    <span className="text-gray-400">Hotel Status:</span>{" "}
                    <span className="text-green-400">
                      {b.hotel_booking_status}
                    </span>
                  </p>
                )}
              </div>

              {/* Footer */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelBookings;
