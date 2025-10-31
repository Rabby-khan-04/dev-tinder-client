import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import InfoItem from "../components/profile/InfoItem";
import { useState } from "react";
import InputField from "../components/profile/InputField";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    photo: user?.photo,
    firstName: user?.firstName,
    lastName: user?.lastName,
    age: user?.age,
    bio: user?.bio,
    skills: user?.skills.join(", "),
  });

  if (!user) return <Spinner />;
  const {
    photo,
    firstName,
    lastName,
    gender,
    age,
    bio,
    skills = [],
    email,
    createdAt,
  } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updatedUser = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    };

    try {
      const res = await axiosInstance.patch("/profile/edit", updatedUser);
      if (res.data?.data) {
        dispatch(addUser(res.data?.data));
        toast.success(res.data?.message);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong!!"
      );
      console.error(err);
    }

    setIsModalOpen(false);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  return (
    <div className="mx-auto max-w-7xl p-4 pb-20 md:p-6 md:pb-6">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Profile
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <a
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                href="/"
              >
                Home
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="text-sm text-gray-800 dark:text-white/90">
              Profile
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-base-100 shadow-sm">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
          Profile
        </h3>

        {/* Top Profile Section */}
        <div className="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
              {/* Profile Photo */}
              <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                <img
                  src={photo}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + Info */}
              <div className="text-center xl:text-left">
                <h4 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
                  {firstName} {lastName}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {gender}, {age} years old
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
                Personal Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <InfoItem label="First Name" value={firstName} />
                <InfoItem label="Last Name" value={lastName} />
                <InfoItem label="Email" value={email} />
                <InfoItem label="Gender" value={gender} />
                <InfoItem label="Age" value={`${age}`} />
                <InfoItem label="Member Since" value={formatDate(createdAt)} />
                <InfoItem label="Bio" value={bio} />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.length ? (
                    skills.map((skill, index) => (
                      <div key={index} className="badge badge-primary badge-lg">
                        {skill}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No skills listed</p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-outline btn-sm rounded-full"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <dialog
          open
          className="modal modal-bottom sm:modal-middle backdrop-blur"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

            <div className="space-y-3">
              <InputField
                label="Photo URL"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
              />
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <InputField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              <InputField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
              <InputField
                label="Skills (comma separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="modal-action">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
