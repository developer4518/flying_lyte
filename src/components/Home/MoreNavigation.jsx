import { createElement, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, BookOpen, ChevronDown, Compass, Images, MessageCircle } from "lucide-react";
import "./more-navigation.css";

const pages = [
  { name: "About Us", path: "/about", description: "Our story & approach", Icon: Compass },
  { name: "Travel Moments", path: "/gallery", description: "Photos, films & shared journeys", Icon: Images },
  { name: "Contact Us", path: "/contact", description: "Talk to our travel team", Icon: MessageCircle },
  { name: "Blogs", path: "/blogs", description: "Travel guides & inspiration", Icon: BookOpen },
];

export default function MoreNavigation({ mobile = false, onNavigate }) {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const panelId = useId();
  const { pathname } = useLocation();
  const active = pages.some(page => pathname === page.path || pathname.startsWith(page.path + "/"));
  const Container = mobile ? "div" : "li";

  useEffect(() => {
    if (!open) return;
    const outside = event => { if (!root.current?.contains(event.target)) setOpen(false); };
    const escape = event => {
      if (event.key === "Escape") {
        setOpen(false);
        if (root.current?.contains(document.activeElement)) trigger.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const focusLink = index => requestAnimationFrame(() => {
    const links = root.current?.querySelectorAll("a");
    if (links?.length) links[(index + links.length) % links.length].focus();
  });

  return <Container ref={root} className={"fl-nav-more " + (mobile ? "fl-nav-more--mobile" : "fl-nav-more--desktop")}
    onPointerEnter={event => { if (!mobile && event.pointerType === "mouse") setOpen(true); }}
    onPointerLeave={event => { if (!mobile && event.pointerType === "mouse" && !root.current?.contains(document.activeElement)) setOpen(false); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => {
      if (event.key === "Escape") {
        event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus({ preventScroll: true });
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault(); setOpen(true);
        const links = Array.from(root.current.querySelectorAll("a"));
        const current = links.indexOf(document.activeElement);
        focusLink(current < 0 ? (event.key === "ArrowDown" ? 0 : links.length - 1) : current + (event.key === "ArrowDown" ? 1 : -1));
      }
    }}>
    <button ref={trigger} type="button" className={"fl-nav-more__trigger " + (mobile ? "fl-nav__mobile-link " : "fl-nav__desktop-link ") + (active ? "fl-nav__active" : "fl-nav__idle")}
      aria-expanded={open} aria-controls={panelId} aria-haspopup="true" onClick={() => setOpen(value => !value)}>
      <span>More</span><ChevronDown size={15} aria-hidden="true" />
    </button>
    <div id={panelId} className="fl-nav-more__popover" hidden={!open}>
      <ul className="fl-nav-more__list">{pages.map(({ name, path, description, Icon }) => <li key={path}>
        <Link to={path} aria-current={pathname === path || pathname.startsWith(path + "/") ? "page" : undefined}
          onClick={event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); setOpen(false); onNavigate(path);
          }}>
          <span className="fl-nav-more__icon">{createElement(Icon, { size: 20, "aria-hidden": true })}</span>
          <span className="fl-nav-more__copy"><strong>{name}</strong><span>{description}</span></span>
          <ArrowUpRight className="fl-nav-more__arrow" size={15} aria-hidden="true" />
        </Link>
      </li>)}</ul>
    </div>
  </Container>;
}
