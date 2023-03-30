import React from "react";
import avatar from "../../assets/img/icons/avatar.svg";
import owner from "../../assets/img/icons/Owner.svg";

function OwnerCard({ firstname, lastname, username, descripcion, }) {

  return ( 
    
      <div className="divColl_1">
       <img className="avatarcoll"
                  src={avatar}
                  alt="Logo de TreeUp"
                   />
        <div className="divColl_2">
          <h6 className="divColl_3"> {firstname} {lastname}</h6>
          <p className="divColl_4">{descripcion}</p> 
        </div>
        <div className="divColl_11"> 
          <img className=""
                  src={owner}
                  alt="Logo de TreeUp"
                  width={11} />
        </div>
      </div>
    
  );
}

export default OwnerCard;