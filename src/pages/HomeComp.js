import react, { useState } from 'react';
import Home from './Home';
import { auth } from '../firebase-config';



const HomeComp = ({postComment, title, postText, comments, commentObj, id, testFunction})=>
{
    const [getComment, setComment] = useState('');
    let userName = auth.currentUser.userName
    return(
        <>
          <div className='master-container'>
              <div>{title}</div>
              <div className='post'>{postText}</div> 
              <div className='comments'>
                  <input type={'text'} placeholder="enter comment here ... " onChange={(event)=>{setComment(event.target.value)}}/>
                  <button onClick={()=>{
                      console.log('HomeComp comment true');
                      testFunction();
                      postComment(id, comments, commentObj, userName );
                      
                      
                  }}>comment</button>
                  {comments.map((val, idx, arr)=>
                  {
                      return(
                          <div><b>{val.userName}</b> {val.comment}</div>
                      )
                  })}
              </div>
          </div>
                        
        
            
        </>
    )
}

export default HomeComp;