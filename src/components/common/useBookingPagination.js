import { useRef, useState } from "react";

const PAGE_SIZE = 10;

export default function useBookingPagination(bookings) {
  const [requestedPage, setPage] = useState(1);
  const listRef = useRef(null);
  const totalItems = bookings.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);

  // Keep the selected page valid if a refetch removes bookings.
  if (requestedPage !== page) setPage(page);

  const onPageChange = (nextPage) => {
    setPage(Math.max(1, Math.min(totalPages, nextPage)));
    listRef.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return {
    items: bookings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    page,
    pageSize: PAGE_SIZE,
    totalItems,
    totalPages,
    onPageChange,
    listRef,
  };
}
