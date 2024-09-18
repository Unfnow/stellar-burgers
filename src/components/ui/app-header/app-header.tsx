import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName, pathname }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={pathname === '/' ? 'primary' : 'disabled'} />
          <p className='text text_type_main-default ml-2 mr-10'>
            <Link
              className={clsx(
                styles.link,
                pathname === '/' && styles.link_active
              )}
              to='/'
            >
              Конструктор
            </Link>
          </p>
        </>
        <>
          <ListIcon type={pathname === '/feed' ? 'primary' : 'disabled'} />
          <p className='text text_type_main-default ml-2'>
            <Link
              className={clsx(
                styles.link,
                pathname === '/feed' && styles.link_active
              )}
              to='/feed'
            >
              Лента заказов
            </Link>
          </p>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={pathname === '/profile' ? 'primary' : 'disabled'} />
        <p className='text text_type_main-default ml-2'>
          <Link
            className={clsx(
              styles.link,
              pathname === '/profile' && styles.link_active
            )}
            to='/profile'
          >
            {userName || 'Личный кабинет'}
          </Link>{' '}
          {/*неправильно, сделать проверку на логин, прежде чем пускать*/}
        </p>
      </div>
    </nav>
  </header>
);
