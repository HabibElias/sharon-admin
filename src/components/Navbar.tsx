import { Link2 } from "lucide-react";
import Logo from "./Logo";
import Nav from "./Nav";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className={`border-b-2 backdrop-blur-lg "bg-white text-black" transition-colors duration-300`}
    >
      <div className="flex items-center justify-between px-10 py-2">
        {/* LOGO */}
        <Logo />
        {/* DRAWER */}

        {/* NAVIGATION */}
        <div className="hidden items-center space-x-6 md:inline-flex">
          <Nav />
          {/* login and contact us button icons */}
          <div className="inline-flex flex-wrap items-center gap-2 xl:hidden">
            <Button
              onClick={() => navigate("/join-us")}
              size={"icon"}
              className="text-bold group relative cursor-pointer items-center gap-2 border-2 border-blue-400 bg-transparent p-6 font-[poppins] text-[#0065ca] hover:bg-[#0065ca] hover:text-white"
            >
              <Link2 />
              <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-blue-600 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Join Us
              </span>
            </Button>
          </div>
        </div>

        {/* login and contact us buttons */}
        <div className="hidden flex-wrap items-center gap-3 xl:flex">
          {!isAuthenticated && (
            <Button
              onClick={() => navigate("/login")}
              className="text-bold cursor-pointer items-center gap-2 rounded-4xl border-2 border-[#0065ca8e] bg-[#0065ca]/80 p-6 font-[poppins] text-white hover:bg-[#0065ca]"
            >
              <div className="inline-flex items-center gap-2">
                Login
                <Link2 />
              </div>
            </Button>
          )}
          {isAuthenticated && (
            <Button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="text-bold cursor-pointer items-center gap-2 rounded-4xl border-2 border-red-600 bg-red-500/80 p-6 font-[poppins] text-white hover:bg-red-600"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
