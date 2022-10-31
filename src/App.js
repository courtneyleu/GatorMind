import {BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import Notifications from './components/Notification';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Navigationbar from './components/Navigationbar';
import Login from './pages/Login'
import { AuthProvider } from "./context/AuthContext";
import Profile from './pages/Profile'
import Register from "./pages/Regsitration";


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
