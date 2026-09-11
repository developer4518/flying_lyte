// services/bookingApi.js
import { privateApi } from "./api";

export const getPackageBookings = async () => {
  const res = await privateApi.get("/api/package/bookings/my/");
  return res.data || [];
};

export const getFlightBookings = async () => {
  const res = await privateApi.get("/api/airlines/my-bookings/");

  return Array.isArray(res.data) ? res.data : res.data?.data || [];
};

export const getHotelBookings = async () => {
  const res = await privateApi.get("/api/hotels/my-bookings/");
  return res.data?.data || [];
};
