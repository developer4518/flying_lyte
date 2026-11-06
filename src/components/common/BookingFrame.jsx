// Presentation boundary only: routes, requests and booking state stay in their pages.
export default function BookingFrame({ children, kind }) {
  return <div className="fl-booking-page" data-fl-theme="model2" data-fl-booking-kind={kind}>{children}</div>;
}
