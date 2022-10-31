import {BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import Notifications from './components/Notification';
import Settings from './Pages/Settings';
import Home from './Pages/Home';
import Navigationbar from './components/Navigationbar';
import Login from './Pages/Login'
import { AuthProvider } from "./context/AuthContext";
import Profile from './Pages/Profile'
import Register from "./Pages/Regsitration";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <AuthProvider>
                <Navigationbar />
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/Notifications' element={<Notifications/>}/>
                    <Route path='/Settings' element={<Settings/>}/>
                    <Route path='/Profile' element={<Profile/>}/>
                    <Route path = "/Login" element={<Login/>}/>
                     <Route path = "/Register" element={<Register/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
