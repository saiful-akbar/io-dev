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
      bannerColor: '#421DA0',
      url: 'https://github.com/saiful-akbar/naikdaun/',
      technology: ['PHP', 'Laravel', 'Bootstrap 5', 'javascript', 'jQuery'],
      heroImage: '/assets/images/projects/naikdaun/naikdaun_desktop_home.png',
      details: [
        {
          title: 'Overview',
          description: 'Naikdaun is an idea and concept generator house. With complete understanding of technology and wide range experience for conventional, digital and integrated media communication campaign.',
          images: ['/assets/images/projects/naikdaun/naikdaun_hero.jpg'],
        },
        {
          title: 'UI',
          description: null,
          images: [
            '/assets/images/projects/naikdaun/naikdaun_mobile_home.png',
            '/assets/images/projects/naikdaun/naikdaun_mobile_about.png',
            '/assets/images/projects/naikdaun/naikdaun_mobile_works.png',
            '/assets/images/projects/naikdaun/naikdaun_mobile_works_detail.png',
          ],
        },
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
