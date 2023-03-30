import { Link } from "react-router-dom";
import React from "react";
import { URL_PROFILE2 } from "../../constants/urls/urlFrontEnd";
import avatar from "../../assets/img/icons/avatar.svg";

function CollaboratorCard2({ firstname, lastname, username, descripcion, uuid }) {

  return ( 
   <Link to={URL_PROFILE2 + uuid} >
    <div className="divColl_6 ">
      
        <img className="divColl_7 "
                  src={avatar}
                  alt="Logo de TreeUp"
                  />
        <div className="divColl_8">
          <div className="divColl_9 "> {firstname} {lastname}</div>
          <div className="divColl_10">{descripcion}</div> 
        </div>
        	
      </div>
      	</Link>
  );
}

export default CollaboratorCard2;