import { useState } from "react";
import { useEffect } from "react";

const tabs = ['posts','comments', 'albums','photos','todos','users']

function Content() {
    const [posts, setPosts]= useState([])
    const [type, setType] = useState('posts')
    const [avatar, setAvatar] =useState()
    const handlePreviewAvatar = (e)=>{
      const file = e.target.files[0]
      file.preview = URL.createObjectURL(file);
      setAvatar(file)
    }

    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
          .then(res => res.json())
          .then(posts => {setPosts(posts);
        })
    },[type])

    
    useEffect(()=>{
      return ()=>{
       avatar && URL.revokeObjectURL(avatar.preview)
      }
    },[avatar])

  return (
    <div>
      <input type="file" onChange ={handlePreviewAvatar}/>
      {avatar && (
        <img src={avatar.preview} alt= "" width="80%"/>
      )}
      {tabs.map(tab => (
        <button 
          key={tab}
          style={type === tab? {
            color:'#fff',
            backgroundColor:'#333'
        }:{}}
        onClick={()=>setType(tab)}
        >
          {tab}
          </button>
      ))}
        <ul>
            {posts.map(posts=> (
                <li key={posts.id}>{posts.title || posts.name}</li>
            ))}
        </ul>
    </div>
  );
}

export default Content;
