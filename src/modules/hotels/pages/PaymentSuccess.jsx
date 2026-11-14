
"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { publicApi, privateApi } from "../../../services/api";
import { useHotelStore } from "../../../store/hotelStore";

// Safely read saved booking data.
const readStoredJSON = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

// Compare amounts in paise to avoid floating-point errors.
const toPaise = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  return Math.round(amount * 100);
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { setGuestDetails } = useHotelStore();

  const txnid = searchParams.get("txnid");

  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");
  const [canRetry, setCanRetry] = useState(true);

  // Prevent duplicate effect execution for the same transaction.
  const startedForTransactionRef = useRef(null);

  useEffect(() => {
    const transactionKey = txnid || "__missing_txnid__";

    if (startedForTransactionRef.current === transactionKey) {
      return;
    }

    startedForTransactionRef.current = transactionKey;

    const verifyAndBookHotel = async () => {
      if (!txnid) {
        setStatus("error");
        setError("Transaction ID missing.");
        setCanRetry(false);
        return;
      }

      const bookingLockKey = `hotelBookingStarted_${txnid}`;

      let bookingRequestAttempted = false;

      try {
        // ==============================================
        // STEP 1 - VERIFY HOTEL PAYMENT
        // ==============================================

        setStatus("verifying");
        setError("");
        setCanRetry(true);

        const verifyResponse = await publicApi.get(
          `/payment/hotels/verify/${encodeURIComponent(txnid)}/`
        );

        const payment = verifyResponse.data;

        const paymentIsValid =
          payment?.success === true &&
          payment?.paid === true &&
          String(payment?.status || "").toLowerCase() ===
            "success" &&
          (!payment?.txnid || String(payment.txnid) === txnid);

        if (!paymentIsValid) {
          throw new Error(
            "Hotel payment could not be verified."
          );
        }

        const paidAmount = Number(payment.amount);
        const paidPaise = toPaise(payment.amount);

        if (paidPaise === null) {
          throw new Error(
            "Invalid payment amount received from the server."
          );
        }

        // ==============================================
        // STEP 2 - CHECK EXISTING BOOKING
        // ==============================================

        const bookingState = localStorage.getItem(
          bookingLockKey
        );

        const existingBookingData =
          readStoredJSON(`hotelBookingData_${txnid}`) ||
          readStoredJSON("hotelBookingData");

        // Completed booking: reopen success page.
        if (bookingState === "completed") {
          const existingPaidPaise = toPaise(
            existingBookingData?.paidAmount ??
              existingBookingData?.paymentAmount
          );

          if (
            existingBookingData?.paymentTransactionId ===
              txnid &&
            existingPaidPaise === paidPaise
          ) {
            setGuestDetails(
              existingBookingData.guestList || []
            );

            setStatus("success");

            navigate("/hotel-booking-success", {
              replace: true,
              state: {
                booking:
                  existingBookingData.bookingResponse,
                savedData: existingBookingData,
              },
            });

            return;
          }

          setCanRetry(false);

          throw new Error(
            "This transaction was already marked as booked, " +
              "but its saved details are unavailable. " +
              "Contact support with the transaction ID."
          );
        }

        // Do not automatically repeat an uncertain supplier booking.
        if (
          bookingState === "processing" ||
          bookingState === "needs_review"
        ) {
          setCanRetry(false);

          throw new Error(
            "A hotel booking request may already have been " +
              "submitted. To avoid duplicate bookings, " +
              "contact support with the transaction ID."
          );
        }

        // ==============================================
        // STEP 3 - GET SAVED HOTEL BOOKING DATA
        // ==============================================

        setStatus("booking");

        const pendingData = readStoredJSON(
          "pendingHotelBooking"
        );

        if (!pendingData) {
          throw new Error(
            "Pending hotel booking data not found."
          );
        }

        const {
          reviewData,
          bookingPayload,
          gstForms,
          paymentAmount,
        } = pendingData;

        if (!reviewData) {
          throw new Error(
            "Review booking data missing."
          );
        }

        if (!bookingPayload) {
          throw new Error(
            "Hotel booking payload missing."
          );
        }

        // ==============================================
        // STEP 4 - VERIFY PAYMENT AMOUNT
        // ==============================================

        const expectedPaise = toPaise(paymentAmount);

        if (
          expectedPaise === null ||
          expectedPaise !== paidPaise
        ) {
          throw new Error(
            "Payment amount does not match the hotel booking amount."
          );
        }

        // ==============================================
        // STEP 5 - HOTEL BOOK API
        // ==============================================

        setCanRetry(false);

        // Mark processing before contacting supplier.
        localStorage.setItem(
          bookingLockKey,
          "processing"
        );

        bookingRequestAttempted = true;

        const bookingResponse = await privateApi.post(
          "/api/hotels/hotels/book/",
          bookingPayload
        );

        const bookingResult = bookingResponse?.data;

        // Reject explicit application-level failures.
        // Exact supplier confirmation still needs backend verification.
        if (
          !bookingResult ||
          typeof bookingResult !== "object" ||
          bookingResult.success === false ||
          bookingResult.IsError === true
        ) {
          throw new Error(
            bookingResult?.message ||
              "Hotel booking was not confirmed by the booking API."
          );
        }

        // ==============================================
        // STEP 6 - BUILD SUCCESS DATA
        // ==============================================

        const bookingSuccessData = {
          ...reviewData,

          bookingResponse: bookingResult,

          guestList: reviewData.guestList || [],

          bookingCode: reviewData.bookingCode,

          hotel: reviewData.hotel || {},

          roomData: reviewData.roomData || {},

          hotelResult: reviewData.hotelResult || {},

          hotelAddress:
            reviewData.hotelAddress || "",

          checkIn: reviewData.checkIn,

          checkOut: reviewData.checkOut,

          net: reviewData.net,

          isPANRequired: reviewData.isPANRequired,

          corporatePAN: reviewData.corporatePAN,

          finalPayload: bookingPayload,

          cancellationPolicies:
            reviewData.cancellationPolicies || [],

          roomPromotions:
            reviewData.roomPromotions || [],

          supplements:
            reviewData.supplements || [],

          roomAmenities:
            reviewData.roomAmenities || [],

          rateConditions:
            reviewData.rateConditions || [],

          hotelFacilities:
            reviewData.hotelFacilities || [],

          hotelNorms:
            reviewData.hotelNorms || [],

          gstDetails: gstForms || [],

          // ============================================
          // PAYMENT INFORMATION
          // ============================================

          paidAmount,

          paymentAmount: paidAmount,

          convenienceFee: Number(
            reviewData?.convenienceFee ??
              reviewData?.prebookData
                ?.convenience_fee ??
              0
          ),

          totalAmount: paidAmount,

          paymentTransactionId: txnid,

          paymentStatus: "success",

          paymentVerified: true,
        };

        // ==============================================
        // STEP 7 - SAVE BOOKING DATA
        // ==============================================

        // Transaction-specific backup for refresh recovery.
        localStorage.setItem(
          `hotelBookingData_${txnid}`,
          JSON.stringify(bookingSuccessData)
        );

        // Preserve the existing success page storage key.
        localStorage.setItem(
          "hotelBookingData",
          JSON.stringify(bookingSuccessData)
        );

        // Mark completed only after saving booking data.
        localStorage.setItem(
          bookingLockKey,
          "completed"
        );

        setGuestDetails(
          reviewData.guestList || []
        );

        // Remove temporary checkout data.
        localStorage.removeItem(
          "pendingHotelBooking"
        );

        localStorage.removeItem(
          "reviewBookingData"
        );

        // ==============================================
        // STEP 8 - NAVIGATE TO SUCCESS PAGE
        // ==============================================

        setStatus("success");

        navigate("/hotel-booking-success", {
          replace: true,

          state: {
            booking: bookingResult,
            savedData: bookingSuccessData,
          },
        });
      } catch (err) {
        console.error(
          "HOTEL PAYMENT / BOOKING ERROR:",
          err?.response?.data || err
        );

        if (bookingRequestAttempted) {
          // Supplier may have received the request even
          // when the browser received an error or timeout.
          // Do not automatically submit a second booking.
          localStorage.setItem(
            bookingLockKey,
            "needs_review"
          );

          setCanRetry(false);

          setError(
            "The hotel booking result needs confirmation. " +
              "Do not pay again or retry booking. " +
              "Please contact support with your transaction ID."
          );
        } else {
          setError(
            err?.response?.data?.message ||
              err?.response?.data?.Error
                ?.ErrorMessage ||
              err?.message ||
              "Unable to generate hotel voucher."
          );
        }

        setStatus("error");
      }
    };

    verifyAndBookHotel();
  }, [txnid, navigate, setGuestDetails]);

  return (
    <div className="fl-booking-ink fl-booking-base flex min-h-screen items-center justify-center bg-[#0B0B0F] px-4 text-white">
      <div className="fl-booking-surface fl-booking-line w-full max-w-md rounded-3xl border border-yellow-400/20 bg-[#15151C] p-8 text-center shadow-2xl">

        {status === "verifying" && (
          <>
            <div className="fl-booking-line fl-booking-spinner mx-auto h-14 w-14 animate-spin rounded-full border-4 border-gray-700 border-t-yellow-400" />

            <h1 className="fl-booking-heading fl-booking-title fl-booking-accent mt-6 text-xl font-bold text-yellow-300">
              Verifying Payment...
            </h1>

            <p className="fl-booking-muted mt-2 text-sm text-gray-400">
              Please do not refresh or close this page.
            </p>

            <p className="fl-booking-muted mt-4 break-all text-xs text-gray-500">
              Transaction ID: {txnid || "N/A"}
            </p>
          </>
        )}

        {status === "booking" && (
          <>
            <div className="fl-booking-line fl-booking-spinner mx-auto h-14 w-14 animate-spin rounded-full border-4 border-gray-700 border-t-green-400" />

            <h1 className="fl-booking-heading fl-booking-title fl-booking-success mt-6 text-xl font-bold text-green-300">
              Generating Your Voucher...
            </h1>

            <p className="fl-booking-muted mt-2 text-sm text-gray-400">
              Payment verified successfully. We are now
              confirming your hotel booking.
            </p>

            <p className="fl-booking-accent mt-4 text-xs text-yellow-300">
              Please do not refresh or close this page.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 text-6xl">
              ✅
            </div>

            <h1 className="fl-booking-heading fl-booking-title fl-booking-success text-2xl font-bold text-green-400">
              Booking Successful
            </h1>

            <p className="fl-booking-muted mt-3 text-sm text-gray-400">
              Opening your booking details...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4 text-6xl">
              ❌
            </div>

            <h1 className="fl-booking-heading fl-booking-title fl-booking-danger text-2xl font-bold text-red-400">
              Unable To Generate Voucher
            </h1>

            <p className="fl-booking-muted mt-3 text-sm text-gray-400">
              {error}
            </p>

            {txnid && (
              <div className="fl-booking-base fl-booking-line mt-5 rounded-xl border border-gray-800 bg-[#0B0B0F] p-4">
                <p className="fl-booking-muted text-xs text-gray-500">
                  Transaction ID
                </p>

                <p className="fl-booking-ink mt-1 break-all text-sm font-semibold text-white">
                  {txnid}
                </p>
              </div>
            )}

            {canRetry && (
              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="fl-booking-ink fl-booking-surface fl-booking-button fl-booking-primary mt-6 w-full rounded-xl bg-linear-to-r from-yellow-400 to-orange-400 py-3 font-bold text-black"
              >
                Retry Payment Verification
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
