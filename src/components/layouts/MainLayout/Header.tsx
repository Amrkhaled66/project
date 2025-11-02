import { Link } from "react-router-dom";
import Button from "src/components/ui/Button";
import GoastButton from "src/components/ui/GoastButton";
import { useState } from "react";
import { useAuth } from "src/context/auth.context";
import { ShoppingCart, User } from "lucide-react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/">
          <img className="w-32" src="./logo.svg" alt="JB Blanket" />
        </Link>

        {isAuthenticated ? (
          <div className="hidden items-center space-x-4 lg:flex">
            <Link to="/profile/cart">
              <ShoppingCart />
            </Link>
            <Link to="/profile" className="flex items-center space-x-2">
              <User />
              <span className="text-sm font-medium">John Doe</span>
            </Link>
          </div>
        ) : (
          <div className="hidden items-center space-x-4 lg:flex">
            <Link to="/login">
              <GoastButton className="w-[110px] py-1.5">Login</GoastButton>
            </Link>
            <Link to="/register">
              <Button className="w-[110px] py-1.5">Sign Up</Button>
            </Link>
          </div>
        )}

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 focus:outline-none lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-y-4 bg-white px-6 py-4 lg:hidden">
          <Link to="/login">
            <GoastButton className="w-full py-2">Login</GoastButton>
          </Link>
          <Link to="/register">
            <Button className="w-full py-2">Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
