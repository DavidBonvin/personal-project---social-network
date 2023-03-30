import React from "react";
import avatar from "../../assets/img/icons/avatar.svg";
import collaboratorSVG from "../../assets/img/icons/Collaborator.svg";
import cross from "../../assets/img/icons/Cross.svg"

function CollaboratorCard({ firstname, lastname, username, descripcion, onDelete }) {

  return ( 
    <div className="divColl_1">
     
        <img className="avatarcoll"
                  src={avatar}
                  alt="Logo de TreeUp"
                   />
        <div className="divColl_2">
          <div className="divColl_3"> {firstname} {lastname}</div>
          <div className="divColl_4">{descripcion}</div> 
        </div>
        <div className="divColl_5"> 
          <button className="" type="button" onClick={onDelete}><img src={cross} alt="x" /></button>
          <img className=""
                  src={collaboratorSVG}
                  alt="Logo de TreeUp"
                  width={11} />
        </div>
      </div>
    
  );
}

export default CollaboratorCard;