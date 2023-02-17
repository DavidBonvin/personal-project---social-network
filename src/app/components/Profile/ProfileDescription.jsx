import Button from "../Base/Button";
import { Link } from "react-router-dom";
import React from "react";
import { URL_EDITPROFILE } from "../../constants/urls/urlFrontEnd";
import { UserCircleIcon } from "@heroicons/react/solid";

export default function ProfileDescription({ username, job, description }) {
  return (
    <div className="flex p-5">
      <div className="flex flex-col w-1/4">
        <UserCircleIcon />
        <p className="text-center">{username}</p>
        <p className="text-center mt-1">{job}</p>
        <Link to={URL_EDITPROFILE}>
          <Button className="mt-3" title="Editer mon profil" />
        </Link>
      </div>
      <div className="border-2 border-red-500 flex flex-col ml-5 rounded-md pb-5">
        <p className="text-center">Description</p>
        <p className="pt-5">{description}</p>
      </div>
    </div>
  );
}
