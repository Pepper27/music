import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.js";
import Right from "./components/Right.js";
import BottomIndex from "./pages/Bottom_index.js"
import Play from "./components/Play";
import ListType from './pages/list_type.js';
import ListDetail1 from './pages/list_detail_1.js';
import DetailSong from './pages/detail_song.js';
import Singer from './pages/singer.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Lovesong from './pages/lovesong.js';
import Search from './pages/Search.js';

import Notfound from './pages/notfound.js';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="wap">
        <Right/>
      <Routes>
        <Route path='/trangchu' Component={BottomIndex} />
        <Route path='/list_type' Component={ListType} />
        <Route path='/list_detail_1/:id' Component={ListDetail1} />
        <Route path='/detail_song/:id' Component={DetailSong} />
        <Route path='/singer' Component={Singer}/>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Register}/>
        <Route path='/Search' Component={Search}/>
        <Route path='/lovesong' Component={Lovesong}/>
        <Route path='*' Component={Notfound}/>
      </Routes>
        </div>
      </div>
      <Play /> 
    </BrowserRouter>
  );
}
export default App;