import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { ArrowUpRight } from "lucide-react";
import logo from "/images/flying_logo.png";
import ColorModeButton from "./ColorModeButton";
import { useAuthStore } from "../../store/authStore";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
  { name: "Flights", path: "/flights" },
  { name: "Hotels", path: "/hotels" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Blogs", path: "/blogs" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuthStore();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > (location.pathname === "/" ? 8 : 60));

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleReloadNavigate = (path, state = null) => {
    setMenuOpen(false);
    setProfileOpen(false);

    // React Router state wali navigation
    // Hotels ke liye reload nahi karenge
    if (state) {
      navigate(path, { state });
      return;
    }

    // Baaki normal pages ki existing reload functionality same
    window.location.assign(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();

    // HOTELS
    // if (item.name === "Hotels") {
    //   setMenuOpen(false);
    //   setProfileOpen(false);

    //   navigate("/", {
    //     state: {
    //       searchTab: "hotels",
    //     },
    //   });

    //   return;
    // }

    // HOME
    if (item.name === "Home") {
      setMenuOpen(false);
      setProfileOpen(false);

      navigate("/", {
        replace: true,
        state: null,
      });

      return;
    }

    handleReloadNavigate(item.path);
  };

  // const isActive = (path) => {
  //   // Navbar Hotels se Home + Hotels tab open hua hai
  //   if (
  //     path === "/hotels" &&
  //     location.pathname === "/" &&
  //     location.state?.searchTab === "hotels"
  //   ) {
  //     return true;
  //   }

  //   // Home tab
  //   if (path === "/") {
  //     return (
  //       location.pathname === "/" && location.state?.searchTab !== "hotels"
  //     );
  //   }

  //   return (
  //     location.pathname === path || location.pathname.startsWith(`${path}/`)
  //   );
  // };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const navWrapperStyle = scrolled
    ? "fl-nav__surface--scrolled bg-[#06111d]/90 border-white/15 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
    : "fl-nav__surface--top bg-[#06111d]/75 border-white/10 shadow-[0_16px_45px_rgba(0,0,0,0.25)]";

  return (
    <nav className="fl-nav fixed inset-x-0 top-0 z-50 transition-all duration-300" data-fl-theme="model2" data-fl-home={location.pathname === "/"} data-fl-scrolled={scrolled}
      onKeyDown={event => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          event.currentTarget.querySelector(".fl-nav__menu-toggle")?.focus();
        }
      }}>
      {location.pathname === "/" && <div className="fl-nav__announcement">
        <span>A little less ordinary. A lot more you.</span>
        <Link to="/packages">Discover your next escape <ArrowUpRight size={13} aria-hidden="true" /></Link>
      </div>}
      <div className="fl-nav__container mx-auto w-[calc(100%-16px)] max-w-7xl sm:w-[94%]">
        <div
          className={`fl-nav__surface relative overflow-visible rounded-3xl border px-3 py-1.5 backdrop-blur-2xl transition-all duration-300 sm:px-4 md:rounded-full md:px-6 md:py-2 ${navWrapperStyle}`}
        >
          <div className="fl-nav__ambient pointer-events-none absolute inset-0 rounded-[28px] md:rounded-full bg-[radial-gradient(circle_at_15%_20%,rgba(230,179,92,0.18),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.08),transparent_24%)]" />

          <div className="fl-nav__row relative flex min-w-0 items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="fl-nav__brand group flex items-center"
              aria-label="Go to home"
            >
              <img
                src={logo}
                alt="FlyingLyte"
                className="fl-nav__logo h-9 w-auto max-w-[145px] select-none object-contain drop-shadow-[0_10px_20px_rgba(230,179,92,0.18)] transition duration-300 group-hover:scale-[1.03] sm:h-10 sm:max-w-[165px] md:h-12 md:max-w-[210px]"
                loading="lazy" />
            </button>

            {/* Desktop Menu */}
            <ul className="fl-nav__desktop-links hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`fl-nav__desktop-link relative block rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive(item.path)
                      ? "fl-nav__active bg-[#E6B35C]/15 text-[#E6B35C] shadow-[inset_0_0_0_1px_rgba(230,179,92,0.25)]"
                      : "fl-nav__idle text-gray-300 hover:bg-white/5 hover:text-[#E6B35C]"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Auth */}
            <div className="fl-nav__actions flex items-center gap-2">
            <ColorModeButton />
            <div className="fl-nav__auth relative hidden lg:flex items-center gap-3">
              {!user ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="fl-nav__login rounded-full px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="fl-nav__register rounded-xl bg-linear-to-r from-[#E6B35C] to-[#F7CF75] px-5 py-2 text-sm font-bold text-black shadow-[0_10px_28px_rgba(230,179,92,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(230,179,92,0.45)]"
                  >
                    Register
                  </button>
                </>
              ) : (
                <div className="fl-nav__profile relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="fl-nav__profile-trigger flex items-center gap-3 rounded-full border border-[#E6B35C]/25 bg-[#E6B35C]/10 px-3 py-2 text-[#E6B35C] transition hover:bg-[#E6B35C]/15"
                  >
                    <span className="fl-nav__avatar grid h-8 w-8 place-items-center rounded-full bg-[#E6B35C] text-sm font-black text-black">
                      {(user?.name || user?.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>

                    <span className="fl-nav__greeting max-w-27.5  truncate text-sm font-bold">
                      Hi, {user?.name?.split(" ")[0] || "User"}
                    </span>

                    <span
                      className={`text-xs transition ${profileOpen ? "rotate-180" : ""
                        }`}
                    >
                      ▼
                    </span>
                  </button>

                  {profileOpen && (
                    <div className="fl-nav__profile-menu absolute right-0 mt-4 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#07101b]/95 p-2 text-sm shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                      <button
                        type="button"
                        onClick={() => navigate("/bookings")}
                        className="fl-nav__menu-action block w-full rounded-xl px-4 py-3 text-left font-semibold text-gray-200 transition hover:bg-white/7 hover:text-[#E6B35C]"
                      >
                        My Bookings
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="fl-nav__menu-action fl-nav__logout block w-full rounded-xl px-4 py-3 text-left font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="fl-mobile-navigation"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="fl-nav__menu-toggle grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-[#E6B35C]/15 hover:text-[#E6B35C] lg:hidden"
            >
              {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            id="fl-mobile-navigation"
            className="fl-nav__mobile-menu
  mt-2
  max-h-[calc(100dvh-82px)]
  overflow-y-auto
  overscroll-contain
  touch-pan-y
  rounded-[20px]
  border border-white/10
  bg-[#06111d]/97
  p-2.5
  pb-[calc(env(safe-area-inset-bottom)+10px)]
  text-gray-200
  shadow-[0_20px_55px_rgba(0,0,0,0.58)]
  backdrop-blur-2xl
  [-webkit-overflow-scrolling:touch]
  lg:hidden
"
          >
            <div className="fl-nav__mobile-brand mb-2.5 rounded-xl border border-[#E6B35C]/15 bg-[#E6B35C]/8 px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="fl-nav__mobile-brand-name text-[11px] font-bold uppercase tracking-[0.22em] text-[#E6B35C]">
                    FlyingLyte
                  </p>

                  <p className="fl-nav__secondary mt-0.5 text-[11px] leading-4 text-gray-400">
                    Explore • Book • Travel
                  </p>
                </div>

                <span className="fl-nav__mark text-base text-[#E6B35C]">
                  ✦
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">

              {navLinks.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  aria-current={isActive(item.path) ? "page" : undefined}
                  // onClick={() => {
                  //   if (item.name === "Hotels") {
                  //     handleReloadNavigate("/", {
                  //       searchTab: "hotels",
                  //     });
                  //   } else {
                  //     handleReloadNavigate(item.path);
                  //   }
                  // }}


                  onClick={() => {
                    handleReloadNavigate(item.path);
                  }}
                  className={`fl-nav__mobile-link group flex min-h-10 items-center justify-between rounded-xl border px-3.5 py-2 text-left text-[13px] font-semibold transition-all duration-200 ${isActive(item.path)
                    ? "fl-nav__active border-[#E6B35C]/60 bg-[#E6B35C] text-black shadow-[0_6px_18px_rgba(230,179,92,0.18)]"
                    : "fl-nav__idle border-white/5 bg-white/[0.035] text-gray-200 hover:border-[#E6B35C]/20 hover:bg-white/[0.07] hover:text-[#E6B35C]"
                    }`}
                >
                  {item.name}
                  <span className="text-sm opacity-70 transition-transform duration-200 group-hover:translate-x-0.5">
                    ›
                  </span>
                </button>
              ))}
            </div>

            <div className="fl-nav__divider my-2.5 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="fl-nav__login fl-nav__login--mobile rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="fl-nav__register rounded-xl bg-linear-to-r from-[#E6B35C] to-[#F7CF75] px-4 py-2.5 text-sm font-bold text-black shadow-[0_10px_28px_rgba(230,179,92,0.3)]"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="fl-nav__mobile-account space-y-3">
                <div className="fl-nav__mobile-user flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                  <span className="fl-nav__avatar fl-nav__avatar--mobile grid h-10 w-10 place-items-center rounded-full bg-[#E6B35C] font-black text-black">
                    {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                  </span>

                  <div className="min-w-0">
                    <p className="fl-nav__user-name truncate text-sm font-bold text-[#E6B35C]">
                      {user?.name || "User"}
                    </p>
                    <p className="fl-nav__secondary truncate text-xs text-gray-400">
                      {user?.email || "Welcome back"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/bookings")}
                  className="fl-nav__menu-action fl-nav__bookings block w-full rounded-2xl bg-[#E6B35C]/10 px-4 py-3 text-left text-sm font-semibold text-[#E6B35C] transition hover:bg-[#E6B35C]/15"
                >
                  My Bookings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="fl-nav__menu-action fl-nav__logout block w-full rounded-2xl bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/15"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
