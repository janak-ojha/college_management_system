import './App.css';
import { Routes, Route } from 'react-router-dom';
import FirstHome from './Components/Home/FirstHome';
import Homes from './Components/Home/Homes';
import Login from './Components/Forms/Login';
import Signup from './Components/Forms/Signup';





function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<FirstHome/>}/>
      <Route path='/home' element={<Homes/>}/>
      <Route path='/adminlogin' element={<Login role={"Admin"}/>}/>
      <Route path='/studentlogin' element={<Login role={"Student"}/>}/>
      <Route path='/Facultylogin' element={<Login role={"Faculty"}/>}/>
      <Route path='/registerAdmin' element={<Signup />} />
     </Routes>
    </div>
  );
}

export default App;
