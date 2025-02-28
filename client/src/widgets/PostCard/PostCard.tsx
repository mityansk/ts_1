import { ReactElement, useState } from 'react';
import PostApi from '../../entities/post/PostApi';
import { Link } from 'react-router';
import styles from './PostCard.module.css';
import { UserType } from '../../entities/user/user.types';
import { ArrayWithPosts, Post } from '../../entities/post/post.types';

type PropsType = {
  user: UserType;
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<ArrayWithPosts>>;
}

function PostCard({ user, post, setPosts }: PropsType): ReactElement {

  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    body: post.body,
    updatedAt: post.updatedAt,
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPost((prev: {title: string, body: string, updatedAt: Date}) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const saveChangesHandler = async () => {
    try {
      const { statusCode, error, message, data } = await PostApi.update(
        post.id,
        editedPost
      );
      const updatedAt = data?.[1]?.[0]?.updatedAt || post.updatedAt; 

      if (error) {
        alert(message);
        return;
      }
        if (statusCode === 200) {
          setPosts((prev: ArrayWithPosts) =>
            prev.map((e: Post) => (e.id === post.id ? { ...e, ...editedPost, updatedAt } : e))
          );
          
          setIsEditing(false);
        }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEditHandler = () => {
    setEditedPost({ title: post.title, body: post.body, updatedAt: post.updatedAt });
    setIsEditing(false);
  };

  const deleteButtonHandler = async () => {
    try {
      const { statusCode, error, message } = await PostApi.delete(post.id);
      if (error) alert(message);
      if (statusCode === 200) {
        setPosts((prev: ArrayWithPosts) => prev.filter((e: Post) => e.id !== post.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div>Пост #{post.id}</div>
        <h3 className={styles.title}>
            {!isEditing ? (
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
            ) : (
                <input
                type='text'
                name='title'
                onChange={onChangeHandler}
                value={editedPost.title}
                className={styles.input}
                />
            )}
        </h3>
        <span className={styles.author}>Автор: 
          {/* {post.user.username} */}в разработке
          </span>
      </div>
      <p className={styles.body}>
        {!isEditing ? (
            <>{post.body}</>
        ) : (<input
            type='text'
            name='body'
            onChange={onChangeHandler}
            value={editedPost.body}
            className={styles.input}
            />
        )}
        </p>
      <div className={styles.buttons}>
        <span 
        className={styles.updatedAt}
        >
          Обновлено: {new Date(post.updatedAt).toLocaleString()}
        </span>
        {user && (
          <span>
            {!isEditing ? (
                <>
            <button
              type='button'
              className={`${styles.button} ${styles.updateButton}`}
              onClick={() => setIsEditing(true)}
              disabled={!user?.id || +user.id !== post.authorId}
            >
              Изменить
            </button>
            <button
              type='button'
              className={`${styles.button} ${styles.deleteButton}`}
              disabled={!user?.id || +user.id !== post.authorId}
              onClick={deleteButtonHandler}
            >
              Удалить
            </button>
            </>
            ) : (
                <>
                <button
                type='button'
                className={`${styles.button} ${styles.updateButton}`}
                onClick={saveChangesHandler}
                >
                Сохранить
                </button>
                <button
                type='button'
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={cancelEditHandler}
                >
                Отменить
                </button>
                </>
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default PostCard;
