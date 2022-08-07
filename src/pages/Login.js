import react from 'react';
import {auth, provider} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../../src/styles.css'

const Login = ({setIsAuth})=>
{
    let navigate = useNavigate();

    const signInWithGoogle = ()=>
    {
        signInWithPopup(auth, provider).then((result)=>{
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            navigate('/createPost')
        })
    }

    return(
        <>
        <div className='loginPage'>
            <div className='login-container'>
                <p>Sign In With Google to Continue</p>
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </div>
        </>
    )
}

export default Login;