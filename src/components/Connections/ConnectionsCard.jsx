const ConnectionsCard = ({ user }) => {
  const { fullName, bio, gender, age, photo } = user;
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
          <button className="btn btn-primary">Chat</button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsCard;
