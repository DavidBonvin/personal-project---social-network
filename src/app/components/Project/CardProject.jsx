import { Link } from "react-router-dom";
import PillTechnologie from "../Technos/PillTechnologie";
import React from "react";

const CardProject = ({ project }) => {
  const { uuid, name, type, description, collaborator, technologies, image } =
    project;
  return (
    <Link to={"project/" + uuid}>
      <article className="max-w-md h-full rounded-2xl bg-gray-1 border-gradient-h border-0 hover:border-2 active:shadow-2xl">
        <img
          className="w-full rounded-t-2xl"
          src={image}
          alt="Projet"
          loading="lazy"
        />

        <div className="flex flex-col gap-3 p-3">
          <div>
            <h4 className="text-2xl">{name}</h4>
            <h6 className="text-sm text-gray-400">Type de project : {type}</h6>
          </div>
          <div>
            <h5 className="text-sm font-bold">Description</h5>
            <p>{description.slice(0, 150)}...</p>
          </div>
          <hr className="border-dark" />
          <div>
            <h5 className="text-sm font-bold">Collarateurs</h5>
            <p>{collaborator}</p>
          </div>
          <div className="flex">
            {technologies.map((technologie) => (
              <PillTechnologie
                key={technologie.uuid}
                technologie={technologie}
              />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CardProject;
