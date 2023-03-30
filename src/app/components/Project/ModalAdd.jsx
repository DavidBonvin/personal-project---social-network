import React, { useEffect, useState } from "react";
import { getUser, getUsers } from "../../api/backend/account";

import Button from "../base/Button";
import CheckBox from "../base/CheckBox";
import { SearchIcon } from "@heroicons/react/solid";
import avatar from "../../assets/img/icons/avatar.svg";

export const ModalAdd = ({ isVisible, onClose, onClose1, children, userConecte, userAdd}) => {
  
  if (!isVisible) return null;
  
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const showData = async () => {
    const response = await getUsers();
    const filteredUsers = response.data.users.filter(user => user.uuid !== userConecte);

    setUsers(filteredUsers);
  };
  //

  //funtion de busqueda

  const searcher = (e) => {
    setSearch(e.target.value);
  };

 

  const results = !search
  ? users.filter((dato) => !userAdd.includes(dato.uuid) && dato.uuid !== userConecte)
  : users.filter((dato) => {
      const searchTerms = search.toLowerCase().split(" ");
      const firstName = dato.firstname.toLowerCase();
      const lastName = dato.lastname.toLowerCase();
      return (
        searchTerms.every((term) =>
          firstName.includes(term) || lastName.includes(term)
        ) &&
        !userAdd.includes(dato.uuid) &&
        dato.uuid !== userConecte
      );
    });

  useEffect(() => {
    showData();
  }, []);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelection = (id, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    }
  };

  const handleSubmit = () => {
    onClose1(selectedUsers);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px]  h-[700px] md:h-[650px] lg:h-[680px] xl:h-[600px] flex flex-col bg-gray-100 border_gray rounded-lg p-8 ">
        <button className="text-red bg-gray-200 px-2 mb-1  border-gradient-v rounded-md text-xl place-self-end" onClick={onClose}>
          X
        </button>
        <div className="flex items-center border-gradient-v border-2 rounded-lg">
          <SearchIcon className="h-6 w-6 m-1 border-0 active:border-2  rounded-lg" />
          <input
            value={search}
            onChange={searcher}
            type="text"
            placeholder="Rechercher un utilisateur"
            className="w-full border-0  py-1"
            name=""
            id=""
          />
        </div>
        {/* afichar los elementos */}
        <div className=" p-2 my-3 rounded-xl h-[600px] overflow-y-auto ">
          {results.length ? (
            results.map((user) => (
              <div
                key={user.uuid}
                className="w-full h-[90px] mb-2 p-3 bg-white border_gray flex justify-around rounded-lg"
              >
                <img className="avatarcoll2"
                  src={avatar}
                  alt="Logo de TreeUp"
                   />
                <div className="grow flex flex-col ml-2 my-auto justify-evenly divColl_14_modal ">
                  <div className="divColl_12_modal ">
                    {user.firstname} {user.lastname}
                  </div>
                  <div className="divColl_13_modal">{user.username} </div>
                </div>
                <div className="m-auto">
                  <CheckBox
                    text=""
                    id={user.uuid}
                    onChange={(e) =>
                      handleUserSelection(user.uuid, e.target.checked)
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
        
        <button
          className="w-full sm:w-4/5 md:w-4/5 lg:w-3/5 my-3 border-gradient-v border-4 rounded-lg text-primary hover:text-white px-3 py-2 m-auto "
          // onClick={handleSubmit}
          onClick={() => {
            handleSubmit();
            onClose();
          }}
        >
          Ajouter les utilisateurs sélectionnés
        </button>
      </div>
    </div>
  );
};
