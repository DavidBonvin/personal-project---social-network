import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { URL_HOME, URL_PROJECT_UPDATE } from "../../constants/urls/urlFrontEnd";
import {
	selectIsLogged,
	selectUser,
} from "../../redux-store/authenticationSlice";

import Button from "../../components/Base/ButtonBis";
import CollaboratorCard2 from "../../components/Project/CollaboratorCard2";
import CommentsContainer from "../../components/Project/CommentsContainer";
import ConfirmPopup from "../../components/base/ConfirmPopup";
import LikeButton from "../../components/Project/LikeButton";
import { URL_BACK_PROJECT } from "../../constants/urls/urlBackEnd";
import apiGateway from "../../api/backend/apiGateway";
import { getProjectLogged } from "../../api/backend/project.js";
import { getToken } from "../../services/tokenServices";
import { useSelector } from "react-redux";

function Project() {
  const nav = useNavigate();
  const { uuid } = useParams();
  const isLoggued = useSelector(selectIsLogged);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState();
	const user = useSelector(selectUser);

  const [project, setProject] = useState({
    uuid: "",
    name: "",
    date_start: "",
    date_end: "",
    description: "",
    countLikes: 0,
    liked: false,
  });

  //dave
  const [collaborators, setCollaborators] = useState([]);
  const [owners, setOwners] = useState([]);
  const [ownersID, setOwnersID] = useState([]);
  const [collaboratorsID, setCollaboratorsID] = useState([]);

  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    isLoggued
      ? getProjectLogged(uuid)
          .then(({ data }) => setProject(data))
          .catch(() => nav(URL_HOME))
      : apiGateway
          .get("/project/" + uuid)
          .then(({ data }) => setProject(data))
          .catch(() => nav(URL_HOME));
  }, [isLoggued]);

  useEffect(() => {
    apiGateway
      .get("/collaborators/project/" + uuid)
      .then(({ data }) => {
        const { owners, collaborators } = data;

        Promise.all(
          collaborators.map((collaboratorId) =>
            apiGateway.get(`/users/${collaboratorId}`, config)
          )
        ).then((responses) => {
          const collaboratorsData = responses.map((response) => response.data);
          setCollaborators(collaboratorsData);
        });
        Promise.all(
          owners.map((ownerId) => apiGateway.get(`/users/${ownerId}`, config))
        ).then((responses) => {
          const ownersData = responses.map((response) => response.data);
          setOwners(ownersData);
        });
      })
      .catch(() => nav(URL_HOME));
  }, []);

  const collaboratorsWithoutOwners = collaborators.filter(
    (collaborator) =>
      !owners.some((owner) => owner.user.uuid === collaborator.user.uuid)
  );

  const removeProject = () => {
    apiGateway.delete(URL_BACK_PROJECT + "/" + uuid, config)
    .then(() => {
      nav(URL_HOME); 
      setShowDeletePopup(false);
    }).catch((err) => {
      console.log(err.response.data);
      setErrorPopup(err.response ? err.response.data.message : err.message);
    });
  };

  return (
    <div className="items-center gap-4 p-2 bg-gray-1 rounded-md">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl">{project.name}</h1>
          <h3 className="text-xs">
            {project.date_start.slice(0, project.date_start.indexOf("T"))}
            {project.date_end
              ? " - " +
                project.date_end.slice(0, project.date_start.indexOf("T"))
              : ""}
          </h3>
        </div>
        <div>
          <LikeButton
            isLogged={isLoggued}
            project={project}
            setProject={setProject}
          />
        </div>
      </div>
      <div>
        <h2 className="text-2xl underline">Description du projet</h2>
        <p className="text-base break-words">{project.description}</p>
      </div>
      <div className="containerCollaboratorProject  overflow-x-auto">
        {owners.map((item) => (
          <CollaboratorCard2
            key={item.user.uuid}
            uuid={item.user.uuid}
            firstname={item.user.firstname}
            lastname={item.user.lastname}
            username={item.user.username}
            descripcion={item.user.profile.descripcion}
          />
          
        ))}

        {collaboratorsWithoutOwners.map((item) => (
          <CollaboratorCard2
            key={item.user.uuid}
            uuid={item.user.uuid}
            firstname={item.user.firstname}
            lastname={item.user.lastname}
            username={item.user.username}
            descripcion={item.user.profile.descripcion}
          />
        ))}
      </div>

      <CommentsContainer uuid_project={uuid} />
      {isLoggued && owners[0]?.user.uuid === user?.uuid ? (
        <div className="flex justify-center">
          <Button 
            title="Demande de suppression" 
            onClick={() => setShowDeletePopup(true)} 
            className="mr-3"
          />
          <Link to={URL_PROJECT_UPDATE + uuid}>
            <Button title="Mettre à jour"></Button>
          </Link>
        </div>
      ) : (
        ""
      )}
      <ConfirmPopup 
        body={
          <>
            <h3 className="h3 text-center">Supprimer le projet</h3>
            <p className="text-center">Êtes-vous sur ?</p>
          </>
        }
        show={showDeletePopup}
        yesAction={removeProject}
        noAction={() => setShowDeletePopup(false)}
        error={errorPopup}
      />
    </div>
  );
}

export default Project;
