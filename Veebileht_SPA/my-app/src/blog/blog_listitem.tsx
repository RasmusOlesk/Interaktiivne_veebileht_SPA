import './blog_listitem.css'

type CarBlog = {
  id: number;
  text: string;
  src: string;
  favorite: boolean;
}

type Props = {
    blog: CarBlog;
    toggleFavorite: (id: number) => void;
    deleteBlogPost: (id: number) => void;
};

const BlogItem: React.FC<Props> = ({ blog, toggleFavorite, deleteBlogPost }) => {  // trükib välja loendi osa, väljastab pildi, teksti lemmiku märgistuse ning kustutamis nupu.
    return (
        <li className={`card post-item ${blog.favorite ? 'favorite' : ''}`}>
            <img onClick={() => toggleFavorite(blog.id)} src={blog.src}></img><span onClick={() => toggleFavorite(blog.id)}>{blog.text}</span>
            <div onClick={() => toggleFavorite(blog.id)} className='like'>❤︎⁠</div><button onClick={() => deleteBlogPost(blog.id)}>Delete</button>

        </li>
    )
}

export default BlogItem