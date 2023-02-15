import React, { useState } from "react";
import { Link } from "react-router-dom";
import CheckBox from "../theme/CheckBox";
import Search from "../theme/Search";

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

	const [filterType, setFilterType] = useState([]);
	const [filterTypeProject, setFilterTypeProject] = useState([]);
	const [filterTypeTechnologie, setFilterTypeTechnologie] = useState([]);
	const [search, setSearch] = useState("");

	

	const toggleFilter = {
		base: (e, setFilter) => setFilter((filter) => (filter.includes(e.target.value) ? filter.filter((item) => item != e.target.value) : [...filter, e.target.value])),
		type: (e) => {toggleFilter.base(e, setFilterType)},
		typeProject: (e) => {toggleFilter.base(e, setFilterTypeProject)},
		typeTechnologie: (e) => {toggleFilter.base(e, setFilterTypeTechnologie)}
	};

	return (
		<div className="w-1/4 py-4 h-full">
			<div className="flex flex-col justify-between bg-gray-1 p-2 rounded-md h-full">
				<div>
					<Search setOutput={setSearch}/>
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

				<div>
					<Link to="/">
						<p>Nous contacter ? </p>
					</Link>
					<Link to="/">
						<p>A propos de nous</p>
					</Link>
					<Link to="/">
						<p>Conditions Générales d’Utilisations</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
