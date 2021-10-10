import actionType from "./actionType";
import image1 from "src/assets/images/project/1.jpg";
import image2 from "src/assets/images/project/2.jpg";
import image3 from "src/assets/images/project/3.jpg";
import image4 from "src/assets/images/project/4.jpg";
import image5 from "src/assets/images/project/5.jpg";
import image6 from "src/assets/images/project/6.jpg";

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
      bannerColor: "#0069bf",
      tags: ["Javascript", "jQuery", "PHP", "Laravel", "Bootstrap 5"],
      heroImage: image1,
      images: [
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
      ],
    },
    {
      id: 2,
      name: "Scooter Work Shop",
      slug: "scooter-work-shop",
      category: "web",
      year: "2021",
      bannerColor: "#4c4c4c",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: image2,
      images: [
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
      ],
    },
    {
      id: 3,
      name: "Slow Motor Inventory",
      slug: "slow-motor-inventory",
      category: "web",
      year: "2021",
      bannerColor: "#BF6202",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: image3,
      images: [
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
      ],
    },

    {
      id: 4,
      name: "IO Dev",
      slug: "io-dev",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#990113",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: image4,
      images: [
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
      ],
    },
    {
      id: 5,
      name: "Portfoio",
      slug: "portfolio",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#81a02c",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: image5,
      images: [
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
      ],
    },
    {
      id: 5,
      name: "Point Of Sales",
      slug: "point-of-sales",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#825135",
      tags: ["Javascript", "php", "jQuery", "Bootstrap"],
      heroImage: image6,
      images: [
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
      ],
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
