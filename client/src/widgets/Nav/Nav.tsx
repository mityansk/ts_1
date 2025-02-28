import { NavLink, useNavigate } from 'react-router';
import styles from './Nav.module.css'
import UserApi from '../../entities/user/UserApi';
import { UserPropsType } from '../../shared/types/props';
import { ReactElement } from 'react';

export default function Nav ({ user, setUser }: UserPropsType): ReactElement {
    const navigate = useNavigate();
    const signOutHandler = async () => {
        try {
            const { statusCode, error } = await UserApi.signOut();

            if (error) {
                alert(error)
            }

            if (statusCode === 200) {
                setUser(null);
                navigate('/');
            }
           
        } catch (error) {
            console.error('Ошибка выхода:', error);
            alert(error)
        }
       
    }
    return (
        <div> 
            <nav className={styles.nav}>
            <span className={styles.leftspan}><NavLink to="/">Домой</NavLink></span>
            <span className={styles.rightspan}>
                {!user && (
                    <>
                     <NavLink to="/login">Войти</NavLink>
                     <NavLink to="/registration">Регистрация</NavLink>
                     </>
                )}
                {user && (
                    <>
                    <span>Привет, {user.username}!</span>
                    <NavLink to="/add">Новый пост</NavLink>
                    <NavLink to='/' onClick={signOutHandler}>Выйти</NavLink>
                    </>
                )}
                </span>
             </nav>
        </div>

    )
}