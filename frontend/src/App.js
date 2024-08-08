import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstHome from './Components/Home/FirstHome';
import Homes from './Components/Home/Homes';
import Login from './Components/Forms/Login';
import Signup from './Components/Forms/Signup';
import AdminDrawer from './Components/AdminBlock/AdminDrawer/AdminDrawer';
import { useSelector } from 'react-redux';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      {currentUser?.role === "Admin" && <AdminDrawer />}
      {currentUser?.role === "Teacher" && <FacultyDrawer />}

      {(currentUser === null || currentUser === "") && (
        <>
          <Routes>
            <Route path='/' element={<FirstHome />} />
            <Route path='/home' element={<Homes />} />
            <Route path='/adminlogin' element={<Login role={"Admin"} />} />
            <Route path='/studentlogin' element={<Login role={"Student"} />} />
            <Route path='/Facultylogin' element={<Login role={"Teacher"} />} />
            <Route path='/registerAdmin' element={<Signup />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
