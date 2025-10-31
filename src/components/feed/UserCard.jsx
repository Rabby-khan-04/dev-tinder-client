const UserCard = ({ user }) => {
  const { fullName, photo, age, gender, bio, skills } = user;
  return (
    <div
      className="card bg-base-200 w-96 shadow-sm
    //  h-[calc(100vh-200px)]
     "
    >
      <figure className="relative">
        <img src={photo} alt={fullName} className="w-full" />
        <span className="badge absolute right-5 top-5">{gender}</span>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fullName}</h2>
        <p>
          {bio ||
            `Hi there, my name is ${fullName}. I am ${age} years old. I am developer. My skills are ${
              skills.join(", ") || "React, Node, Mongodb, Express"
            }`}
        </p>
        <div className="card-actions justify-center">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
