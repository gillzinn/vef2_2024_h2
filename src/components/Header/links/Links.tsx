'use client'

import { useState } from "react";
import NavLink from "./navLink/navLink";
import styles from "./links.module.css";

const links = [
    { title: 'Home', path: '/' },
    { title: 'Events', path: '/events' },
    { title: 'About', path: '/about' },
];

const Links = () => {
    const [open, setOpen] = useState(false);

    

    const session = true;
    const isAdmin = true;
    



    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => (
                        <NavLink item={link} key={link.title}/>
                ))}{session ? (
                    <>
                        {isAdmin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
                        <div >
                            <button className={styles.logout}>Logout</button>
                        </div>
                    </>
                ) : (
                    <NavLink item={{ title: 'Login', path: '/login' }} />
                )}
            </div>
            <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button>
            {
                open && <div className={styles.mobileLinks}>
                   {links.map((link) => (
                        <NavLink item={link} key={link.title}/>
                ))}{session ? (
                    <>
                        {isAdmin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
                        <div >
                            <button className={styles.logoutSmall}>Logout</button>
                        </div>
                    </>
                ) : (
                    <NavLink item={{ title: 'Login', path: '/login' }} />
                )}
                </div>
            }

        </div>
    );
}

export default Links;