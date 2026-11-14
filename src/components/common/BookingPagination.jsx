import { Fragment } from "react";

export default function BookingPagination({ label, page, pageSize, totalItems, totalPages, onPageChange }) {
  if (!totalItems) return null;

  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((number) => number >= 1 && number <= totalPages)
    .sort((a, b) => a - b);
  const buttonClass = "fl-booking-button fl-booking-line min-h-10 min-w-8 rounded-lg border px-2 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-10 sm:px-3 sm:text-sm";

  return (
    <nav aria-label={`${label} bookings pagination`} className="mt-8 flex flex-col items-center gap-3">
      <p className="fl-booking-muted flex flex-wrap justify-center gap-x-2 text-center text-sm" role="status" aria-live="polite">
        <span>Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)} of {totalItems} bookings</span>
        <span className="whitespace-nowrap">Page {page} of {totalPages}</span>
      </p>
      <div className="flex max-w-full flex-wrap items-center justify-center gap-1 sm:gap-2">
        <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onPageChange(page - 1)} className={`${buttonClass} fl-booking-secondary`}>
          Previous
        </button>
        {pages.map((number, index) => (
          <Fragment key={number}>
            {index > 0 && number - pages[index - 1] > 1 && <span aria-hidden="true" className="fl-booking-muted px-1">…</span>}
            <button type="button" aria-label={`Go to page ${number}`} aria-current={number === page ? "page" : undefined} onClick={() => onPageChange(number)} className={`${buttonClass} ${number === page ? "fl-booking-primary" : "fl-booking-secondary"}`}>
              {number}
            </button>
          </Fragment>
        ))}
        <button type="button" aria-label="Next page" disabled={page === totalPages} onClick={() => onPageChange(page + 1)} className={`${buttonClass} fl-booking-secondary`}>
          Next
        </button>
      </div>
    </nav>
  );
}
