import BookingFrame from "./BookingFrame";
import { MotionConfig } from "framer-motion";

export default function PublicFrame({ children, kind = "editorial" }) {
  return <MotionConfig reducedMotion="user"><BookingFrame kind="public"><div className="fl-public-page" data-fl-public-kind={kind}>{children}</div></BookingFrame></MotionConfig>;
}
