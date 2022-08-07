import react, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ForRender = ()=>
{
    let navigate = useNavigate();
        
    useEffect(()=>
    {
        navigate('/home')
    }, [])

    return(
        <>
        
        </>
    )
}

export default ForRender;