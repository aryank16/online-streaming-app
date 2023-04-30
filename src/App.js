import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Game from './components/Game';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Detail from './components/Detail';
import Login from './components/Login';
import PlayVideo from './components/PlayVideo';
import Fetch from './components/Fetch';
import Assignment from './components/Assignment';
import UserDetail from './components/UserDetail';

function App() {
  return (
    
    <div className="App">
      <Router>
     <Header />
     <Routes>
     <Route path='/' element={<Home />}></Route>
     <Route path='/detail/:id' element={<Detail />}></Route>
     <Route path='/playvideo' element={<PlayVideo />}></Route>
     <Route path='/login' element={<Login />}></Route>
     <Route path='/fetch' element={<Fetch />}></Route>
     <Route path='/game' element={<Game />}></Route>
     </Routes>

    

     </Router>
    </div>
   
  );
}

export default App;
