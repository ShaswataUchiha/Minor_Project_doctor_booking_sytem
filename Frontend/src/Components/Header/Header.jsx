import { useEffect, useRef, useState, useContext } from "react";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import { authContext } from "../../context/authContext.jsx";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      className="header flex items-center transition-all duration-300 ease-in-out z-50 relative bg-white shadow-md"
      ref={headerRef}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="logo flex items-center gap-2">
            <span className="text-3xl font-bold text-primaryColor">
              <span className="text-secondaryColor">Health</span>Care
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="navigation hidden md:block">
            <ul className="menu flex items-center gap-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] font-bold underline"
                        : "text-gray-600 text-[16px] font-medium hover:text-primaryColor transition-colors duration-200"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Right */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[40px] h-[40px] rounded-full cursor-pointer overflow-hidden hidden md:block border-2 border-primaryColor">
                    <img
                      src={user?.photo}
                      className="w-full h-full object-cover"
                      alt="User"
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/Login">
                <button className="bg-primaryColor py-2 px-6 text-white font-medium h-[44px] flex items-center justify-center rounded-[50px] shadow-lg hover:shadow-xl hover:shadow-secondaryColor/50 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2">
                  Login
                </button>
              </Link>
            )}

            {/* Hamburger Menu */}
            <span
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <BiX className="w-8 h-8 cursor-pointer text-primaryColor hover:rotate-180 transition-transform duration-300" />
              ) : (
                <BiMenu className="w-8 h-8 cursor-pointer text-primaryColor hover:rotate-180 transition-transform duration-300" />
              )}
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-10"
              onClick={toggleMenu}
            ></div>
            <div className="fixed top-0 right-0 w-[80%] h-full bg-white shadow-lg py-6 px-4 z-20 transform transition-transform duration-300">
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-primaryColor">
                  HealthCare
                </span>
                <BiX
                  className="w-8 h-8 cursor-pointer text-primaryColor transition-transform duration-300"
                  onClick={toggleMenu}
                />
              </div>
              <ul className="flex flex-col items-start gap-6">
                {navLinks.map((link, index) => (
                  <li key={index} className="w-full">
                    <NavLink
                      to={link.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "text-primaryColor text-[18px] font-bold"
                          : "text-gray-600 text-[18px] font-medium hover:text-primaryColor transition-colors duration-200"
                      }
                      onClick={toggleMenu}
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link to="/Login">
                  <button className="w-full bg-primaryColor text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
