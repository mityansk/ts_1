import { ReactElement } from 'react';
import { ArrayWithPosts, Post } from '../../entities/post/post.types';
import { UserType } from '../../entities/user/user.types';
import PostCard from '../PostCard/PostCard';

type PropsType = {
  user: UserType;
  posts: ArrayWithPosts;
  setPosts: React.Dispatch<React.SetStateAction<ArrayWithPosts>>;
}

export default function PostList({ user, posts, setPosts }: PropsType, ): ReactElement {
  return (
    <div>
      {posts ? (
        posts.map((post: Post) => (
          <PostCard user={user} post={post} key={post.id} setPosts={setPosts} />
        ))
      ) : (
        <>Постов нет</>
      )}
    </div>
  );
}
