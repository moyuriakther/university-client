import Student from "../components/dashboard/Student";
import Dashboard from "../components/dashboard/Dashboard";
import Faculty from "../components/dashboard/Faculty";
import Course from "../components/dashboard/Course";
import Admin from "../components/dashboard/Admin";

export const userPaths = [
    {
      name: "Dashboard",
      path: "dashboard", 
      element: <Dashboard />,
    },
    {
      name: "Course",
      path: "course",
      element: <Course />,
    },
    {
      name: "Faculty",
      path: "faculty", 
      element: <Faculty />,
    },
    {
      name: "Students",
      path: "students",
      element: <Student />,
    },
    {
      name: "Admin",
      path: "admin",
      element: <Admin />,
    },
  ];