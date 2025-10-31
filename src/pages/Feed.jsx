import { useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../utils/feedSlice";
import UserCard from "../components/feed/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.data);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axiosInstance.get("/user/feed");
        if (res.data?.data) dispatch(addFeedData(res.data.data));
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Something went wrong!!"
        );
        console.error(err);
      }
    };

    if (!feed.length) fetchFeed();
  }, [dispatch, feed]);

  return feed.length ? (
    <div className="flex items-center justify-center w-full h-[calc(100vh-52px-64px)]">
      <UserCard user={feed[0]} />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-[calc(100vh-52px-64px)]">
      <h2 className="text-5xl text-primary">No Data To show</h2>
    </div>
  );
};

export default Feed;
