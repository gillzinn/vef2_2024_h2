import styles from './Header.module.css';
import Links from './links/Links';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.headerLogo}>
                Menningarnótt
            </Link>
            <div >
                <Links></Links>
            </div>
        </header>
    );
}