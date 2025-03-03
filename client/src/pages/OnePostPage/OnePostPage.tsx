import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostApi from '../../entities/post/PostApi';
import { Post, ResponseType} from '../../entities/post/post.types';

function OnePostPage() {
    const { id } = useParams<{id: string}>();

    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        if (!id) {
            return alert('Invalid Post ID');
        }    

        const postId = +id;
        
        if (isNaN(postId)) {
            return alert('Invalid post ID');
        }

        PostApi.getById(postId)
        .then(({error, message, data}: ResponseType<Post | null>) => {
            if (error) alert (message);
            setPost(data);
        });
    },[id])

    return (
        <div>
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <p>Обновлено: {new Date(post.updatedAt).toLocaleString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    );
}

export default OnePostPage;