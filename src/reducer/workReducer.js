import actionType from "./actionType";
import image1 from "src/assets/images/project/1.jpg";
import image2 from "src/assets/images/project/2.jpg";
import image3 from "src/assets/images/project/3.jpg";
import image4 from "src/assets/images/project/4.jpg";
import image5 from "src/assets/images/project/5.jpg";
import image6 from "src/assets/images/project/6.jpg";
import image7 from "src/assets/images/project/7.jpg";
import image8 from "src/assets/images/project/8.jpg";
import image9 from "src/assets/images/project/9.jpg";
import image10 from "src/assets/images/project/10.jpg";

// initial state
const initialState = {
  domRect: null,
  categories: ["web", "ui/ux"],
  projects: [
    {
      id: 1,
      name: "Naikdaun",
      slug: "naikdaun",
      category: "web",
      year: "2021",
      bannerColor: "#0085A0",
      tags: ["PHP", "Laravel", "Bootstrap 5", "javascript", "jQuery"],
      heroImage: image1,
      images: [],
    },
    {
      id: 2,
      name: "Scooter Work Shop",
      slug: "scooter-work-shop",
      category: "web",
      year: "2021",
      bannerColor: "#970916",
      tags: ["PHP", "Laravel", "Bootstrap 5", "javascript", "jQuery"],
      heroImage: image2,
      images: [],
    },
    {
      id: 3,
      name: "Slow Motor Inventory",
      slug: "slow-motor-inventory",
      category: "web",
      year: "2021",
      bannerColor: "#0053AF",
      tags: ["PHP", "Materialize css", "javascript", "jQuery"],
      heroImage: image3,
      images: [],
    },

    {
      id: 4,
      name: "IO Dev",
      slug: "io-dev",
      category: "web",
      year: "2021",
      bannerColor: "#B1916A",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: image4,
      images: [],
    },
    {
      id: 5,
      name: "Portfoio",
      slug: "portfolio",
      category: "web",
      year: "2021",
      bannerColor: "#9F9083",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: image5,
      images: [],
    },
    {
      id: 6,
      name: "Point Of Sales",
      slug: "point-of-sales",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#a58a82",
      tags: ["Javascript", "php", "jQuery", "Bootstrap"],
      heroImage: image6,
      images: [],
    },
    {
      id: 7,
      name: "Project 7",
      slug: "project-7",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#653E1D",
      tags: ["Javascript", "php", "jQuery", "Bootstrap"],
      heroImage: image7,
      images: [],
    },
    {
      id: 8,
      name: "Project 8",
      slug: "project-8",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#22273B",
      tags: ["Javascript", "php", "jQuery", "Bootstrap"],
      heroImage: image8,
      images: [],
    },
    {
      id: 9,
      name: "Project 9",
      slug: "project-9",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#9A4001",
      tags: ["Javascript", "php", "jQuery", "Bootstrap"],
      heroImage: image9,
      images: [],
    },
    {
      id: 10,
      name: "Project 10",
      slug: "project-10",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#3E3F43",
      tags: ["Javascript", "php", "jQuery", "Bootstrap"],
      heroImage: image10,
      images: [],
    },
  ],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.setWorkProjects:
      return {
        ...state,
        projects: action.value,
      };

    case actionType.setWorkCategoies:
      return {
        ...state,
        categories: action.value,
      };

    case actionType.setWorkDomRect:
      return {
        ...state,
        domRect: action.value,
      };

    default:
      return state;
  }
};

export default projectReducer;
