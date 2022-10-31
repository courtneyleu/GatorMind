import {BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import Notifications from './components/Notification';
import Settings from './components/Settings';
import Home from './components/Home';
import Navigationbar from './components/Navigationbar';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navigationbar />
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/Notifications' element={<Notifications/>}/>
                <Route path='/Settings' element={<Settings/>}/>
                <Route path='/Profile' element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
