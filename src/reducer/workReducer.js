import actionType from "./actionType";

// initial state
const initialState = {
  categories: ["web", "ui/ux"],
  projects: [
    {
      id: 1,
      name: "Naikdaun",
      slug: "naikdaun",
      category: "web",
      year: "2021",
      bannerColor: "#007CE2",
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
      bannerColor: "#904E12",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: "/assets/images/project/2.jpg",
      images: [
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
      ],
    },
    {
      id: 3,
      name: "IO Dev",
      slug: "io-dev",
      category: "web",
      year: "2021",
      bannerColor: "#AE5D00",
      tags: ["Javascript", "React JS", "Framer Motion", "Material UI"],
      heroImage: "/assets/images/project/3.jpg",
      images: [
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
        "https://source.unsplash.com/random/1000x600/",
      ],
    },
    {
      id: 4,
      name: "Slow Motor Inventory",
      slug: "slow-motor-inventory",
      category: "ui/ux",
      year: "2021",
      bannerColor: "#B60118",
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
      bannerColor: "#9FC739",
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
  domRect: {
    bottom: null,
    height: null,
    left: null,
    right: null,
    top: null,
    width: null,
    x: null,
    y: null,
  },
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
