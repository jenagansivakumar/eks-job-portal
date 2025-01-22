import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-gray-100">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-gray-400">
            EmployEye
          </Link>
        </div>

        <div className="space-x-4">
          <Link
            to="/auth/login"
            className={`hover:text-gray-400 ${
              location.pathname === "/auth/login" ? "text-blue-400" : ""
            }`}
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className={`hover:text-gray-400 ${
              location.pathname === "/auth/signup" ? "text-blue-400" : ""
            }`}
          >
            Sign Up
          </Link>
          <Link
            to="/jobs/create"
            className={`hover:text-gray-400 ${
              location.pathname === "/jobs/create" ? "text-blue-400" : ""
            }`}
          >
            Create Job
          </Link>
          <Link
            to="/jobs/display"
            className={`hover:text-gray-400 ${
              location.pathname === "/jobs/display" ? "text-blue-400" : ""
            }`}
          >
            View Jobs
          </Link>
        </div>
      </div>
    </nav>
  );
};
