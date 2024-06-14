import './App.css';
import { Routes, Route } from 'react-router-dom';
import FirstHome from './Components/Home/FirstHome';
import Homes from './Components/Home/Homes';
import AdminHome from './Components/AdminBlock/AdminHome/AdminHome';





function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<FirstHome/>}/>
      <Route path='/home' element={<Homes/>}/>
      <Route path='/adminhome' element={<AdminHome/>}/>
      
      
     </Routes>
    </div>
  );
}

export default App;
