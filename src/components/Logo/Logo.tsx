import { Link } from 'react-router-dom';
import logo from '../../assets/ic_new_logo.png';
import style from './Logo.module.css';

export const Logo = () => {
  return (
    <Link className={style.logoContainer} to={'/'}>
      <img alt='Logo' className={style.image} src={logo} />
    </Link>
  );
};
