import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Base/ButtonBis";
import CollaboratorCard from "../../components/Project/CollaboratorCard";
import ConfirmDelete2 from "../../components/Project/ConfirmDelete2";
import InputBis from "../../components/base/InputBis";
import { ModalAdd } from "../../components/Project/ModalAdd";
import OwnerCard from "../../components/Project/OwnerCard";
import TextArea from "../../components/base/TextArea";
import apiGateway from "../../api/backend/apiGateway";
import { getToken } from "../../services/tokenServices";
import { selectUser } from "../../redux-store/authenticationSlice";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import validationSchema from "../../utils/createProjectSchema";

export default function CreateProject({ isEditMode }) {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { uuid } = useParams();
  const token = getToken();
  //dave
  const [showModal, setShowModal] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [collaborators, setCollaborators] = useState([]);
  const [existingCollaborators, setExistingCollaborators] = useState([]);
  const [isCollaboratorsLoaded, setIsCollaboratorsLoaded] = useState(false);
  const [ownersids, setOwnersids] = useState([]);
  const [owners, setOwners] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedCollaboratorIndex, setSelectedCollaboratorIndex] =
    useState(null);
  const handleShowConfirmationModal = (index) => {
    setSelectedCollaboratorIndex(index);
    setShowConfirmationModal(true);
  };
  const handleDeleteCollaborator = () => {
    const newSelectedUsers = selectedUsers.filter(
      (item, i) => i !== selectedCollaboratorIndex
    );
    setSelectedUsers(newSelectedUsers);
    setShowConfirmationModal(false);
  };

  const handleModalClose = (selectedUsersModal) => {
    const selectedUserIds = [...selectedUsers];
    selectedUsersModal.forEach((user) => {
      if (!selectedUserIds.includes(user)) {
        selectedUserIds.push(user);
      }
    });
    setSelectedUsers(selectedUserIds);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (selectedUsers.length > 0) {
        const promises = selectedUsers.map(async (userId) => {
          const response = await apiGateway.get(`/users/${userId}`, config);
          return response.data;
        });
        const users = await Promise.all(promises);
        setCollaborators(users);
      } else {
        setCollaborators([]);
      }
    };
    fetchCollaborators();

    const fetchOwners = async () => {
      if (ownersids.length > 0) {
        const promises = ownersids.map(async (userId) => {
          const response = await apiGateway.get(`/users/${userId}`, config);
          return response.data;
        });
        const users = await Promise.all(promises);
        setOwners(users);
      } else {
        setOwners([]);
      }
    };
    fetchOwners();

    const fetchExistingCollaborators = async () => {
      const response = await apiGateway.get(`/collaborators/project/${uuid}`);

      if (response.data) {
        const { collaborators } = response.data;
        const { owners } = response.data;
        const existingCollaborators = Object.values(collaborators);

        setExistingCollaborators(existingCollaborators);
        setSelectedUsers(existingCollaborators);
        setOwnersids(owners);
        setIsCollaboratorsLoaded(true);
      }
    };

    if (isEditMode) {
      if (!isCollaboratorsLoaded) {
        fetchExistingCollaborators();
      }
      apiGateway
        .get("/project/" + uuid, config)
        .then(({ data: { name, date_start, date_end, description } }) => {
          const dateStart = date_start.slice(0, date_start.indexOf("T"));
          const dateEnd = date_end
            ? date_end.slice(0, date_end.indexOf("T"))
            : "";
          setValues({
            name,
            date_start: dateStart,
            date_end: dateEnd,
            description,
          });
        });
    }
  }, [selectedUsers, setExistingCollaborators, isEditMode, uuid]);

  const initialValues = {
    name: "",
    date_start: "",
    date_end: "",
    description: "",
  };

  const onSubmit = async (formValues) => {
    const { date_start, date_end } = formValues;
    if (date_end === "") {
      delete formValues.date_end;
    }

    let trimedValue = {};
    for (const key in formValues) {
      trimedValue[key] = formValues[key].trim();
    }
    
    if (new Date(0) > new Date(date_start)) {
      setError(
        "La date de creation du projet ne peut pas être antérieure à 1970."
      );
      return;
    }
    if (new Date(date_end) < new Date(date_start)) {
      setError(
        "Il est important de veiller à ce que la date de début du projet soit antérieure à la date de fin."
      );
      return;
    }
    if (Date.now() < new Date(date_start)) {
      setError(
        "Il est essentiel que la date de début du projet soit antérieure a la date d'aujourd'hui."
      );
      return;
    }
    try {
      /*   ? await apiGateway.put(`/project/update/${uuid}`, formValues, config)*/
      //   : await apiGateway.post("/project/create/", formValues, config);
      if (isEditMode) {
        let response = await apiGateway.put(
          `/project/update/${uuid}`,
          formValues,
          config
        );
        const allCollaborators = [...existingCollaborators, ...selectedUsers];

        const body = {
          project_uuid: response.data.uuid,
          collaborators: selectedUsers,
        };

        await apiGateway.post("/collaborators/update/", body);
        resetForm();
        navigate("/project/" + response.data.uuid);
      } else {
        let response = await apiGateway.post(
          "/project/create/",
          formValues,
          config
        );
        resetForm();
        navigate("/project/" + response.data.uuid);
        const body = {
          project_uuid: response.data.uuid,
          collaborators: selectedUsers,
        };
        await apiGateway.post("/collaborators/add/", body);
        
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(
          "Il est impossible de modifier un projet dont vous n'êtes pas le propriétaire"
        );
      } else {
        setError(error.response ? error.response.data.message : error.message);
      }
    }
  };

  const {
    handleSubmit,
    values,
    setValues,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    resetForm,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  
  const userConect = useSelector(selectUser);
  // useEffect(() => {
  //   if (userConect.uuid) {
     
  //   }
  // }, [userConect]);
  
  const collaboratorsWithoutOwners = collaborators.filter(
    (collaborator) =>
      !owners.some((owner) => owner.user.uuid === collaborator.user.uuid)
  );
  const uuidsAdd = collaboratorsWithoutOwners.map(collaborator => collaborator.user.uuid);

  return (
    <Fragment>
      <form className="p-3 bg-gray-1" onSubmit={handleSubmit}>
        <div className="flex justify-between my-3 pt-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nom du projet</label>
            <InputBis
              type="text"
              placeholder={isEditMode ? values.name : "Nom du projet"}
              name="name"
              value={values.name.replace(/\s+/g, " ")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <small className="error">{errors.name}</small>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date_start">Date de début</label>
            <InputBis
              type="date"
              name="date_start"
              value={values.date_start}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.date_start && errors.date_start && (
              <small className="error">{errors.date_start}</small>
            )}
            <label htmlFor="date_end">Date de fin</label>
            <InputBis
              type="date"
              name="date_end"
              value={values.date_end}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.date_end && errors.date_end && (
              <small className="error">{errors.date_end}</small>
            )}
          </div>
        </div>
        <button
          type="button"
          className="w-full sm:w-3/5 md:w-3/5 lg:w-2/6 my-3 border-gradient-v border-4 rounded-lg text-primary hover:text-white px-3 py-2"
          title="Ajouter des collaborateurs"
          onClick={() => setShowModal(true)}
        >
          Ajouter des collaborateurs
        </button>

        <div className="containerCollaboratorCreate overflow-x-auto">
          {owners.map((item, index) => (
            <OwnerCard
              key={item.user.uuid}
              firstname={item.user.firstname}
              username={item.user.username}
              lastname={item.user.lastname}
              descripcion={item.user.profile.descripcion}
            />
          ))}

          {collaboratorsWithoutOwners.map((item, index) => (
            <CollaboratorCard
              key={item.user.uuid}
              firstname={item.user.firstname}
              lastname={item.user.lastname}
              username={item.user.username}
              onDelete={() => handleShowConfirmationModal(index)}
              descripcion={item.user.profile.descripcion}
            />
          ))}
        </div>
        {showConfirmationModal && (
          <ConfirmDelete2
            setShowConfirmationModal={setShowConfirmationModal}
            handleDeleteCollaborator={handleDeleteCollaborator}
          />
        )}

        <TextArea
          placeholder={
            isEditMode ? values.description : "Description du projet"
          }
          className="w-full"
          rows={"10"}
          name="description"
          value={values.description.replace(/\s+/g, " ")}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.description && errors.description && (
          <small className="error">{errors.description}</small>
        )}
        {error && (
          <p className="error p-5 m-1 border-2 border-red-700 bg-white">
            {error}
          </p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex mx-auto mt-3"
          title={isEditMode ? "Modifier le projet" : "Créer le projet"}
        />
      </form>
      {userConect.uuid && (
        <ModalAdd
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          onClose1={handleModalClose}
          userConecte={userConect.uuid}
          userAdd= {uuidsAdd}
        />
      )}
    </Fragment>
  );
}
