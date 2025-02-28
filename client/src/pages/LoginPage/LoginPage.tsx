import { ReactElement, useState } from 'react';
import UserApi from '../../entities/user/UserApi';
import UserValidator from '../../entities/user/User.Validator';
import { useNavigate } from 'react-router';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import styles from './LoginPage.module.css';
import { UserPropsType } from '../../shared/types/props';
import { LogRegDataType } from '../../entities/user/user.types';

type INPUTS_DATA_VALUES = {
    email: string;
    password: string;
}

function LoginPage({ setUser }: UserPropsType): ReactElement {
  const INPUTS_INITIAL_DATA_VALUES: INPUTS_DATA_VALUES = {
    email: '',
    password: '',
  };

  const [inputs, setInputs] = useState<LogRegDataType>(INPUTS_INITIAL_DATA_VALUES);
  const [errorState, setErrorState] = useState<string | null>(null);
  const navigate = useNavigate();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: INPUTS_DATA_VALUES) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error } = UserValidator.validateSignIn(inputs);

    if (!isValid) return setErrorState(`Ошибка входа! Проверьте данные.`);

    try {
      const {
        data,
        error: errorResponse,
        statusCode,
      } = await UserApi.signIn(inputs);

      if (errorResponse) {
        setErrorState(error);
        return;
      }

      if (statusCode === 200) {
        setUser(data.user);
        setInputs(INPUTS_INITIAL_DATA_VALUES);
        setAccessToken(data.accessToken);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setErrorState((error as Error).message);
    }
  };

  const { email, password } = inputs;

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={onSubmitHandler} className={styles.loginForm}>
        <h2>Вход</h2>
        <input
          type='email'
          onChange={onChangeHandler}
          value = {email}
          name='email'
          placeholder='E-mail'
          autoComplete='username'
          required
          autoFocus
        />
        <input
          type='password'
          onChange={onChangeHandler}
          value={password}
          name='password'
          placeholder='Пароль'
          autoComplete='current-password'
          required
        />
        <button type='submit'>Отправить</button>
        {errorState && <p className={styles.errorMessage}>{errorState}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
