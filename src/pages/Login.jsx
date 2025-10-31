import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import validator from "validator";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email) toast.error("Email is required");
    if (!password) toast.error("Password is required");

    if (!validator.isEmail(email)) return toast.error("Invalid Email!!");
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      if (res.data) {
        dispatch(addUser(res.data?.data));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong!!"
      );
    }
  };

  return (
    <div className="hero min-h-[calc(100vh-52px-64px)]">
      <div className="bg-base-200 w-full max-w-lg shadow-2xl p-8 rounded-xl">
        <div className=" space-y-4">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <form className="fieldset" onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full block"
              placeholder="Email"
              defaultValue={"ajrabbyk72@gmail.com"}
              required
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input w-full block"
              placeholder="Password"
              required
              defaultValue={"$Rabby12345"}
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>

          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link className="font-semibold text-secondary" to="/signup">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
