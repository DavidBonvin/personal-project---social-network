import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import CheckBox from "../base/CheckBox";
import Search from "../base/Search";

const SideBar = () => {
  const fakeProjectType = [
    { uuid: "1", type: "Réseau social" },
    { uuid: "2", type: "E-Commerce" },
    { uuid: "3", type: "Blog" },
  ];

  const fakeTechnologiesType = [
    { uuid: "4", type: "Html/Css" },
    { uuid: "5", type: "Javascript" },
    { uuid: "7", type: "Php" },
    { uuid: "6", type: "NodeJs" },
  ];

  const location = useLocation();
  const [filterType, setFilterType] = useState([]);
  const [filterTypeProject, setFilterTypeProject] = useState([]);
  const [filterTypeTechnologie, setFilterTypeTechnologie] = useState([]);
  const [search, setSearch] = useState("");

  const blacklistRoutes = ["/login"];

  const toggleFilter = {
    base: (e, setFilter) =>
      setFilter((filter) =>
        filter.includes(e.target.value)
          ? filter.filter((item) => item != e.target.value)
          : [...filter, e.target.value]
      ),
    type: (e) => toggleFilter.base(e, setFilterType),
    typeProject: (e) => toggleFilter.base(e, setFilterTypeProject),
    typeTechnologie: (e) => toggleFilter.base(e, setFilterTypeTechnologie),
  };

  const [show, setShow] = useState(window.innerWidth > 768);

  useEffect(() => {
    window.addEventListener("resize", (e) =>
      setShow(e.target.innerWidth > 768)
    );
  }, []);

	return (
		<>
			{!blacklistRoutes.includes(location.pathname) && (
				<div className="flex absolute h-fit md:relative transition-all md:w-1/4 lg:w-1/5">
					<div className={`flex flex-col justify-between shadow-lg bg-gray-1 p-2 rounded-md h-full w-full ${!show && "hidden"}`}>
						<div>
							<Search setOutput={setSearch} />
							<div>
								<h6>Type</h6>
								<CheckBox text="Projet" value="project" onChange={toggleFilter.type} />
								<CheckBox text="Utilisateur" value="user" onChange={toggleFilter.type} />
							</div>
							<hr className="border-dark my-2" />
							<div>
								<h6>Type de projets</h6>
								{fakeProjectType.map(({ uuid, type }) => (
									<CheckBox text={type} id={uuid} value={uuid} onChange={toggleFilter.typeProject} />
								))}
							</div>
							<hr className="border-dark my-2" />
							<div>
								<h6>Technologies utilisées</h6>
								{fakeTechnologiesType.map(({ uuid, type }) => (
									<CheckBox text={type} id={uuid} value={uuid} onChange={toggleFilter.typeTechnologie} />
								))}
							</div>
						</div>

            <div className="mt-5">
              <Link to="/">
                <p>Nous contacter ? </p>
              </Link>
              <Link to="/">
                <p>A propos de nous</p>
              </Link>
              <Link to="/">
                <p>Conditions Générales d'Utilisations</p>
              </Link>
            </div>
          </div>
          <button
            className="h-fit rounded-lg bg-gray-1 p-3"
            hidden={window.innerWidth > 768}
            onClick={(e) => setShow(!show)}
          >
            <ArrowCircleRightIcon
              className={`h-6 w-6  ${show && "rotate-180"}`}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default SideBar;
