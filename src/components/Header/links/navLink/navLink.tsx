'use client'

import Link from "next/link";
import styles from "./navLink.module.css";

import { usePathname } from "next/navigation";

interface NavLinkProps {
    item: {
        path: string;
        title: string;
    };
}

const NavLink = ({ item }: NavLinkProps) => {
    const pathName = usePathname();

    
    const isActive = item.path === '/'
        ? pathName === item.path 
        : pathName.startsWith(item.path) && pathName !== '/';

    return (
        <Link href={item.path} key={item.title}>
            <div className={`${styles.container} ${isActive ? styles.active : ''}`}>{item.title}</div>
        </Link>
    );
}

export default NavLink;
