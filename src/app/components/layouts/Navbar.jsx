import React, { useState } from "react";
import Button from "../theme/Button";
import Logo from "../../assets/img/LogoTreeUp100x100.png";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [enableDropdown, setEnableDropdown] = useState(false);
	const isLoggued = true;

	const fakeData = {
		username: "Manucraft",
		image: Logo,
	};

	return (
		<div>
			<div className="bg-gray-1 p-3">
				<div className="container mx-auto">
					<div className="flex justify-between items-center">
						<Link to="/">
							<img className="shadow-sm hover:shadow-inner shadow-dark rounded-2xl m-1 border-gradient-v" src={Logo} alt="Logo de TreeUp" width={60} />
						</Link>

						{isLoggued ? (
							<div className="flex items-center">
								<h5 className="mr-2">{fakeData.username}</h5>
								<div className="rounded-full shadow-sm hover:shadow-inner border-gradient-v shadow-dark gradient-v" onClick={() => setEnableDropdown(!enableDropdown)}>
									<img className="bg-white rounded-full m-1" src={fakeData.image} alt="Logo de TreeUp" width={60} />
								</div>
							</div>
						) : (
							<Link to="/login">
								<Button title={"Connexion"} />
							</Link>
						)}
					</div>
				</div>
			</div>

			{isLoggued && enableDropdown && (
				<div className="container mx-auto relative">
					<div className="float-right text-center px-3 pb-2 w-48 bg-gray-1 absolute right-0 rounded-b-md">
						<Link to="/profile">
							<div className="border-2 border-neutral-400 rounded m-1">Mon profil</div>
						</Link>
						<Link to="/">
							<div className="border-2 border-neutral-400 rounded m-1">Mes Projets </div>
						</Link>
						<hr className="border-neutral-400" />
						<Link to="/">
							<div className="border-2 border-neutral-400 rounded m-1 text-red-700 font-bold">Déconnexion</div>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
