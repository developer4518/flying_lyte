import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "/images/flying_logo.png";
import { useAuthStore } from "../../store/authStore";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
  { name: "Flights", path: "/flights" },
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
    const handleScroll = () => setScrolled(window.scrollY > 60);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const navWrapperStyle = scrolled
    ? "bg-[#06111d]/90 border-white/15 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
    : "bg-[#06111d]/75 border-white/10 shadow-[0_16px_45px_rgba(0,0,0,0.25)]";

  return (
    <nav className="fixed inset-x-0 top-2 md:top-4 z-50 transition-all duration-300">
      <div className="mx-auto w-[94%] max-w-7xl">
        <div
          className={`relative overflow-visible rounded-3xl md:rounded-full border px-4 py-1.5 md:px-6 md:py-2 backdrop-blur-2xl transition-all duration-300 ${navWrapperStyle}`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[28px] md:rounded-full bg-[radial-gradient(circle_at_15%_20%,rgba(230,179,92,0.18),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.08),transparent_24%)]" />

          <div className="relative flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group flex items-center"
              aria-label="Go to home"
            >
              <img
                src={logo}
                alt="FlyingLyte"
                className="h-10 w-auto max-w-38.75 select-none object-contain drop-shadow-[0_10px_20px_rgba(230,179,92,0.18)] transition duration-300 group-hover:scale-[1.03] md:h-12 md:max-w-52.5"
              />
            </button>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative block rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-[#E6B35C]/15 text-[#E6B35C] shadow-[inset_0_0_0_1px_rgba(230,179,92,0.25)]"
                        : "text-gray-300 hover:bg-white/5 hover:text-[#E6B35C]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Auth */}
            <div className="relative hidden lg:flex items-center gap-3">
              {!user ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="rounded-xl bg-linear-to-r from-[#E6B35C] to-[#F7CF75] px-5 py-2 text-sm font-bold text-black shadow-[0_10px_28px_rgba(230,179,92,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(230,179,92,0.45)]"
                  >
                    Register
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="flex items-center gap-3 rounded-full border border-[#E6B35C]/25 bg-[#E6B35C]/10 px-3 py-2 text-[#E6B35C] transition hover:bg-[#E6B35C]/15"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#E6B35C] text-sm font-black text-black">
                      {(user?.name || user?.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>

                    <span className="max-w-27.5  truncate text-sm font-bold">
                      Hi, {user?.name?.split(" ")[0] || "User"}
                    </span>

                    <span
                      className={`text-xs transition ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-4 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#07101b]/95 p-2 text-sm shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                      <button
                        type="button"
                        onClick={() => navigate("/bookings")}
                        className="block w-full rounded-xl px-4 py-3 text-left font-semibold text-gray-200 transition hover:bg-white/7 hover:text-[#E6B35C]"
                      >
                        My Bookings
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full rounded-xl px-4 py-3 text-left font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
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
              onClick={() => setMenuOpen((prev) => !prev)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-[#E6B35C]/15 hover:text-[#E6B35C] lg:hidden"
            >
              {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-3 overflow-hidden rounded-[26px] border border-white/10 bg-[#06111d]/95 p-4 text-gray-200 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:hidden">
            <div className="mb-4 rounded-2xl border border-[#E6B35C]/15 bg-[#E6B35C]/10 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E6B35C]">
                FlyingLyte
              </p>
              <p className="mt-1 text-sm text-gray-300">
                Explore flights, packages and bookings.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    isActive(item.path)
                      ? "bg-[#E6B35C] text-black"
                      : "bg-white/4 text-gray-200 hover:bg-white/8 hover:text-[#E6B35C]"
                  }`}
                >
                  {item.name}
                  <span className="text-base">›</span>
                </button>
              ))}
            </div>

            <div className="my-4 h-px bg-white/10" />

            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="rounded-2xl bg-linear-to-r from-[#E6B35C] to-[#F7CF75] px-4 py-3 text-sm font-bold text-black shadow-[0_10px_28px_rgba(230,179,92,0.3)]"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E6B35C] font-black text-black">
                    {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#E6B35C]">
                      {user?.name || "User"}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {user?.email || "Welcome back"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/bookings")}
                  className="block w-full rounded-2xl bg-[#E6B35C]/10 px-4 py-3 text-left text-sm font-semibold text-[#E6B35C] transition hover:bg-[#E6B35C]/15"
                >
                  My Bookings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-2xl bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/15"
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
