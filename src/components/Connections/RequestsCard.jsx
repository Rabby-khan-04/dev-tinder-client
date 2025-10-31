import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { updateRequests } from "../../utils/requestsSlice";

const RequestsCard = ({ user, requestId }) => {
  const dispatch = useDispatch();
  const { fullName, bio, gender, age, photo, _id } = user;

  const reviewConnectionRequest = async (dicision) => {
    try {
      const res = await axiosInstance.post(
        `/connection/request/review/${dicision}/${requestId}`
      );

      if (res.data?.data) {
        dispatch(updateRequests(requestId));
        toast.success(res.data?.message);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong!!"
      );
      console.error(err);
    }
  };

  return (
    <div className="card card-side bg-base-200 shadow-sm">
      <figure>
        <img src={photo} alt={fullName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-semibold">{fullName}</h2>
        <p>{bio}</p>
        <p>Gender: {gender}</p>
        <p>Age: {age}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => reviewConnectionRequest("accepted")}
          >
            Accept
          </button>
          <button
            className="btn btn-error"
            onClick={() => reviewConnectionRequest("rejected")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestsCard;
