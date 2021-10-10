import actionType from "./actionType";

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
      heroImage: "/assets/images/project/1.jpg",
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
      bannerColor: "#544f96",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: "/assets/images/project/scooter-ws/hero.png",
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
      bannerColor: "#00685e",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: "/assets/images/project/sm-inventory/hero.png",
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
      heroImage: "/assets/images/project/4.jpg",
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
      heroImage: "/assets/images/project/5.jpg",
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
