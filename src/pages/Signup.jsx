import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import validator from "validator";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const photo = e.target.photo.value;
    const gender = e.target.gender.value;
    const age = e.target.age.value;

    if (!validator.isStrongPassword(password))
      return toast.error("Use a strong password!!");

    try {
      const res = await axiosInstance.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        photo,
        gender,
        age: parseInt(age),
      });

      if (res.status === 201) {
        dispatch(addUser(res.data?.data));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };
  return (
    <div className="hero min-h-[calc(100vh-52px-64px)]">
      <div className="bg-base-200 w-full max-w-lg shadow-2xl p-8 rounded-xl">
        <div className=" space-y-4">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <form className="fieldset" onSubmit={handleLogin}>
            <label className="label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="input w-full block"
              placeholder="First Name"
              required
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="input w-full block"
              placeholder="Last Name"
              required
            />
            <label className="label">Age</label>
            <input
              type="number"
              name="age"
              className="input w-full block"
              placeholder="Age"
              required
            />
            <label className="label">Photo URL</label>
            <input
              type="url"
              name="photo"
              className="input w-full block"
              placeholder="Photo URL"
            />
            <label className="label">Gender</label>
            <select
              defaultValue="Gender"
              name="gender"
              className="select w-full"
              required
            >
              <option disabled={true}>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full block"
              placeholder="Email"
              required
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input w-full block"
              placeholder="Password"
              required
            />

            <button className="btn btn-neutral mt-4">Sign up</button>
          </form>

          <div>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="font-semibold text-secondary" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
