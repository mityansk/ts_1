import { ReactElement, useState } from 'react';
import styles from './RegistrationPage.module.css';
import { useNavigate } from 'react-router';
import UserValidator from '../../entities/user/User.Validator';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import UserApi from '../../entities/user/UserApi';
import { UserPropsType } from '../../shared/types/props';

type INPUTS_DATA_VALUES = {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

function RegistrationPage({ setUser }: UserPropsType): ReactElement {
  const INPUTS_INITIAL_DATA_VALUES: INPUTS_DATA_VALUES = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  }; 

  const [inputs, setInputs] = useState<INPUTS_DATA_VALUES>(INPUTS_INITIAL_DATA_VALUES);
  const navigate = useNavigate();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setInputs((prev: INPUTS_DATA_VALUES) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error } = UserValidator.validateSignUp(inputs);

    if (!isValid) return alert(error);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {repeatPassword, ...cleanedInputs} = inputs;
      const {
        statusCode,
        data,
        error: responseError,
      } = await UserApi.signUp(cleanedInputs);

      if (responseError) {
        alert(responseError);
        return;
      }

      if (statusCode === 201) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        setInputs(INPUTS_INITIAL_DATA_VALUES);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert((error as Error).message);
    }
  };

  const { username, email, password, repeatPassword } = inputs;

  return (
    <div className={styles.regContainer}>
      <form onSubmit={onSubmitHandler} className={styles.regForm}>
        <h2>Регистрация</h2>
        <input
          onChange={onChangeHandler}
          value={username}
          name='username'
          placeholder='Имя пользователя'
          autoComplete='username'
          required
          autoFocus
        />
        <input
          type='email'
          onChange={onChangeHandler}
          value={email}
          name='email'
          placeholder='E-mail'
          autoComplete='email'
          required
        />
        <input
          type='password'
          onChange={onChangeHandler}
          value={password}
          name='password'
          autoComplete='new-password'
          placeholder='Пароль'
          required
        />
        <input
          type='password'
          onChange={onChangeHandler}
          value={repeatPassword}
          name='repeatPassword'
          autoComplete='new-password'
          placeholder='Пароль ещё раз'
          required
        />
        <button type='submit'>Отправить</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
