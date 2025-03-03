import { ReactElement, useEffect, useState } from 'react';
import PostList from '../../widgets/PostList/PostsList';
import PostApi from '../../entities/post/PostApi';
import { ArrayWithPosts, ResponseType } from '../../entities/post/post.types';
import { UserType } from '../../entities/user/user.types';

type PropsType = {
  user: UserType | null;
}


function PostsPage({ user }: PropsType): ReactElement {

  const [posts, setPosts] = useState<ArrayWithPosts>([]);

  useEffect(() => {
    PostApi.getAll().then(({ error, data, message }: ResponseType<ArrayWithPosts>) => {
      if (error) alert(message);
      if (!data) return alert('Постов нет, нечего показывать!')
      setPosts(data);
    });
  }, [setPosts]);

  return (
    <>
      <PostList user={user} posts={posts} setPosts={setPosts}/>
    </>
  );
}

export default PostsPage;
