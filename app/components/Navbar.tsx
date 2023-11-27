"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/navbar.module.css'
import AnalyticsIcon from './Icons/Analytics';
import AppsIcon from './Icons/Apps';
import CRMIcon from './Icons/CRM';
import HomeIcon from './Icons/Home';
import MainstackLogo from './Icons/Logo';
import MenuIcon from './Icons/Menu';
import MessageIcon from './Icons/Message';
import NotificationIcon from './Icons/Notification';
import RevenueIcon from './Icons/Revenue';
const Navbar = () => {
  const pathname = usePathname()
  const navItems = [
    {
      name: 'Home',
      path: '/home',
      icon: <HomeIcon />
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: <AnalyticsIcon />
    },
    {
      name: 'Revenue',
      path: '/revenue',
      icon: <RevenueIcon />
    },
    {
      name: 'CRM',
      path: '/crm',
      icon: <CRMIcon />
    },
    {
      name: 'Apps',
      path: '/apps',
      icon: <AppsIcon />
    }
  ]
  return (
    <div className={styles.nav__ctn}>
      <div className={styles.nav__logo}>
        <MainstackLogo />
      </div>
      <ul className={styles.nav__actions}>
        {navItems?.map(navItem => <li key={navItem.path} className={pathname === navItem.path ? styles.active__link : ''}>
          <Link href={navItem.path}>
            {navItem.icon}
            {navItem.name}
          </Link>
        </li>)}
      </ul>
      <div className={styles.nav_auth__actions}>
        <button>
          <NotificationIcon />
        </button>
        <button>
          <MessageIcon />
        </button>
        <button>
          <div className={styles.nav__avatar}>
            OJ
          </div>
          <MenuIcon />
        </button>
      </div>
    </div >
  )
}

export default Navbar;