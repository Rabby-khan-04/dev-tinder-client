import { Outlet, useNavigate } from "react-router";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import axiosInstance from "./utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get("/profile/view");
        if (res.data?.data) {
          dispatch(addUser(res.data.data));
        }
      } catch (err) {
        if (err.status === 401) {
          navigate("/login");
        }
        console.error(err);
      }
    };
    if (!user) fetchUserData();
  }, [dispatch, navigate, user]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
