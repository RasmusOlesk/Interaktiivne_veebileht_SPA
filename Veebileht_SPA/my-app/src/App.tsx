import { useState } from 'react'
import './App.css'
import { FadeContent, styles } from './fade/fadecontent';
import Gallery from './gallery/gallery';
import Comment from './blog/comment';
import CommentList from './blog/comment_list';


type ContentStatus = "home" | "gallery" | "comments";

type CarBlog = {
  id: number;
  text: string;
  src: string;
  pictureId: number;
  favorite: boolean;
}

const App: React.FC = () => {
  const [activeContent, setActiveContent] = useState<ContentStatus>("home");

  const [current, setCurrent] = useState<number>(0);
  
  const [carBlogPost, setCarBlogPost] = useState<CarBlog[]>([]);

  return (
    <div className="container">
      <header>
        <h1>Unique car collection</h1>
        <nav className="navbar">
            <li><button
              onClick={() => setActiveContent("home")}
              style={{
              ...(activeContent === "home" ? styles.active : {}),
              }}
            >Home</button></li>
            <li><button
              onClick={() => setActiveContent("gallery")}
              style={{
              ...(activeContent === "gallery" ? styles.active: {}),
              }}
            >Gallery</button></li>
            <li><button
              onClick={() => setActiveContent("comments")}
              style={{
              ...(activeContent === "comments" ? styles.active : {}),
              }}
            >Comments</button></li>
        </nav>
      </header>
      <main>
        <div className="contentWrapper">
          
          <FadeContent active={activeContent === "home"}>
            <div className='landing'>

              <div className='triangle tri_u'><img src="https://laitserallypark.ee/wp-content/uploads/2023/08/muuseum23-scaled.jpg"/></div>

              <div className='triangle tri_d'><img src="https://laitserallypark.ee/wp-content/uploads/2023/08/muuseum25-scaled.jpg"/></div>

              <div className='triangle tri_u'><img src="https://hips.hearstapps.com/toc.h-cdn.co/assets/16/14/1459816624-1954-mercedes-300sl-gullwing-a.jpg"/></div>

              <div className='triangle tri_d'><img src="https://hips.hearstapps.com/toc.h-cdn.co/assets/16/18/4000x3117/1972-detomaso-pantera-a.jpg"/></div>

              <div className='triangle tri_u'><img src="https://hips.hearstapps.com/toc.h-cdn.co/assets/16/18/2048x1361/dodge-viper-gts.jpeg"/></div>
           </div>
           <div className='landing card'><p>Check cars in gallery and feel free to leave a comment about the one you like. Comments can be read at the comments section.</p></div>
          </FadeContent>

          <FadeContent active={activeContent === "gallery"}>
            <Gallery current={current} setCurrent={setCurrent} />
            <Comment
              current={current}
              carBlogPost={carBlogPost}
              setCarBlogPost={setCarBlogPost}/>
          </FadeContent>

          <FadeContent active={activeContent === "comments"}>
            <CommentList
              current={current}
              carBlogPost={carBlogPost}
              setCarBlogPost={setCarBlogPost}/>
          </FadeContent>
          
        </div>
      </main>
    </div>
  );
};


export default App
