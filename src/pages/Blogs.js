import react, {useState, useEffect} from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import {auth, db} from '../firebase-config';
import HomeComp from './HomeComp';
import "../../src/myBlogs.css"

const Blogs = ()=>
{
    const posts = collection(db, 'posts');
    const [postData, setPostData] = useState([]);
    const username = auth.currentUser.displayName;

    const getData = async ()=>
    {
        const data = await getDocs(posts);
        setPostData(data.docs.map((doc)=>{return {...doc.data(), id:doc.id}}))
        
    }

    useEffect(()=>
    {
        
        getData();
        
    }, [])

    return(
        <>
        <div className='masterContainerMyBlog'>
        {
            postData.map((val, idx, arr)=>
            { 
                // postComment, title, postText, comments, commentObj, id, testFunction
                if(val.author.name === username)
                    return(
                        <div className='element'>
                        <div className='title'>title : {val.title}</div>
                        <div className='post'>{val.postText}</div>
                    </div>
                    )

                
            })
        }
        </div>
        </>
    )
}

export default Blogs;