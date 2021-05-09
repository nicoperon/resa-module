import Home from '../pages/home';
import Courses from '../pages/courses';
import EditCourse from '../pages/editCourse'
import NewCourse from '../pages/editCourse'
var BASEDIR = process.env.REACT_APP_BASEDIR;

var loginRoutes = [
    { path: "/", name: "Home", component: Home },
    { path: "/courses", name: "Courses", component: Courses },
    { path: "/edit/course", name: "Edit Course", component: EditCourse },
    { path: "/new/course", name: "New Course", component: NewCourse },

];


export default loginRoutes;
