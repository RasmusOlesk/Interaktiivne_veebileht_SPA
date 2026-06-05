import { useState } from 'react';
import BlogItem from './blog_listitem';
import { styles } from '../fade/fadecontent';
import { pictures } from '../gallery/gallery';

type CarBlog = {
  id: number;
  text: string;
  src: string;
  pictureId: number;
  favorite: boolean;
}

type CommentProps = {
  carBlogPost: CarBlog[];
  setCarBlogPost: React.Dispatch<React.SetStateAction<CarBlog[]>>;
  current: number;
};

const CommentList: React.FC<CommentProps> = ({ current, carBlogPost, setCarBlogPost }) => {
  
  const [sortType, setSortType] = useState<'newest' | 'oldest' | 'favorite' | 'picture'>('newest');

  const [filterType, setFilterType] = useState<'all' | 'current' | 'favorite'>('all');

  const toggleFavorite = (id: number) => {  // postitusele vajutades seab sellele favorit staatuse True
    setCarBlogPost(carBlogPost.map(post =>
        post.id === id ? { ...post, favorite: !post.favorite } : post
    ));
  };

  const deleteBlogPost = (id: number) => {  // kustutamisele märgitud postituse ID filtreeritakse välja.
    setCarBlogPost(carBlogPost.filter(post => post.id !== id));
  };

  const filteredPosts = carBlogPost.filter(post => {  // filtreerib nähtavaid postitusi (kõik, hetkel aktiivne galeriis ja lemmikud, kui filtritüüp on vastav seatud)
    if (filterType === 'all') return true;

    if (filterType === 'current') {
      return post.pictureId === pictures[current].id;
    }

    if (filterType === 'favorite') {
      return post.favorite;
    }

    return true;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {  // sorteerib filtreeritud järjendit, võimaldab seada sorteerimise tüübid värskemad enne, vanemad enne, lemmikud, ning piltide järjekorras.
    if (sortType === 'newest') return b.id - a.id;
    if (sortType === 'oldest') return a.id - b.id;
    if (sortType === 'favorite') return Number(b.favorite) - Number(a.favorite);
    if (sortType === 'picture') return b.pictureId - a.pictureId;
    return 0;
  });

  return (
    <div>
      <div>
        Sort by:
        <button
          style={{
            ...(sortType === "newest" ? styles.active : {}),
              }}
          onClick={() => setSortType('newest')}
        >Newest</button>
        <button
          style={{
            ...(sortType === "oldest" ? styles.active : {}),
          }}
          onClick={() => setSortType('oldest')}
        >Oldest</button>
        <button
          style={{
            ...(sortType === "favorite" ? styles.active : {}),
          }}
          onClick={() => setSortType('favorite')}
        >Favorites</button>
        <button
          style={{
            ...(sortType === "picture" ? styles.active : {}),
          }}
          onClick={() => setSortType('picture')}
        >Pictures</button>
      </div>
      <div>
        Filter by:
        <button
          style={{
            ...(filterType === "all" ? styles.active : {}),
              }}
          onClick={() => setFilterType('all')}
        >All</button>
        <button
          style={{
            ...(filterType === "current" ? styles.active : {}),
              }}
          onClick={() => setFilterType('current')}
        >Current active picture</button>
        <button
          style={{
            ...(filterType === "favorite" ? styles.active : {}),
              }}
          onClick={() => setFilterType('favorite')}
        >Favorites</button>
      </div>
    <ul className='post-list'>
        {sortedPosts.map(post => (  // trükib välja iga uue tehtud postituse BlogItem sisu järgi
            <BlogItem
              key={post.id}
              blog={post}
              toggleFavorite={toggleFavorite}
              deleteBlogPost={deleteBlogPost}
            />
      ))}
    </ul>
    </div>
  );
};

export default CommentList