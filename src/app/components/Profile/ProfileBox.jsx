import React from "react";

const ProfileBox = ({ name, date, location, description }) => (
  <div className="bg-white rounded-lg mx-5 p-5">
    <div className="flex justify-between">
      <p className="text-xl font-bold">{name}</p>
      {date && <p className="text-xs">{date}</p>}
    </div>
    {location && <p className="text-xs">{location}</p>}
    <hr className="my-2" />
    <p className="font-bold">Description</p>
    <p className="text-sm">{description}</p>
  </div>
);

export default ProfileBox;
