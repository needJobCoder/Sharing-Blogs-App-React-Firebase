import react, {useState} from 'react';
import {} from 'firebase/firestore';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { signOut } from 'firebase/auth';
import {} from '../src/pages/CreatePost';
import {auth} from './firebase-config';
import CreatePost from './pages/CreatePost';
import '../src/styles.css'

import ForRender from './pages/ForRender';
import Blogs from './pages/Blogs';

const App = ()=>
{
  
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = ()=>
  {
    signOut(auth).then(()=>
    {
      localStorage.clear();
      setIsAuth(false);
     window.location.pathname = '/'
      
      
    })
  }

  return(
   <Router>
     <nav className='nav-bar'>
      { isAuth && <Link to='/home'>Home</Link>}
       {isAuth && <Link to='/createPost'>Create Post</Link>}
       {!isAuth && <Link to='/'>Login</Link>}
       {isAuth && <button onClick={signUserOut}>Sign Out</button>}
       
       {isAuth && <Link to='/myBlogs'>My Blogs</Link>}
     </nav>
     <Routes>
       <Route path='/home' element={<Home />}/>
       <Route path='/' element={<Login setIsAuth = {setIsAuth}/>}/>
       <Route path='/createPost' element={<CreatePost />}/>
       <Route path='/myBlogs' element={<Blogs />} />
       <Route path='/forRender' element={<ForRender />} />
     </Routes>
   </Router>
  )
}

export default App;