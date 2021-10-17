import actionType from './actionType';

// initial state
const initialState = {
  sharedLayout: false,
  categories: ['web', 'ui/ux'],
  projects: [
    {
      id: 1,
      name: 'Naikdaun',
      slug: 'naikdaun',
      category: 'web',
      year: '2021',
      bannerColor: '#9479EF',
      tags: ['PHP', 'Laravel', 'Bootstrap 5', 'javascript', 'jQuery'],
      heroImage: '/assets/images/projects/naikdaun/naikdaun_laptop_hero.png',
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

    case actionType.setWorkSharedLayout:
      return {
        ...state,
        sharedLayout: action.value,
      };

    default:
      return state;
  }
};

export default projectReducer;
