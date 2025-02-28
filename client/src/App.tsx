import { ReactElement, useEffect, useState } from 'react'
import UserApi from './entities/user/UserApi';
import { ResponseType, UserType, UserWithTokenType } from './entities/user/user.types';
import { setAccessToken } from './shared/lib/axiosInstance';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
import Layout from './widgets/Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import AddPostPage from './pages/AddPostPage/AddPostPage';
import PostsPage from './pages/PostsPage/PostsPage';

function App(): ReactElement {
   
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    UserApi.refreshTokens()
      .then(({ error, data, statusCode }: ResponseType<UserWithTokenType>) => {
        if (error) {
          setUser(null);
          return;
        }
        if (statusCode === 200) {
          setUser(data.user);
          setAccessToken(data.accessToken);
        }
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<PostsPage user={user} />} />
          <Route path='/login' element={<LoginPage user={user} setUser={setUser} />} />
          <Route
            path='/registration'
            element={<RegistrationPage user={user} setUser={setUser} />}
          />

          <Route path='/add' element={<AddPostPage user={user} />} />
          {/* <Route path='/posts/:id' element={<OnePostPage user={user} />} /> */}
        </Route>
        <Route
          path='*'
          element={
            <>
              <div>Здравствуйте, вы не по адресу!</div>
              <NavLink to='/'>Перейти на главную</NavLink>
            </>
          }
        />
    </Routes>
    </BrowserRouter>
  )
}

export default App
