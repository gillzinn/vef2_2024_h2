'use client'

import styles from './Header.module.css';

import Links from './links/Links';


export default function Header() {

    const onClick = () => {
        const ul = document.getElementById('menuList');
        ul?.classList.toggle(styles.menuActive);
        const hamburger = document.getElementById('hamburger');
        hamburger?.classList.toggle(styles.hamburgerActive);
    }



    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                Events
            </div>
            <a  onClick={onClick} className={styles.hamburger} id="hamburger">
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </a>
            <nav className={styles.navMenu}>
                <ul className={styles.ul} id='menuList'>
                    <Links></Links>
                </ul>
            </nav>
        </header>
    );
}