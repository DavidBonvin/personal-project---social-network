import React from "react";

const PillTechnologie = ({ technologie }) => {
  const { name, image } = technologie;

  return (
    <div
      className="flex rounded-xl border-gradient-v border-2 gap-2 p-1 mx-1"
    >
      <img src={image} alt={name} width={24} />
      <span>{name}</span>
    </div>
  );
};

export default PillTechnologie;
