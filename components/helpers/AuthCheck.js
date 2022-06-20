import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import Login from '@components/simple/LoginFLash';

export default function AuthCheck(props) {
  const {username} = useContext(UserContext);

  return username ?
    props.children :
    props.fallback || <Login />;
}