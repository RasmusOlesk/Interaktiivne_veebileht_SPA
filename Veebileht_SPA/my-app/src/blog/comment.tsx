import { useState } from 'react';
import { pictures } from '../gallery/gallery';
import "./comment.css"

type CarBlog = {
  id: number;
  text: string;
  src: string;
  pictureId: number;
  favorite: boolean;
}

type CommentProps = {
  current: number;
  carBlogPost: CarBlog[];
  setCarBlogPost: React.Dispatch<React.SetStateAction<CarBlog[]>>;  // reacti funktsioonid, mis võimaldavad võtta uut CarBlog ning seada selel väärtuseks.
};

const Comment: React.FC<CommentProps> = ({ current, carBlogPost, setCarBlogPost }) => {
  
  const [newCarBlogPost, setNewCarBlogPost] = useState('');

  
  const addBlogPost = () => {
    const currentPic = pictures[current]
    if (!newCarBlogPost.trim()) {
      alert("Input field left empty. Try again!");
      setNewCarBlogPost('');
      return;
    };

    setCarBlogPost([...carBlogPost,
      {
        id: Date.now(),
        text: newCarBlogPost.trim(),
        src: currentPic.src,
        pictureId: currentPic.id,
        favorite: false,
      }
    ]);

    setNewCarBlogPost('');
  };

  return (
    <div className="input-row">
      <input
        type="text"
        value={newCarBlogPost}
        onChange={e => setNewCarBlogPost(e.target.value)}
        placeholder="Add comment to blog about the car"
        onKeyDown={e => e.key === 'Enter' && addBlogPost()}
      />
      <button onClick={addBlogPost}>Add</button>
    </div>
  );
};

export default Comment