import { useState } from 'react';
import { useNavigate } from 'react-router';
import PostApi from '../../entities/post/PostApi';
import styles from './AddPostPage.module.css';

type Inputs = {
  title: string;
  body: string;
}

function AddPostPage() {
  const navigate = useNavigate();

    const INPUTS_INITIAL_DATA_VALUES= {
        title: '',
        body: '',
      }

  const [inputs, setInputs] = useState(INPUTS_INITIAL_DATA_VALUES);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: Inputs) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = { ...inputs, title: (inputs.title.trim() || 'Без темы')};

    if (!inputs.body.trim()) {
      alert('Пост должен иметь содержание');
      return;
    }

    try {
      const { statusCode, error } = await PostApi.create(postData);

      if (error) {
        alert(error);
        return;
      }

      if (statusCode === 201) {
        setInputs(INPUTS_INITIAL_DATA_VALUES);
        navigate('/');
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h3>Новый пост</h3>
        <input
          className={styles.input}
          onChange={onChangeHandler}
          value={inputs.title}
          name="title"
          placeholder="Заголовок"
          autoFocus
        />
        <input
          className={styles.textarea}
          onChange={onChangeHandler}
          value={inputs.body}
          name="body"
          required
          placeholder="Текст поста"
        />
        <button type="submit" className={styles.button}>Отправить</button>
      </form>
    </div>
  );
}

export default AddPostPage;