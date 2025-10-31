import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { getConnections } from "../utils/connectionSlice";
import Spinner from "../components/shared/Spinner";
import ConnectionsCard from "../components/Connections/ConnectionsCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections.data);
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axiosInstance.get("/user/connections");
        if (res.data?.data) {
          dispatch(getConnections(res.data.data));
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

  if (!connections) return <Spinner />;

  return connections.length ? (
    <div>
      <h1 className="text-4xl text-primary text-center mb-10">Connections</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        {connections.map((connection) => (
          <ConnectionsCard key={connection._id} user={connection} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-[calc(100vh-52px-64px)]">
      <h2 className="text-5xl text-primary">No Data To show</h2>
    </div>
  );
};

export default Connections;
