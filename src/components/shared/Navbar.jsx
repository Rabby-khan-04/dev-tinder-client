import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { removeUser } from "../../utils/userSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const Navbar = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      if (res.status === 200) {
        dispatch(removeUser());
        toast.success("User logged out!!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!");
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <Link to="/" className="btn text-xl">
          🖥️ DevTinder
        </Link>
      </div>
      <div className="navbar-end space-x-3">
        {user ? (
          <>
            <div>
              <h4>Welcome, {user.fullName}</h4>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.fullName || "avatar"}
                    src={
                      user?.photo ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
