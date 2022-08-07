import react, { useEffect, useState } from 'react';
import {collection, connectFirestoreEmulator, doc, getDocs, updateDoc} from 'firebase/firestore';
import {db} from '../firebase-config';
import '../../src/styles.css' 
import { async, map } from '@firebase/util';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase-config';
import HomeComp from './HomeComp';
import { applyActionCode } from 'firebase/auth';




const Home = ()=>
{
    let navigate = useNavigate();
    const [postLists, setPostLists] = useState([]);
    const [getComment, setComment] = useState('');
    const postCollectionRef = collection(db, 'posts');
    const [search, setSearch] = useState('');
    
    const [limit, setLimit] = useState(5);
    const limitBalance = 10;

    const updateLike = async (document, like, likedUsername, id)=>
    {
        
        const findElement = (element)=>
        {
            if(element === auth.currentUser.displayName)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        const index = document.likedUsernames.findIndex(findElement);
        

        if(index === -1)
        {
            let newArr = likedUsername;
            newArr.push(auth.currentUser.displayName)
            let likes = like + 1;

            
            console.log('username does not exist')
            let getDoc = doc(db, 'posts', id);
            let newFields = {likes:likes, likedUsernames:[...document.likedUsernames, `${auth.currentUser.displayName}`]}
            await updateDoc(getDoc, newFields);
            navigate('/forRender');
        }
        else if(index !== -1 && like > 0)
        {
            
            console.log('username does exist')
            let newArr = doc.likedUsernames
            newArr.splice(index, 1)

            let getDoc = doc(db, 'posts', id);
            let newFields = {likes:like - 1, likedUsernames:[...newArr]}
            await updateDoc(getDoc, newFields);
            navigate('/forRender');
        }

    }

    const postComment = async (id, comment, commentObj, userName)=>
    {
        if(comment == '')
        {
            console.log('comment is running');
        }
       if(comment != '')
       {
        let getDoc = doc(db, 'posts', id);
        let newFields = {comments:[...commentObj, {comment, userName}]}
        await updateDoc(getDoc, newFields);

        console.log(id, comment, commentObj)
        navigate('/forRender');

        console.log('post comment is running ...')
       }

    }

    const testFunction = ()=>
    {
        console.log('test func is running ...')
    }

    useEffect(()=>
    {
        const getPosts = async ()=>
        {
            const data = await getDocs(postCollectionRef);
            setPostLists(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
        }

        getPosts();

    }, [])

   

    

    return(
        <>
        <div className='search-bar-container'>
            <input className='search-bar' placeholder='search blog here' type={'text'} onChange={(event)=>{setSearch(event.target.value)
        
             console.log(search)}}/>
           

        </div>
        <div className='home-container'>


            {postLists.map((doc, idx, arr)=>{
                if(search === '' && idx < limit)
                {
                    return (
                        // <HomeComp title={doc.title} postText={doc.postText} postComment={postComment} comments={doc.comments} commentObj={doc.comments} id={doc.id} getComment={getComment} testFunction={testFunction} />

                        <div className='element'>
                            <div className='title'> {doc.title}</div>
                            <div className='post'>{doc.postText}</div>
                            <div className='comment'>
                                    <input className='commentSearchBar' type={'text'} onChange={(event)=>{setComment(event.target.value)}}></input>
                                    <button onClick={()=>{
                                        updateLike(doc, doc.likes, doc.likedUsernames, doc.id)
                                        console.log(doc.likes)
                                        console.log(doc.likedUsernames)
                                      
                                        }}>like{document.likes}</button>
                                    <button  onClick={()=>{
                                        postComment(doc.id, getComment, doc.comments, auth.currentUser.displayName);   
                                    }}>Comment</button>
                                    <div className='comments-container'>
                                        {doc.comments.map((comments, index)=>
                                        {
                                            return <div className="comments" key={index}><b>{comments.userName}</b>   {comments.comment}</div>
                                        })}
                                    </div>
                                </div>
                        </div>
                      
                    )   
                }       
               else if((doc.postText.toLowerCase().includes(search.toLowerCase()) || doc.title.toLowerCase().includes(search.toLowerCase())) && idx < limit)
                {
        
                    return (
                        <div className='element'>
                            <div className='title'> {doc.title}</div>
                            <div className='post'>{doc.postText}</div>
                            <div className='comment'>
                                    <input className='commentSearchBar' type={'text'} onChange={(event)=>{setComment(event.target.value)}}></input>
                                    <button  onClick={()=>{
                                        postComment(doc.id, getComment, doc.comments, auth.currentUser.displayName);   
                                    }}>Comment</button>
                                    <div className='comments-container'>
                                        {doc.comments.map((comments, index)=>
                                        {
                                            return <div className="comments" key={index}><b>{comments.userName}</b>  {comments.comment}</div>
                                        })}
                                    </div>
                                </div>
                        </div>
                    )
                }
                else if(search === 'myblogs' && doc.userName === auth.currentUser.displayName)
                {      
                    {console.log('myblogs true')}
                        return (
                            <div className='element'>
                            <div className='title'>{doc.title}</div>
                            <div className='post'>{doc.postText}</div>
                            <div className='comment'>
                                    <input className='commentSearchBar' type={'text'} onChange={(event)=>{setComment(event.target.value)}}></input>
                                    <button  onClick={()=>{
                                        postComment(doc.id, getComment, doc.comments, auth.currentUser.displayName);   
                                    }}>Comment</button>
                                    <div className='comments-container'>
                                        {doc.comments.map((comments, index)=>
                                        {
                                            return <div className="comments" key={index}><b>{comments.userName}</b>  {comments.comment}</div>
                                        })}
                                    </div>
                                </div>
                        </div>
                        )   
                    }
                }
            )}

            <div className='button_container'>

            <button onClick={()=>{setLimit(limit + 10)
                        console.log(limit);
                    }}> Show more </button>
                <button onClick={()=>
                {
                    setLimit(limit + 100);
                    console.log(limit);
                }}>Show next 100</button>

            </div>
           

        </div>
        </>
    )
}

export default Home;