import Balance from "pages/home/Balance";
import Explore from "pages/home/Explore";
import Profile from "pages/home/Profile";
import ChatWrapper from "pages/homeworks/ChatWrapper";
import Homework from "pages/homeworks/Homework";
import Login from "pages/landing/Login";

const routes = [
    {
      layout: "/landing",
      path: "/login",
      element: Login
    },
    {
      layout: "/home",
      path: "/explore",
      element: Explore
    },
    {
      layout: "/home",
      path: "/homework",
      element: Homework
    },
    {
      layout: "/home",
      path: "/homework/:homeworkID",
      element: ChatWrapper
    },
    {
      layout: "/home",
      path: "/user/:username",
      element: Profile
    }
];

export default routes;
