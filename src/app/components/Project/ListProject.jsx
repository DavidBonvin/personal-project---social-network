import CardProject from "./CardProject";
import { Link } from "react-router-dom";
import React from "react";

const ListProject = () => {
  const fakeData = [
    {
      uuid: "e73bab9a-7d74-4e18-a647-040c16742467",
      name: "Stronghold",
      type: "Comedy|Romance",
      description:
        "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
      collaborator: "Pre-emptive leading edge Graphic Interface",
      technologies: [
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf3",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf2",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf1",
        },
      ],
      image: "http://dummyimage.com/140x100.png/5fa2dd/ffffff",
    },
    {
      uuid: "9f32c63f-ee50-4079-ac28-6a86b9c76df0",
      name: "Veribet",
      type: "Drama",
      description:
        "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      collaborator: "Ameliorated directional strategy",
      technologies: [
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf3",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf2",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf1",
        },
      ],
      image: "http://dummyimage.com/147x100.png/dddddd/000000",
    },
    {
      uuid: "2419294d-cfdd-4657-97de-369ca12395dc",
      name: "Redhold",
      type: "Documentary",
      description:
        "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      collaborator: "Decentralized systemic interface",
      technologies: [
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf3",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf2",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf1",
        },
      ],
      image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
    },
    {
      uuid: "69fcf5ff-5e92-4ad5-966c-c06ae9527d01",
      name: "Zoolab",
      type: "Crime|Mystery|Thriller",
      description:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      collaborator: "Synchronised even-keeled help-desk",
      technologies: [
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf3",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf2",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf1",
        },
      ],
      image: "http://dummyimage.com/201x100.png/ff4444/ffffff",
    },
    {
      uuid: "42ed9285-edd3-4763-905a-e5d82844d09d",
      name: "Stim",
      type: "Drama",
      description:
        "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
      collaborator: "Cross-platform holistic analyzer",
      technologies: [
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf3",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf2",
        },
        {
          name: "NodeJs",
          image: "https://dummyimage.com/100x100.png/5fa2dd/ffffff",
          uuid: "akzldklqsjdqsjlkqjf1",
        },
      ],
      image: "http://dummyimage.com/187x100.png/dddddd/000000",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center h-full gap-10">
      <div className="border-gradient-v rounded-3xl p-3">
        <p>
          Tree-Up vous permets de partager et d’échanger sur les divers projets
          d’actualité postés par nos jeunes développeurs !{" "}
        </p>
        <p>
          N’hésitez pas à faire un tour sur nos projets récents et de partager
          votre avis dans la section commentaires !{" "}
        </p>
        <Link to="" className="text-primary-light">
          Cliquez ici
        </Link>
        <p className="inline-block ml-1">
          si vous souhaitez créer un projet afin de le mettre en avant !{" "}
        </p>
      </div>
      {fakeData.map((project) => (
        <CardProject key={project.uuid} project={project} />
      ))}
    </div>
  );
};

export default ListProject;
