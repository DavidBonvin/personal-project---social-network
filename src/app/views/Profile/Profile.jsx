import "./Scrollbar.css";

import ProfileBox from "../../components/Profile/ProfileBox";
import ProfileDescription from "../../components/Profile/ProfileDescription";
import ProfileProject from "../../components/Profile/ProfileProject";
import React from "react";
import SoftSkillsData from "../../fakeData/SoftSkillsData";
import boxData from "../../fakeData/BoxData";
import profileData from "../../fakeData/ProfileData";

export default function Profile() {
  const singleProfileData = profileData[0];
  return (
    <div className="bg-[#ececec] justify-center flex-col">
      <ProfileDescription
        key={singleProfileData.fakeid}
        username={singleProfileData.username}
        job={singleProfileData.job}
        description={singleProfileData.description}
      />
      <p className="text-center my-5">Liste des technos</p>
      <p className="text-center my-5">Mes expériences</p>
      <div className="flex flex-wrap h-64 overflow-auto example">
        {boxData.map((item) => (
          <div className="w-1/2 p-2" key={item.id}>
            <ProfileBox {...item} />
          </div>
        ))}
      </div>
      <p className="text-center my-5">Mes SoftSkills</p>
      <div className="flex flex-wrap h-64 overflow-auto example">
        {SoftSkillsData.map((item) => (
          <div className="w-1/2 p-2" key={item.id}>
            <ProfileBox {...item} />
          </div>
        ))}
      </div>
      <p className="text-center my-5">Mes projets</p>
      <ProfileProject />
    </div>
  );
}
