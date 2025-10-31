import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { getRequests } from "../utils/requestsSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Spinner from "../components/shared/Spinner";
import RequestsCard from "../components/Connections/RequestsCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.data);
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axiosInstance.get("/user/requests/received");
        if (res.data?.data) {
          dispatch(getRequests(res.data.data));
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Something went wrong!!"
        );
        console.error(err);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (!requests) return <Spinner />;

  console.log(requests);

  return requests.length ? (
    <div>
      <h1 className="text-4xl text-primary text-center mb-10">Requests</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        {requests.map((request) => (
          <RequestsCard
            key={request._id}
            user={request.fromUserId}
            requestId={request._id}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-[calc(100vh-52px-64px)]">
      <h2 className="text-5xl text-primary">No Data To show</h2>
    </div>
  );
};

export default Requests;
