import Link from 'next/link';
import styles from '../styles/navbar.module.css'
import LinkInBioIcon from './Icons/BioLink';
import InvoicingIcon from './Icons/Invoicing';
import MainstackLogo from './Icons/Logo';
import MediaKitIcon from './Icons/MediaKit';
import MenuIcon from './Icons/Menu';
import MessageIcon from './Icons/Message';
import NotificationIcon from './Icons/Notification'
import StoreIcon from './Icons/Store';
import { Tooltip } from '@chakra-ui/react'

const AppBar = () => {
  const navItems = [
    {
      name: 'Link In Bio',
      icon: <LinkInBioIcon />
    },
    {
      name: 'Store',
      icon: <StoreIcon />
    },
    {
      name: 'Media Kit',
      icon: <MediaKitIcon />
    },
    {
      name: 'Invoicing',
      icon: <InvoicingIcon />
    }
  ]
  return (
    <div className={styles.appbar__ctn}>
      <ul className={styles.appbar__actions}>
        {navItems?.map(navItem => <li key={navItem.name}>
          <Tooltip hasArrow center label={navItem.name} placement="right-end" borderRadius={8}>
            <Link href="#">
              {navItem.icon}
            </Link>
          </Tooltip>
        </li>)}
      </ul>
    </div>
  )
}

export default AppBar;