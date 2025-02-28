import Nav from '../Nav/Nav';
import { Outlet } from 'react-router';
import { ReactElement } from 'react';
import { UserPropsType } from '../../shared/types/props';

export default function Layout({ user, setUser }: UserPropsType): ReactElement{
  return (
    <>
      <div><Nav user={user} setUser={setUser} /></div>
      <div><Outlet /></div>
    </>
  );
}
