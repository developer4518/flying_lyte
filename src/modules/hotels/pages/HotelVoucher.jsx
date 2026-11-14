"use client";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const voucherPdfStyles = `

  [data-voucher-pdf], [data-voucher-pdf] * {
    box-sizing: border-box !important;
    font-family: Arial, Helvetica, sans-serif !important;
    color: #26313f !important;
    background-color: transparent !important;
    background-image: none !important;
    border-color: #e4dfd3 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
    animation: none !important;
    transition: none !important;
    transform: none !important;
    text-align: left !important;
    letter-spacing: normal !important;
    word-spacing: normal !important;
    overflow-wrap: anywhere !important;
    text-overflow: clip !important;
    -webkit-line-clamp: unset !important;
    max-height: none !important;
  }
  [data-voucher-pdf] {
    --bg-main: #fffefb; --bg-card: #ffffff; --text-main: #26313f;
    --text-muted: #59616f; --gold-main: #705426; --gold-soft: #705426;
    width: 794px !important; min-width: 794px !important; max-width: 794px !important;
    margin: 0 !important; padding: 0 !important; border: 0 !important;
    background: #fffefb !important; font-size: 15px !important; line-height: 22px !important;
    overflow: visible !important;
  }
  [data-voucher-pdf] .no-print, [data-voucher-pdf] .voucher-top { display: none !important; }
  [data-voucher-pdf] :is(.voucher-row, section) { border: 0 !important; border-bottom: 1px solid #e4dfd3 !important; }
  [data-voucher-pdf] .voucher-cell { padding: 14px 16px !important; font-size: 15px !important; line-height: 22px !important; }
  [data-voucher-pdf] :is(p, li, td, .room-description, .guest-cell, .room-name) { font-size: 15px !important; line-height: 22px !important; }
  [data-voucher-pdf] :is(.voucher-heading, h2) {
    margin: 0 0 11px !important; padding: 0 0 8px !important;
    border: 0 !important; border-bottom: 2px solid #d9b66f !important;
    font-size: 16px !important; line-height: 24px !important; font-weight: 700 !important;
    color: #141a23 !important;
  }
  [data-voucher-pdf] .voucher-heading { margin: 0 !important; padding: 12px 16px !important; background: #f4f0e7 !important; }
  [data-voucher-pdf] .voucher-gold { color: #705426 !important; font-weight: 700 !important; }
  [data-voucher-pdf] :is(strong, b, .room-name) { color: #141a23 !important; font-weight: 700 !important; }
  [data-voucher-pdf] .voucher-grid-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0 !important; }
  [data-voucher-pdf] .voucher-grid-2 > div:first-child { border: 0 !important; border-right: 1px solid #e4dfd3 !important; }
  [data-voucher-pdf] .voucher-grid-2 > div:only-child { grid-column: 1 / -1 !important; border-right: 0 !important; }
  [data-voucher-pdf] :is(.date-grid, .info-grid) { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 16px !important; }
  [data-voucher-pdf] :is(.date-item, .info-item) { display: block !important; min-width: 0 !important; }
  [data-voucher-pdf] :is(.date-item, .info-item) > span { display: block !important; }
  [data-voucher-pdf] :is(.date-item, .info-item) > .voucher-gold { font-size: 12px !important; line-height: 18px !important; margin-bottom: 4px !important; }
  [data-voucher-pdf] :is(.table-scroll, .fl-booking-table-scroll) { width: 100% !important; max-width: 100% !important; overflow: visible !important; }
  [data-voucher-pdf] table { width: 100% !important; min-width: 0 !important; max-width: 100% !important; table-layout: fixed !important; border-collapse: collapse !important; }
  [data-voucher-pdf] :is(th, td) { border: 1px solid #e4dfd3 !important; padding: 11px !important; vertical-align: top !important; white-space: normal !important; overflow: visible !important; }
  [data-voucher-pdf] th { font-size: 13px !important; line-height: 20px !important; font-weight: 700 !important; color: #141a23 !important; background: #f4f0e7 !important; }
  [data-voucher-pdf] .sno-col { width: 58px !important; }
  [data-voucher-pdf] .guest-col { width: 220px !important; }
  [data-voucher-pdf] .sno-cell { text-align: center !important; }
  [data-voucher-pdf] .room-name { margin: 0 !important; }
  [data-voucher-pdf] .room-description { margin-top: 22px !important; }
  [data-voucher-pdf] .room-description p { margin: 0 0 22px !important; }
  [data-voucher-pdf] .room-description p:last-child { margin-bottom: 0 !important; }
  [data-voucher-pdf] .red-text { color: #8c3730 !important; }
  [data-voucher-pdf] :is(.terms-list, .policy-list, .rate-list) { margin: 11px 0 0 !important; padding: 0 0 0 24px !important; }
  [data-voucher-pdf] li { margin: 0 0 11px !important; padding: 0 !important; }
  [data-voucher-pdf] li p { margin: 0 0 11px !important; }
  [data-voucher-pdf] .amount-box { max-width: 100% !important; border: 1px solid #d9b66f !important; background: #f8f5ee !important; overflow: visible !important; }
  [data-voucher-pdf] .amount-row { display: flex !important; align-items: flex-start !important; justify-content: space-between !important; gap: 20px !important; padding: 12px 14px !important; border-bottom: 1px solid #e4dfd3 !important; }
  [data-voucher-pdf] .amount-row > span { min-width: 0 !important; }
  [data-voucher-pdf] .amount-row strong { flex: 0 0 auto !important; max-width: 48% !important; text-align: right !important; font-size: 16px !important; line-height: 22px !important; }
  [data-voucher-pdf] .amount-row small { display: block !important; color: #59616f !important; font-size: 11px !important; line-height: 16px !important; }
  [data-voucher-pdf] .amount-row.total { border-bottom: 0 !important; background: #eee6d5 !important; }
  [data-voucher-pdf] .amount-row.total strong { font-size: 18px !important; }
  [data-voucher-pdf] .gold-link { color: #705426 !important; text-decoration: underline !important; }
  [data-voucher-pdf] img { max-width: 100% !important; max-height: 900px !important; object-fit: contain !important; }
  [data-voucher-pdf] :is(pre, code) { white-space: pre-wrap !important; }

`;


function measureVoucherPdfPages(element, capacity) {
  const origin = element.getBoundingClientRect().top;
  const height = Math.ceil(element.getBoundingClientRect().height);
  const lines = [];
  const protectedBands = [];
  const addBand = (top, bottom, keepTogether = false) => {
    const band = { top: Math.max(0, top), bottom: Math.min(height, bottom) };
    if (band.bottom > band.top && (!keepTogether || band.bottom - band.top < capacity - 2)) {
      protectedBands.push(band);
    }
  };

  const walker = element.ownerDocument.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = element.ownerDocument.createRange();
  while (walker.nextNode()) {
    if (!walker.currentNode.textContent.trim()) continue;
    range.selectNodeContents(walker.currentNode);
    for (const rect of range.getClientRects()) {
      if (rect.width <= 0 || rect.height <= 0) continue;
      const line = { top: rect.top - origin, bottom: rect.bottom - origin };
      lines.push(line);
      addBand(line.top - 1, line.bottom + 1);
    }
  }

  lines.sort((a, b) => a.top - b.top);
  element.querySelectorAll("tr, li, .amount-box, .date-grid, .info-grid, .voucher-grid-2, img").forEach(node => {
    const rect = node.getBoundingClientRect();
    // Leave the border itself as a legal break between consecutive rows.
    addBand(rect.top - origin + 0.5, rect.bottom - origin - 0.5, true);
  });
  element.querySelectorAll("h2, .voucher-heading, thead").forEach(node => {
    const rect = node.getBoundingClientRect();
    const nextLine = lines.find(line => line.top >= rect.bottom - origin - 0.25);
    addBand(rect.top - origin, nextLine?.bottom ?? rect.bottom - origin, true);
  });

  // Merge overlaps so a break never bisects a line in another table column.
  const bands = [];
  protectedBands.sort((a, b) => a.top - b.top);
  protectedBands.forEach(band => {
    const previous = bands.at(-1);
    if (previous && band.top < previous.bottom) previous.bottom = Math.max(previous.bottom, band.bottom);
    else bands.push({ ...band });
  });

  const pages = [];
  let start = 0;
  while (start < height - 0.01) {
    let end = Math.min(start + capacity, height);
    const crossing = bands.find(band => band.top < end && band.bottom > end);
    if (crossing && end < height) end = crossing.top;
    if (end <= start + 0.5) throw new Error("Voucher content cannot be paginated without clipping.");
    pages.push({ start, end });
    start = end;
  }
  return { height, pages };
}

function drawVoucherPdfFrame(pdf, logo, page, total) {
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  pdf.setFillColor("#FFFEFB");
  pdf.rect(0, 0, width, height, "F");
  pdf.setFillColor("#141A23");
  pdf.rect(0, 0, width, 30, "F");
  pdf.setFillColor("#D9B66F");
  pdf.rect(0, 29.5, width, 0.5, "F");

  if (logo) {
    pdf.setFillColor("#FFFEFB");
    pdf.roundedRect(12, 6, 48, 18, 1, 1, "F");
    const imageWidth = Math.min(44, 14 * logo.naturalWidth / logo.naturalHeight);
    const imageHeight = imageWidth * logo.naturalHeight / logo.naturalWidth;
    pdf.addImage(logo, "PNG", 14 + (44 - imageWidth) / 2, 8 + (14 - imageHeight) / 2, imageWidth, imageHeight);
  } else {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(19);
    pdf.setTextColor("#D9B66F");
    pdf.text("FlyingLyte", 12, 18);
  }
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor("#FFFEFB");
  pdf.text("HOTEL VOUCHER", width - 12, 13, { align: "right" });
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor("#D9B66F");
  pdf.text("ACCOMMODATION DETAILS", width - 12, 21, { align: "right" });

  pdf.setFillColor("#141A23");
  pdf.rect(0, height - 16, width, 16, "F");
  pdf.setFillColor("#D9B66F");
  pdf.rect(0, height - 16.5, width, 0.5, "F");
  pdf.setFontSize(8);
  pdf.setTextColor("#FFFEFB");
  pdf.text("FLYINGLYTE  /  HOTEL VOUCHER", 12, height - 6);
  pdf.setTextColor("#D9B66F");
  pdf.text("Page " + page + " of " + total, width - 12, height - 6, { align: "right" });
}


const safeJsonParse = (value, fallback = {}) => {
  try {
    return JSON.parse(value || "{}");
  } catch {
    return fallback;
  }
};

const pickFirst = (...values) => {
  return values.find((value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === "object") return false;

    const text = String(value).trim();
    return text && text.toLowerCase() !== "n/a";
  });
};

const pickFirstArray = (...values) => {
  return values.find((value) => Array.isArray(value) && value.length > 0) || [];
};

const cleanText = (value) => {
  if (!value) return "";
  if (Array.isArray(value))
    return value.map(cleanText).filter(Boolean).join(", ");

  if (typeof value === "object") {
    return (
      value?.Name ||
      value?.Description ||
      value?.FacilityName ||
      value?.AmenityName ||
      value?.PromotionName ||
      value?.SupplementName ||
      value?.Type ||
      ""
    );
  }

  return String(value)
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .trim();
};

const getFirstValue = (...values) => {
  for (const value of values) {
    const cleaned = cleanText(value);
    if (cleaned) return cleaned;
  }

  return "";
};

const normalizeArray = (value, options = {}) => {
  const { splitComma = true } = options;

  if (!value) return [];

  if (Array.isArray(value)) {
    return value.flat(Infinity).map(cleanText).filter(Boolean);
  }

  if (typeof value === "string") {
    let text = value.split("|").join("\n");

    if (splitComma) {
      text = text.split(",").join("\n");
    }

    return text
      .split("\n")
      .map((item) => cleanText(item))
      .filter(Boolean);
  }

  return [];
};

const parseDateValue = (dateValue) => {
  if (!dateValue) return null;

  const value = String(dateValue).trim();
  const datePart = value.split(" ")[0];
  const parts = datePart.split("-");

  let date;

  if (parts.length === 3) {
    const [a, b, c] = parts;

    if (a.length === 4) {
      date = new Date(Number(a), Number(b) - 1, Number(c));
    } else if (c.length === 4) {
      date = new Date(Number(c), Number(b) - 1, Number(a));
    }
  }

  if (!date) date = new Date(dateValue);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (dateValue) => {
  const date = parseDateValue(dateValue);

  if (!date) return dateValue || "N/A";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getNights = (checkIn, checkOut) => {
  const inDate = parseDateValue(checkIn);
  const outDate = parseDateValue(checkOut);

  if (!inDate || !outDate) return "N/A";

  const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : "N/A";
};

const formatMoney = (value, currency = "INR") => {
  const amount = Number(value || 0);

  if (!amount) return "";

  const formatted = amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

  return currency === "INR" ? `₹ ${formatted}` : `${currency} ${formatted}`;
};

const getRoomData = (saved, bookingData) => {
  return (
    saved?.roomData ||
    saved?.reviewBookingData?.roomData ||
    saved?.prebookData?.raw?.HotelResult?.[0]?.Rooms?.[0] ||
    saved?.prebookData?.raw?.Response?.HotelResult?.[0]?.Rooms?.[0] ||
    saved?.prebookData?.room ||
    saved?.selectedRoom ||
    saved?.room ||
    bookingData?.HotelRoomsDetails?.[0] ||
    bookingData?.Rooms?.[0] ||
    {}
  );
};

const getHotelResult = (saved, bookingData) => {
  return (
    saved?.hotelResult ||
    saved?.reviewBookingData?.hotelResult ||
    saved?.prebookData?.raw?.HotelResult?.[0] ||
    saved?.prebookData?.raw?.Response?.HotelResult?.[0] ||
    saved?.hotel?.hotel_raw ||
    saved?.hotel?.rawHotel ||
    bookingData?.HotelResult?.[0] ||
    bookingData?.Response?.HotelResult?.[0] ||
    {}
  );
};

const getGuestName = (guest) => {
  return `${guest?.Title ? `${guest.Title}. ` : ""}${
    guest?.FirstName || guest?.firstName || guest?.First || ""
  } ${guest?.LastName || guest?.lastName || guest?.Last || ""}`.trim();
};

const getHotelAddress = ({
  savedData = {},
  hotel = {},
  hotelResult = {},
  booking = {},
}) => {
  return getFirstValue(
    savedData?.hotelAddress,
    savedData?.reviewBookingData?.hotelAddress,

    savedData?.hotel?.hotel_address,
    savedData?.hotel?.address,
    savedData?.hotel?.Address,
    savedData?.hotel?.HotelAddress,
    savedData?.hotel?.AddressLine,
    savedData?.hotel?.HotelAddressLine,
    savedData?.hotel?.Location,
    savedData?.hotel?.HotelLocation,

    savedData?.hotel?.hotel_raw?.hotel_address,
    savedData?.hotel?.hotel_raw?.address,
    savedData?.hotel?.hotel_raw?.Address,
    savedData?.hotel?.hotel_raw?.HotelAddress,
    savedData?.hotel?.hotel_raw?.AddressLine,
    savedData?.hotel?.hotel_raw?.HotelAddressLine,
    savedData?.hotel?.hotel_raw?.Location,
    savedData?.hotel?.hotel_raw?.HotelLocation,

    hotel?.hotel_address,
    hotel?.address,
    hotel?.Address,
    hotel?.HotelAddress,
    hotel?.AddressLine,
    hotel?.HotelAddressLine,
    hotel?.Location,
    hotel?.HotelLocation,

    hotel?.hotel_raw?.hotel_address,
    hotel?.hotel_raw?.address,
    hotel?.hotel_raw?.Address,
    hotel?.hotel_raw?.HotelAddress,
    hotel?.hotel_raw?.AddressLine,
    hotel?.hotel_raw?.HotelAddressLine,
    hotel?.hotel_raw?.Location,
    hotel?.hotel_raw?.HotelLocation,

    hotelResult?.hotel_address,
    hotelResult?.address,
    hotelResult?.Address,
    hotelResult?.HotelAddress,
    hotelResult?.AddressLine,
    hotelResult?.HotelAddressLine,
    hotelResult?.Location,
    hotelResult?.HotelLocation,

    booking?.HotelAddress,
    booking?.Address,
    booking?.AddressLine,
    booking?.HotelAddressLine,
    booking?.Location,
  );
};

const getRoomName = (room = {}, fallback = {}) => {
  const name =
    room?.room_name ||
    room?.Name?.[0] ||
    room?.Name ||
    room?.RoomName ||
    room?.RoomTypeName ||
    room?.RoomType ||
    fallback?.room_name ||
    fallback?.Name?.[0] ||
    fallback?.Name ||
    fallback?.RoomName ||
    fallback?.RoomTypeName ||
    fallback?.RoomType;

  return Array.isArray(name) ? name[0] : name || "N/A";
};

const getRoomInclusion = (room = {}, fallback = {}) => {
  return getFirstValue(
    room?.inclusion,
    room?.Inclusion,
    room?.MealType,
    room?.MealPlan,
    fallback?.inclusion,
    fallback?.Inclusion,
    fallback?.MealType,
    fallback?.MealPlan,
  );
};

const getPromotionText = (promotion) => {
  if (!promotion) return "";
  if (typeof promotion === "string") return promotion;

  return (
    promotion?.Description ||
    promotion?.Name ||
    promotion?.PromotionName ||
    "Promotion available"
  );
};

const getSupplementText = (supplement, currency = "INR") => {
  if (!supplement) return "";
  if (typeof supplement === "string") return supplement;

  const title =
    supplement?.Description ||
    supplement?.Name ||
    supplement?.SupplementName ||
    supplement?.SupplementDescription ||
    supplement?.Type ||
    supplement?.ChargeType ||
    "Supplement";

  const amount =
    supplement?.Price ||
    supplement?.Amount ||
    supplement?.Charge ||
    supplement?.SupplementPrice ||
    supplement?.SupplementCharge;

  if (amount !== undefined && amount !== null && amount !== "") {
    return `${title} - ${formatMoney(amount, supplement?.Currency || currency)}`;
  }

  return title;
};

const getCancellationChargeText = (policy, currency = "INR") => {
  const type = String(
    policy?.ChargeType || policy?.chargeType || "",
  ).toLowerCase();
  const charge = Number(policy?.CancellationCharge ?? policy?.Charge ?? 0);

  if (type === "percentage") return `${charge}%`;

  if (type === "fixed") {
    if (charge === 0) return "Free";
    return formatMoney(charge, currency);
  }

  if (charge === 0) return "Free";
  return charge ? formatMoney(charge, currency) : "N/A";
};

const HotelVoucher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = useParams();

  const voucherRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfCaptureMode, setPdfCaptureMode] = useState(false);

  const savedLocalData = safeJsonParse(
    localStorage.getItem("hotelBookingData"),
    {},
  );

  const state = location.state || {};
  const savedData = {
    ...savedLocalData,
    ...(state.savedData || {}),
  };

  const rawBooking =
    state.booking ||
    savedData?.bookingResponse?.data ||
    savedData?.bookingResponse?.Data ||
    savedData?.bookingResponse?.Response ||
    savedData?.bookingResponse ||
    {};

  const booking =
    rawBooking?.data || rawBooking?.Data || rawBooking?.Response || rawBooking;

  const hotel =
    state.hotel ||
    savedData?.hotel ||
    booking?.HotelDetails ||
    booking?.HotelDetail ||
    booking?.Hotel ||
    {};

  const roomData = useMemo(
    () => getRoomData(savedData, booking),
    [savedData, booking],
  );

  const hotelResult = useMemo(
    () => getHotelResult(savedData, booking),
    [savedData, booking],
  );

  const bookingRooms = useMemo(() => {
    const finalPayloadRooms = savedData?.finalPayload?.HotelRoomsDetails || [];
    const bookingDetailsRooms = booking?.HotelRoomsDetails || [];
    const savedRooms = savedData?.rooms || savedData?.Rooms || [];

    const rooms = pickFirstArray(
      bookingDetailsRooms,
      finalPayloadRooms,
      savedRooms,
    );

    if (rooms.length > 0) return rooms;

    return [roomData].filter(Boolean);
  }, [savedData, booking, roomData]);

  const guestDetails = useMemo(() => {
    const finalPayloadGuests =
      savedData?.finalPayload?.HotelRoomsDetails?.flatMap(
        (room) => room?.HotelPassenger || room?.HotelPassengers || [],
      ) || [];

    const bookingRoomGuests =
      booking?.HotelRoomsDetails?.flatMap(
        (room) => room?.HotelPassenger || room?.HotelPassengers || [],
      ) || [];

    return pickFirstArray(
      state.guestDetails,
      savedData?.guestList,
      savedData?.guestDetails,
      finalPayloadGuests,
      booking?.HotelPassenger,
      booking?.HotelPassengers,
      booking?.Passengers,
      booking?.GuestDetails,
      bookingRoomGuests,
    );
  }, [state.guestDetails, savedData, booking]);

  const confirmationNo = getFirstValue(
    booking?.ConfirmationNo,
    booking?.ConfirmationNumber,
    booking?.TBOConfirmationNo,
    booking?.BookingRefNo,
    booking?.TBOReferenceNo,
    booking?.BookingId,
    bookingId,
  );

  const bookingReference = getFirstValue(
    booking?.BookingRefNo,
    booking?.TBOReferenceNo,
    booking?.ReferenceNo,
  );

  const bookingStatus = getFirstValue(
    booking?.HotelBookingStatus,
    booking?.BookingStatus,
    booking?.StatusDescription,
    booking?.VoucherStatus ? "Vouchered" : "",
  );

  const hotelName = getFirstValue(
    hotel?.hotel_name,
    hotel?.HotelName,
    booking?.HotelName,
    hotelResult?.HotelName,
  );

  const hotelAddress = getHotelAddress({
    savedData,
    hotel,
    hotelResult,
    booking,
  });

  const hotelCity = getFirstValue(
    hotel?.city_name,
    hotel?.CityName,
    hotel?.city,
    hotel?.City,
    booking?.CityName,
    hotelResult?.CityName,
    savedData?.hotel?.city_name,
    savedData?.hotel?.CityName,
  );

  const hotelRating = getFirstValue(
    hotel?.rating,
    hotel?.HotelRating,
    hotel?.StarRating,
    hotelResult?.HotelRating,
    hotelResult?.StarRating,
  );

  const checkIn =
    savedData?.checkIn ||
    booking?.CheckInDate ||
    booking?.HotelCheckIn ||
    booking?.CheckIn ||
    roomData?.CheckInDate;

  const checkOut =
    savedData?.checkOut ||
    booking?.CheckOutDate ||
    booking?.HotelCheckOut ||
    booking?.CheckOut ||
    roomData?.CheckOutDate;

  const nights = getNights(checkIn, checkOut);

  const leadGuest =
    guestDetails.find((guest) => guest?.LeadPassenger) || guestDetails[0] || {};

  const leadGuestName = getGuestName(leadGuest);

  const adults = guestDetails.filter((guest) => {
    if (Number(guest?.PaxType) === 1) return true;
    if (Number(guest?.PaxType) === 2) return false;
    return Number(guest?.Age) >= 12;
  });

  const children = guestDetails.filter((guest) => {
    if (Number(guest?.PaxType) === 2) return true;
    if (Number(guest?.PaxType) === 1) return false;
    return Number(guest?.Age) > 0 && Number(guest?.Age) < 12;
  });

  const currency =
    booking?.Currency ||
    roomData?.Currency ||
    roomData?.currency ||
    savedData?.currency ||
    savedData?.finalPayload?.Currency ||
    "INR";

  const netAmount =
    savedData?.net ||
    savedData?.finalPayload?.NetAmount ||
    savedData?.reviewBookingData?.finalPayload?.NetAmount ||
    booking?.NetAmount ||
    booking?.TotalAmount ||
    booking?.InvoiceAmount ||
    roomData?.TotalFare ||
    0;


    const convenienceFee = Number(
  savedData?.convenienceFee ??
    savedData?.prebookData?.convenience_fee ??
    savedData?.reviewBookingData?.prebookData?.convenience_fee ??
    0,
);

const totalPaid = Number(
  savedData?.paidAmount ??
    savedData?.paymentAmount ??
    savedData?.totalAmount ??
    savedData?.prebookData?.total_amount ??
    savedData?.reviewBookingData?.prebookData?.total_amount ??
    0,
);

  const totalTax =
    roomData?.TotalTax ||
    booking?.TotalTax ||
    booking?.Tax ||
    booking?.TotalGSTAmount ||
    0;

  const roomPromotions = useMemo(() => {
    return pickFirstArray(
      savedData?.roomPromotions,
      savedData?.RoomPromotions,
      savedData?.RoomPromotion,
      roomData?.room_promotion,
      roomData?.RoomPromotion,
      roomData?.RoomPromotions,
      roomData?.Promotion,
      hotelResult?.RoomPromotion,
      booking?.HotelRoomsDetails?.[0]?.RoomPromotion,
    );
  }, [savedData, roomData, hotelResult, booking]);

  const supplements = useMemo(() => {
    return pickFirstArray(
      savedData?.supplements,
      savedData?.Supplements,
      roomData?.supplements,
      roomData?.Supplements,
      roomData?.Supplement,
      booking?.HotelRoomsDetails?.[0]?.Supplements,
    );
  }, [savedData, roomData, booking]);

  const amenities = useMemo(() => {
    const list =
      savedData?.roomAmenities ||
      savedData?.RoomAmenities ||
      roomData?.Amenities ||
      roomData?.RoomAmenities ||
      roomData?.amenities ||
      hotel?.amenities ||
      hotel?.HotelFacilities ||
      hotelResult?.HotelFacilities ||
      [];

    return normalizeArray(list);
  }, [savedData, roomData, hotel, hotelResult]);

  const hotelFacilities = useMemo(() => {
    const list =
      savedData?.hotelFacilities ||
      savedData?.HotelFacilities ||
      savedData?.facilities ||
      savedData?.Facilities ||
      hotel?.hotel_facilities ||
      hotel?.HotelFacilities ||
      hotel?.Facilities ||
      hotel?.facilities ||
      hotelResult?.HotelFacilities ||
      hotelResult?.Facilities ||
      booking?.HotelFacilities ||
      booking?.Facilities ||
      [];

    return normalizeArray(list);
  }, [savedData, hotel, hotelResult, booking]);

  const hotelNorms = useMemo(() => {
    const norms =
      savedData?.hotelNorms ||
      savedData?.HotelNorms ||
      hotelResult?.HotelNorms ||
      hotel?.HotelNorms ||
      hotel?.hotel_norms ||
      roomData?.HotelNorms ||
      booking?.HotelNorms ||
      [];

    return normalizeArray(norms);
  }, [savedData, hotelResult, hotel, roomData, booking]);

  const bookingTerms = useMemo(() => {
    return normalizeArray(
      booking?.TermsAndConditions ||
        booking?.BookingTermsAndConditions ||
        booking?.TermsConditions ||
        booking?.Terms ||
        roomData?.TermsAndConditions ||
        hotelResult?.TermsAndConditions,
    );
  }, [booking, roomData, hotelResult]);

  const rateConditions = useMemo(() => {
    const data =
      savedData?.rateConditions ||
      savedData?.RateConditions ||
      savedData?.reviewBookingData?.rateConditions ||
      savedData?.reviewBookingData?.RateConditions ||
      roomData?.rate_conditions ||
      roomData?.RateConditions ||
      roomData?.room_raw?.RateConditions ||
      hotelResult?.RateConditions ||
      booking?.RateConditions ||
      booking?.HotelRoomsDetails?.[0]?.RateConditions ||
      booking?.HotelRoomsDetails?.[0]?.rateConditions ||
      [];

    return normalizeArray(data, { splitComma: false });
  }, [savedData, roomData, hotelResult, booking]);

  const cancelPolicies = useMemo(() => {
    return pickFirstArray(
      savedData?.cancellationPolicies,
      savedData?.CancelPolicies,
      roomData?.CancelPolicies,
      roomData?.CancellationPolicies,
      booking?.HotelRoomsDetails?.[0]?.CancelPolicies,
      booking?.HotelRoomsDetails?.[0]?.CancellationPolicies,
    );
  }, [savedData, roomData, booking]);

  const specialRequest = getFirstValue(
    booking?.SpecialRequest,
    booking?.SpecialServiceRequest,
    booking?.SSR,
    savedData?.specialRequest,
  );

  const remarks = getFirstValue(
    booking?.Remark,
    booking?.Remarks,
    booking?.HotelRemarks,
    roomData?.Remarks,
  );

  const agentRemarks = getFirstValue(
    booking?.AgentRemark,
    booking?.AgentRemarks,
    savedData?.agentRemarks,
  );

  const agencyName = getFirstValue(
    booking?.AgencyName,
    booking?.AgentName,
    booking?.AgencyDetails?.Name,
    savedData?.agency?.name,
    state?.agency?.name,
  );

  const agencyAddress = getFirstValue(
    booking?.AgencyAddress,
    booking?.AgencyDetails?.Address,
    savedData?.agency?.address,
    state?.agency?.address,
  );

  const agencyCity = getFirstValue(
    booking?.AgencyCity,
    booking?.AgencyDetails?.City,
    savedData?.agency?.city,
    state?.agency?.city,
  );

  const contactPhone = getFirstValue(
    booking?.AgencyPhone,
    booking?.Phone,
    booking?.ContactNo,
    booking?.CustomerSupportPhone,
    booking?.SupportPhone,
    booking?.AgencyDetails?.Phone,
    savedData?.agency?.phone,
    state?.agency?.phone,
  );

  const contactEmail = getFirstValue(
    booking?.AgencyEmail,
    booking?.Email,
    booking?.AgencyDetails?.Email,
    savedData?.agency?.email,
    state?.agency?.email,
  );

  const hasAgencyData =
    agencyName || agencyAddress || agencyCity || contactPhone || contactEmail;

  const hasHotelData = hotelName || hotelAddress || hotelCity;

  const waitForPaint = () =>
    new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(
      `Hotel Voucher - ${confirmationNo || "Booking"}`,
    );

    const body = encodeURIComponent(
      `Hotel Voucher

Hotel: ${hotelName || "N/A"}
Address: ${hotelAddress || hotelCity || "N/A"}
Confirmation No: ${confirmationNo || "N/A"}
Booking Ref: ${bookingReference || "N/A"}
Status: ${bookingStatus || "N/A"}
Check In: ${formatDate(checkIn)}
Check Out: ${formatDate(checkOut)}
Lead Guest: ${leadGuestName || "N/A"}`,
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleGeneratePdf = async () => {
    if (!voucherRef.current || pdfLoading) return;

    try {
      setPdfLoading(true);
      await document.fonts?.ready;
      await waitForPaint();

      const voucherElement = voucherRef.current;
      const captureWidth = 794;
      const scale = 2;
      const margin = 12;
      const bodyTop = 38;
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const usableWidth = pageWidth - margin * 2;
      const bodyHeight = pageHeight - bodyTop - 22;
      const capacity = bodyHeight * captureWidth / usableWidth;
      let layout;

      const prepareClone = async (clonedDocument, clonedVoucher) => {
        // All redesign styles exist only inside html2canvas's private document.
        clonedVoucher.setAttribute("data-voucher-pdf", "");
        const style = clonedDocument.createElement("style");
        style.textContent = voucherPdfStyles;
        clonedDocument.head.appendChild(style);
        clonedDocument.documentElement.style.setProperty("background", "#fffefb", "important");
        clonedDocument.body.style.setProperty("background", "#fffefb", "important");
        await clonedDocument.fonts?.ready;
        const nextLayout = measureVoucherPdfPages(clonedVoucher, capacity);
        if (!layout) layout = nextLayout;
        else if (Math.abs(layout.height - nextLayout.height) > 1) {
          throw new Error("Voucher layout changed during PDF capture.");
        }
      };

      const capture = (start, height) => html2canvas(voucherElement, {
        scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#fffefb",
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        windowHeight: 1400,
        width: captureWidth,
        height,
        x: 0,
        y: start,
        ignoreElements: element => element.classList.contains("no-print"),
        onclone: prepareClone,
      });

      let logo = null;
      try {
        const image = new Image();
        image.src = new URL("/images/flying_logo.png", window.location.origin).href;
        await image.decode();
        if (image.naturalWidth && image.naturalHeight) logo = image;
      } catch {
        // Keep export usable if the static brand asset is unavailable.
      }

      // Only one A4-sized canvas is rendered at a time, even for long vouchers.
      const firstCanvas = await capture(0, capacity);
      if (!layout?.pages.length) throw new Error("Voucher has no printable content.");
      for (let index = 0; index < layout.pages.length; index++) {
        const { start, end } = layout.pages[index];
        const canvas = index === 0 ? firstCanvas : await capture(start, end - start);
        const requiredHeight = Math.min(canvas.height, Math.ceil((end - start) * scale));
        let pageImage = canvas;
        if (requiredHeight < canvas.height) {
          pageImage = document.createElement("canvas");
          pageImage.width = canvas.width;
          pageImage.height = requiredHeight;
          const context = pageImage.getContext("2d");
          if (!context) throw new Error("PDF canvas is unavailable.");
          context.drawImage(canvas, 0, 0);
        }
        if (index > 0) pdf.addPage();
        drawVoucherPdfFrame(pdf, logo, index + 1, layout.pages.length);
        pdf.addImage(pageImage, "PNG", margin, bodyTop, usableWidth, pageImage.height * usableWidth / pageImage.width, undefined, "FAST");
        canvas.width = canvas.height = 0;
        if (pageImage !== canvas) pageImage.width = pageImage.height = 0;
      }

      pdf.save(`Hotel-Voucher-${confirmationNo || "Booking"}.pdf`);
    } catch (error) {
      console.error("PDF GENERATE ERROR:", error);
      alert("Unable to generate PDF. Please try again.");
    } finally {
      setPdfCaptureMode(false);
      setPdfLoading(false);
    }
  };

  return (
    <div className="fl-booking-base min-h-screen bg-(--bg-main) px-3 py-10 font-(--font-body) text-(--text-main) md:py-24">
      <style>
        {`
          .voucher-wrapper {
            width: 100%;
            max-width: 1050px;
            margin: 0 auto;
            background: var(--bg-card);
            border: 1px solid rgba(201, 162, 77, 0.28);
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.45);
          }

          .voucher-wrapper.pdf-capture {
            border-radius: 0;
            box-shadow: none;
          }

          .voucher-top {
            background: linear-gradient(90deg, var(--bg-primary), var(--bg-via), var(--bg-secondary));
            color: var(--text-main);
            padding: 16px 20px;
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 16px;
            border-bottom: 1px solid rgba(201, 162, 77, 0.25);
          }

          .voucher-title {
            font-family: var(--font-heading);
            font-size: 28px;
            line-height: 1.2;
            color: var(--gold-main);
            letter-spacing: 0.5px;
            white-space: nowrap;
          }

          .voucher-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 10px;
            font-size: 14px;
          }

          .voucher-actions button {
            text-decoration: underline;
            text-underline-offset: 4px;
            color: var(--gold-soft);
            background: transparent;
            border: none;
            cursor: pointer;
            transition: 0.2s ease;
            white-space: nowrap;
          }

          .voucher-actions button:hover {
            color: #ffffff;
          }

          .voucher-actions button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }

          .voucher-gold {
            color: var(--gold-main);
            font-weight: 700;
          }

          .voucher-row {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .voucher-heading {
            background: linear-gradient(90deg, rgba(248, 222, 130, 0.14), rgba(234, 168, 42, 0.08));
            color: var(--gold-main);
            font-weight: 800;
            padding: 10px 14px;
            border-bottom: 1px solid rgba(201, 162, 77, 0.22);
          }

          .voucher-cell {
            padding: 12px 14px;
            color: var(--text-muted);
            line-height: 1.55;
          }

          .voucher-cell strong,
          .voucher-cell b {
            color: var(--text-main);
          }

          .voucher-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1.35fr;
            align-items: stretch;
          }

          .voucher-grid-2 > div:first-child {
            border-right: 1px solid rgba(255, 255, 255, 0.08);
          }

          .date-grid,
          .info-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            align-items: start;
          }

          .date-item,
          .info-item {
            display: flex;
            gap: 6px;
            align-items: baseline;
            flex-wrap: wrap;
          }

          .table-scroll {
            width: 100%;
            overflow-x: auto;
          }

          .voucher-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }

          .voucher-table th {
            background: linear-gradient(90deg, rgba(248, 222, 130, 0.14), rgba(234, 168, 42, 0.08));
            color: var(--gold-main);
            font-weight: 800;
            text-align: left;
            padding: 10px 12px;
            border: 1px solid rgba(201, 162, 77, 0.22);
            vertical-align: middle;
          }

          .voucher-table td {
            padding: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            vertical-align: top;
            color: var(--text-muted);
            line-height: 1.55;
          }

          .sno-col {
            width: 64px;
            text-align: center !important;
          }

          .guest-col {
            width: 260px;
          }

          .sno-cell {
            text-align: center;
            vertical-align: middle !important;
            color: #ffffff !important;
            font-weight: 700;
          }

          .guest-cell {
            vertical-align: middle !important;
            word-break: break-word;
          }

          .room-name {
            color: #ffffff;
            font-weight: 800;
            font-size: 16px;
            line-height: 1.35;
          }
            .rate-list {
  padding-left: 28px;
  padding-right: 18px;
  margin: 14px 0 4px;
  line-height: 1.6;
}

.rate-list li {
  margin-bottom: 10px;
  padding-left: 4px;
  color: var(--text-muted);
}

.amount-box {
  border: 1px solid rgba(201, 162, 77, 0.18);
  border-radius: 18px;
  background: rgba(248, 222, 130, 0.06);
  overflow: hidden;
}

.amount-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.amount-row:last-child {
  border-bottom: none;
}

.amount-row span {
  color: var(--text-muted);
  font-weight: 700;
}

.amount-row strong {
  color: #ffffff;
  font-weight: 900;
}

.amount-row small {
  display: block;
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.58);
  font-size: 11px;
  font-weight: 500;
}

.amount-row.total strong {
  color: var(--gold-main);
  font-size: 18px;
}

          .terms-list,
          .policy-list {
            padding-left: 42px;
            padding-right: 18px;
            margin: 14px 0 4px;
            line-height: 1.55;
          }

          .terms-list li,
          .policy-list li {
            padding-left: 4px;
            margin-bottom: 6px;
          }

          .room-description {
            margin-top: 20px;
          }

          .room-description p {
            margin-bottom: 10px;
          }

          .red-text {
            color: #ff5c5c;
            font-weight: 800;
          }

          .gold-link {
            color: var(--gold-soft);
            text-decoration: underline;
            text-underline-offset: 4px;
          }

          .back-btn {
            background: linear-gradient(90deg, var(--color-start), var(--color-end));
            color: #000000;
            border-radius: 14px;
            padding: 10px 22px;
            font-weight: 800;
            box-shadow: 0 12px 30px rgba(0,0,0,0.25);
          }

          .pdf-capture .no-print {
            display: none !important;
          }

          .pdf-capture .voucher-top {
            grid-template-columns: 1fr;
          }

          @media (max-width: 768px) {
            .voucher-wrapper {
              border-radius: 18px;
            }

            .voucher-top {
              grid-template-columns: 1fr;
              align-items: flex-start;
            }

            .voucher-title {
              font-size: 24px;
            }

            .voucher-actions {
              justify-content: flex-start;
              font-size: 13px;
            }

            .voucher-grid-2 {
              grid-template-columns: 1fr;
            }

            .voucher-grid-2 > div:first-child {
              border-right: none;
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }

            .date-grid,
            .info-grid {
              grid-template-columns: 1fr;
              gap: 8px;
            }

            .voucher-table {
              min-width: 900px;
            }

            .terms-list,
.policy-list,
.rate-list {
  padding-left: 24px;
  padding-right: 6px;
}
  
            .terms-list,
            .policy-list {
              padding-left: 24px;
              padding-right: 6px;
            }
          }

          @media print {
            html,
            body {
              background: #0b0f14 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .no-print {
              display: none !important;
            }

            .voucher-wrapper {
              max-width: 100% !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              background: var(--bg-card) !important;
              border: 1px solid rgba(201, 162, 77, 0.28) !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .voucher-top {
              grid-template-columns: 1fr !important;
              background: linear-gradient(90deg, var(--bg-primary), var(--bg-via), var(--bg-secondary)) !important;
              color: var(--text-main) !important;
              border-bottom: 1px solid rgba(201, 162, 77, 0.25) !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .voucher-heading,
            .voucher-table th {
              background: linear-gradient(90deg, rgba(248, 222, 130, 0.14), rgba(234, 168, 42, 0.08)) !important;
              color: var(--gold-main) !important;
              border-color: rgba(201, 162, 77, 0.22) !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .voucher-cell,
            .voucher-table td {
              color: var(--text-muted) !important;
              border-color: rgba(255, 255, 255, 0.08) !important;
              background: transparent !important;
            }

            .table-scroll {
              overflow: visible !important;
            }

            .voucher-table {
              min-width: 0 !important;
            }

            @page {
              size: A4;
              margin: 8mm;
            }
          }
        `}
      </style>

      <div
        ref={voucherRef}
        className={`fl-booking-paper voucher-wrapper ${pdfCaptureMode ? "pdf-capture" : ""}`}
      >
        <div className="voucher-top">
          <div className="voucher-title">Hotel Voucher</div>

          <div className="voucher-actions no-print">
            <button className="fl-booking-button" onClick={handleEmail}>Email Voucher</button>
            <span className="text-(--text-muted)">|</span>

            <button className="fl-booking-button" onClick={handlePrint}>Print Voucher</button>
            <span className="text-(--text-muted)">|</span>

            <button className="fl-booking-button" onClick={handleGeneratePdf} disabled={pdfLoading}>
              {pdfLoading ? "Generating..." : "Generate PDF 🧾"}
            </button>
          </div>
        </div>

        <section className="voucher-row">
          <div className="voucher-heading">Booking Details</div>

          <div className="voucher-cell info-grid">
            {confirmationNo && (
              <div className="info-item">
                <span className="voucher-gold">Confirmation No:</span>
                <span className="fl-booking-ink text-white">{confirmationNo}</span>
              </div>
            )}

            {bookingReference && (
              <div className="info-item">
                <span className="voucher-gold">Booking Ref:</span>
                <span className="fl-booking-ink text-white">{bookingReference}</span>
              </div>
            )}

            {bookingStatus && (
              <div className="info-item">
                <span className="voucher-gold">Status:</span>
                <span className="fl-booking-ink text-white">{bookingStatus}</span>
              </div>
            )}
          </div>
        </section>

        {(hasHotelData || hasAgencyData) && (
          <section className="voucher-row voucher-grid-2">
            <div className="voucher-cell">
              <div className="voucher-gold">Hotel Address Details</div>

              {hotelName && (
                <div className="fl-booking-ink mt-1 font-semibold text-white">
                  {hotelName}
                  {hotelRating ? ` (${hotelRating} Star)` : ""}
                </div>
              )}

              {(hotelAddress || hotelCity) && (
                <div>
                  {hotelAddress || "Address not available"}
                  {hotelCity ? `, ${hotelCity}` : ""}
                </div>
              )}

              {(hotelName || hotelAddress || hotelCity) && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${hotelName} ${hotelAddress} ${hotelCity}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-link mt-1 inline-block"
                >
                  View Map
                </a>
              )}
            </div>

            {hasAgencyData && (
              <div className="voucher-cell">
                <div className="voucher-gold">Agency Address Details</div>

                {agencyName && (
                  <div className="fl-booking-ink mt-1 font-semibold text-white">
                    {agencyName}
                  </div>
                )}

                {agencyAddress && <div>{agencyAddress}</div>}
                {agencyCity && <div>City : {agencyCity}</div>}

                {contactPhone && (
                  <div>
                    Phone :{" "}
                    <a href={`tel:${contactPhone}`} className="gold-link">
                      {contactPhone}
                    </a>
                  </div>
                )}

                {contactEmail && (
                  <div>
                    Email :{" "}
                    <a href={`mailto:${contactEmail}`} className="gold-link">
                      {contactEmail}
                    </a>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        <section className="voucher-row voucher-cell">
          {leadGuestName && (
            <div>
              <span className="voucher-gold">Lead Passenger Name:</span>{" "}
              <span className="fl-booking-ink text-white">{leadGuestName}</span>
            </div>
          )}

          <div className="date-grid mt-5">
            {checkIn && (
              <div className="date-item">
                <span className="voucher-gold">Check In Date:</span>
                <span className="fl-booking-ink text-white">{formatDate(checkIn)}</span>
              </div>
            )}

            {checkOut && (
              <div className="date-item">
                <span className="voucher-gold">Check Out Date:</span>
                <span className="fl-booking-ink text-white">{formatDate(checkOut)}</span>
              </div>
            )}

            {nights !== "N/A" && (
              <div className="date-item">
                <span className="voucher-gold">No of Nights:</span>
                <span className="fl-booking-ink text-white">{nights}</span>
              </div>
            )}
          </div>
        </section>

        <section className="table-scroll">
          <div className="fl-booking-table-scroll"><table className="fl-booking-table voucher-table">
            <thead>
              <tr>
                <th className="sno-col">S.No</th>
                <th>Room Type</th>
                <th className="guest-col">Guests Type</th>
              </tr>
            </thead>

            <tbody>
              {bookingRooms.map((room, index) => {
                const roomGuests =
                  room?.HotelPassenger ||
                  room?.HotelPassengers ||
                  guestDetails ||
                  [];

                const roomAdults = roomGuests.filter((guest) => {
                  if (Number(guest?.PaxType) === 1) return true;
                  if (Number(guest?.PaxType) === 2) return false;
                  return Number(guest?.Age) >= 12;
                });

                const roomChildren = roomGuests.filter((guest) => {
                  if (Number(guest?.PaxType) === 2) return true;
                  if (Number(guest?.PaxType) === 1) return false;
                  return Number(guest?.Age) > 0 && Number(guest?.Age) < 12;
                });

                const roomAdultNames = roomAdults
                  .map(getGuestName)
                  .filter(Boolean)
                  .join(", ");

                const roomChildNames = roomChildren
                  .map(getGuestName)
                  .filter(Boolean)
                  .join(", ");

                const roomName = getRoomName(room, roomData);
                const inclusion = getRoomInclusion(room, roomData);

                const roomPromotionText =
                  getPromotionText(room?.RoomPromotion?.[0]) ||
                  getPromotionText(room?.room_promotion?.[0]) ||
                  getPromotionText(roomPromotions?.[0]);

                const roomDescription = getFirstValue(
                  room?.RoomDescription,
                  room?.Description,
                  room?.RoomInfo,
                  roomData?.RoomDescription,
                  roomData?.Description,
                  roomData?.RoomInfo,
                );

                return (
                  <tr key={index}>
                    <td className="sno-cell">{index + 1}</td>

                    <td>
                      <div className="room-name">{roomName}</div>

                      {inclusion && <div>Incl : {inclusion}</div>}

                      {roomPromotionText && (
                        <div className="red-text mt-1">{roomPromotionText}</div>
                      )}

                      {(roomDescription || amenities.length > 0) && (
                        <div className="room-description">
                          {roomDescription && (
                            <>
                              <p>
                                <strong>Room Description:</strong>
                              </p>
                              <p>{roomDescription}</p>
                            </>
                          )}

                          {amenities.length > 0 && (
                            <p>
                              <strong>Amenities</strong> -{" "}
                              {amenities.join(", ")}
                            </p>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="guest-cell">
                      {(roomAdults.length > 0 || roomChildren.length > 0) && (
                        <div className="fl-booking-ink font-semibold text-white">
                          {roomAdults.length > 0
                            ? `${roomAdults.length} Adult(s)`
                            : ""}
                          {roomChildren.length > 0
                            ? `${roomAdults.length > 0 ? ", " : ""}${
                                roomChildren.length
                              } Child`
                            : ""}
                        </div>
                      )}

                      {roomAdultNames && <div>Adults: {roomAdultNames}</div>}
                      {roomChildNames && <div>Children: {roomChildNames}</div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table></div>
        </section>

        {(roomPromotions.length > 0 || supplements.length > 0) && (
          <section className="voucher-row">
            <div className="voucher-cell">
              {roomPromotions.length > 0 && (
                <>
                  <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold mb-2 text-lg">Room Promotions</h2>

                  <ul className="terms-list list-disc">
                    {roomPromotions.map((promotion, index) => (
                      <li key={index}>{getPromotionText(promotion)}</li>
                    ))}
                  </ul>
                </>
              )}

              {supplements.length > 0 && (
                <>
                  <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold mb-2 mt-4 text-lg">
                    Supplements
                  </h2>

                  <ul className="terms-list list-disc">
                    {supplements.map((supplement, index) => (
                      <li key={index}>
                        {getSupplementText(supplement, currency)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        )}

        {cancelPolicies.length > 0 && (
          <section className="voucher-row">
            <div className="voucher-cell">
              <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold mb-3 text-lg">Cancellation Policy</h2>

              <div className="table-scroll">
                <div className="fl-booking-table-scroll"><table className="fl-booking-table voucher-table">
                  <thead>
                    <tr>
                      <th>Cancelled On or After</th>
                      <th>Cancelled On or Before</th>
                      <th>Charges</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cancelPolicies.map((policy, index) => (
                      <tr key={index}>
                        <td>
                          {formatDate(policy?.FromDate || policy?.fromDate)}
                        </td>
                        <td>
                          {formatDate(
                            policy?.ToDate ||
                              policy?.toDate ||
                              policy?.CancelledOnOrBefore ||
                              checkOut ||
                              policy?.FromDate,
                          )}
                        </td>
                        <td>{getCancellationChargeText(policy, currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table></div>
              </div>
            </div>
          </section>
        )}

        {(netAmount || convenienceFee || totalPaid) && (
  <section className="voucher-row">
    <div className="voucher-cell">
      <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold mb-3 text-lg">
        Amount Details
      </h2>

      <div className="amount-box">
        {/* Hotel / Supplier Net Amount */}
        <div className="amount-row">
          <span>
            Net Amount
            <small>Hotel booking amount</small>
          </span>

          <strong>
            {formatMoney(netAmount, currency)}
          </strong>
        </div>

        {/* Customer Convenience Fee */}
        <div className="amount-row">
          <span>
            Convenience Fee
            <small>Payment convenience charges</small>
          </span>

          <strong>
            {formatMoney(convenienceFee, currency)}
          </strong>
        </div>

        {/* Actual PayU Paid Amount */}
        <div className="amount-row total">
          <span>
            Total Amount Paid
            <small>Amount paid successfully through PayU</small>
          </span>

          <strong>
            {formatMoney(totalPaid, currency)}
          </strong>
        </div>
      </div>
    </div>
  </section>
)}

        {specialRequest && (
          <section className="voucher-row">
            <div className="voucher-cell">
              <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold mb-4 text-lg">Package Details:</h2>

              <div className="voucher-gold text-sm">
                Special Service Request:
              </div>

              <div className="mt-2">{specialRequest}</div>
            </div>
          </section>
        )}

        {remarks && (
          <section className="voucher-row">
            <div className="voucher-cell">
              <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold mb-2 text-lg">Remarks</h2>
              <p>{remarks}</p>
            </div>
          </section>
        )}

        {agentRemarks && (
          <section className="voucher-row">
            <div className="voucher-cell">
              <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold mb-2 text-lg">Agent Remarks</h2>
              <p>{agentRemarks}</p>
            </div>
          </section>
        )}
        {rateConditions.length > 0 && (
          <section className="voucher-row">
            <div className="voucher-cell">
              <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold text-lg">Rate Conditions</h2>

              <ol className="rate-list">
                {rateConditions.map((condition, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: cleanText(condition),
                    }}
                  />
                ))}
              </ol>
            </div>
          </section>
        )}

        {bookingTerms.length > 0 && (
          <section className="voucher-row">
            <div className="voucher-cell">
              <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold text-lg">
                Booking Terms & Conditions
              </h2>

              <ul className="terms-list list-disc">
                {bookingTerms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {hotelNorms.length > 0 && (
          <section className="voucher-row">
            <div className="voucher-cell">
              <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold text-lg">Hotel Policies</h2>

              <ul className="policy-list list-disc">
                {hotelNorms.map((norm, index) => (
                  <li key={index}>{norm}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {hotelFacilities.length > 0 && (
          <section className="voucher-row">
            <div className="voucher-cell">
              <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold text-lg">Hotel Facilities</h2>

              <ul className="policy-list list-disc">
                {hotelFacilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {(contactPhone || contactEmail) && (
          <section className="voucher-cell">
            <h2 className="fl-booking-heading fl-booking-subtitle voucher-gold mb-2 text-lg">Contact Details:</h2>

            {contactPhone && (
              <div>
                Phone :{" "}
                <a href={`tel:${contactPhone}`} className="gold-link">
                  {contactPhone}
                </a>
              </div>
            )}

            {contactEmail && (
              <div>
                Email :{" "}
                <a href={`mailto:${contactEmail}`} className="gold-link">
                  {contactEmail}
                </a>
              </div>
            )}
          </section>
        )}
      </div>

      <div className="no-print mx-auto mt-5 flex max-w-262.5 justify-end">
        <button onClick={() => navigate(-1)} className="fl-booking-button back-btn">
          Back
        </button>
      </div>
    </div>
  );
};

export default HotelVoucher;
