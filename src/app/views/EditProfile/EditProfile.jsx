import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfileBoxEdit from "../../components/EditProfile/ProfileBoxEdit";
import ProfileUser from "../../components/EditProfile/ProfileUserEdit";
import ModalNewExperience from "../../components/EditProfile/ModalNewExperience";
import ModalNewSoftSkills from "../../components/EditProfile/ModalNewSoftSkill";
import { URL_BACK_GET_PROFILE } from "../../constants/urls/urlBackEnd";
import apiGateway from '../../api/backend/apiGateway';
import { getProfileEdit } from '../../api/backend/profile';

export default function EditProfile() {
  const expTitle = "Ajouter une expérience ";
  const softTitle = "ajouter un soft skill";
  const [user, setUser] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [soft_skills, setSoft_skills] = useState([])
  const { uuid } = useParams();



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProfileEdit();
        const userData = response.data;
        setUser({
          ...userData,
          experience: userData?.experience ?? [],
          soft_skill: userData?.soft_skill ?? []
        });
        setExperiences(response.data.experience ? response.data.experience : []);
        setSoft_skills(response.data.soft_skill ? response.data.soft_skill : []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [uuid]);

  const handleDeleteExperience = (uuid) => {
    const currentUserData = user;
    const foundExperience = currentUserData.experience.findIndex((exp) => exp.uuid === uuid);
    if (foundExperience >= 0) {
      currentUserData.experience.splice(foundExperience, 1);
      setUser(currentUserData);
      setExperiences([...currentUserData.experience]);
    }
  }

  const handleAddExperience = (exp) => {
    const currentUserData = user;
    currentUserData.experience.push(exp);
    setUser(currentUserData);
    setExperiences([...currentUserData.experience]);
  }

  const handleDeleteSoft_skill = (uuid) => {
    const currentUserData = user;
    const foundSoft_skill = currentUserData.soft_skill.findIndex((exp) => exp.uuid === uuid);
    if (foundSoft_skill >= 0) {
      currentUserData.soft_skill.splice(foundSoft_skill, 1);
      setUser(currentUserData);
      setSoft_skills([...currentUserData.soft_skill]);
    }
  }

  const handleAddSoft_skill = (soft) => {
    const currentUserData = user;
    currentUserData.soft_skill.push(soft);
    setUser(currentUserData);
    setSoft_skills([...currentUserData.soft_skill]);
  }

  return (
    <div className="bg-[#ececec] justify-center flex-col">
      <ProfileUser
        uuid_user={user.uuid}
        username={user?.username}
        work={user?.work}
        description={user?.description}
        date_birth={user?.date_birth}
        firstname={user?.firstname}
        lastname={user?.lastname}
        email={user?.email}
      />
      <p className="text-center my-5">Liste des technos</p>
      <div className="flex-col w-full items-center justify-center h-64 border-2 border-white overflow-auto scrollbar">
        <div className="flex flex-wrap justify-center w-full">
          {/* {technologies.map((items) => (
                <div className="w-1/3 p-2" key={items.uuid}>
                  <PillTechnologie {...items} />
                </div>
              ))} */}
        </div>
      </div>
      <p className="text-center text-4xl my-5">Mes expériences</p>
      <div className="flex flex-wrap h-64 overflow-auto scrollbar">
        {experiences?.map((item) => {
          item.exptitle = expTitle
          item.handleDelete = handleDeleteExperience
          return (
            <div className="w-1/2 p-2" key={item.uuid}>
              <ProfileBoxEdit {...item} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center">
        <ModalNewExperience handleAdd={handleAddExperience} />
      </div>
      <p className="text-center text-4xl my-5">Mes SoftSkills</p>
      <div className="flex flex-wrap h-64 overflow-auto scrollbar">
        {soft_skills?.map((item) => {
          item.softtitle = softTitle;
          item.handleDelete = handleDeleteSoft_skill
          return (
            <div className="w-1/2 p-2" key={item.uuid}>
              <ProfileBoxEdit {...item} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center">
        <ModalNewSoftSkills handleAdd={handleAddSoft_skill} />
      </div>
      <div className="pb-5">
        <p className="text-center my-5">Mes projets</p>
        {/* <ProfileProject /> */}
      </div>
    </div>
  )
}