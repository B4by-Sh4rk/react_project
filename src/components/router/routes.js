import About from "../../pages/About";
import Login from "../../pages/Login";
import PostIdPage from '../../pages/PostIdPage';
import Posts from "../../pages/Posts";

export const privateRoutes = [
    {   
        path: '/about',
        element: <About />,
        component: About,
        exact: true
    },
    {   
        path: '/posts',
        element: <Posts />,
        component: Posts,
        exact: true
    },
    {   
        path: '/posts/:id',
        element: <PostIdPage />,
        component: PostIdPage,
        exact: true
    }
]

export const publicRoutes = [
    {   
        path: '/login',
        element: <Login />,
        component: Login,
        exact: true
    }
]