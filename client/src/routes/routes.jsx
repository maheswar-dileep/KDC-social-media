import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home.jsx';
import Profile from '../pages/profile/profile.jsx';
import Signup from '../pages/signup/signup.jsx';
import Signin from '../pages/signin/signin.jsx';
import EditPost from '../pages/edit-post/editPost.jsx';
import Search from '../pages/search/search.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/edit-post/:id',
    element: <EditPost />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);

export default router;
