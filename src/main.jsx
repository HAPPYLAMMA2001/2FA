import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import './index.css'
// import App from './App'
import Login_Signup from './Components/Login/Login_Signup'
import Auth from './Components/auth/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login_Signup />,
  },
  {
    path:'/authentication',
    element: <Auth />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
