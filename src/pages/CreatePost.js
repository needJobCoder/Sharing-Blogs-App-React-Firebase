import { getByTitle } from '@testing-library/react';
import react, { useEffect, useState } from 'react';
import {addDoc, collection} from 'firebase/firestore';
import {db, auth} from '../firebase-config';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../src/styles.css'



const CreatePost = ()=>
{
    let navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');

    

    const postCollectionRed = collection(db, 'posts');

    const createPost = async ()=>
    {
        if(title == '' && postText == '')
        {

        }
        else
        {
            await addDoc(postCollectionRed, {title, postText,comments:[], likes:0, likedUsernames:[], author:{name:auth.currentUser.displayName, id:auth.currentUser.uid}});
            navigate('/home');
        }
       
    }

    return (
    <div className='master-post-page'>  
        <div className='createPostPage'>
            <h2>Create A Post</h2>
            <div className='inputGp'>
                <textarea required type="text" className='titleInput' inputMode='text' placeholder='Title...'onChange={(event)=>{setTitle(event.target.value)}}/>
                <textarea required type={'text'} className='postInput' inputMode='text' placeholder='Post here ... 'onChange={(event)=>{setPostText(event.target.value)}}/>
                <button className= 'postButton' onClick={createPost}>Submit</button>
            </div>
        </div>
    </div>  
    )
}

export default CreatePost;