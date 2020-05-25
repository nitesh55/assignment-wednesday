import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import ItuneContainer from '@containers/ItuneContainer/Loadable';

export const routeConfig = {
//   repos: {
//     component: HomeContainer,
//     route: '/',
//     // add props to pass to HomeContainer
//     props: {
//       maxwidth: 500,
//       padding: 20
//     },
//     exact: true
//   },
  itune: {
    component: ItuneContainer,
    route: '/',
    // add props to pass to HomeContainer
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
