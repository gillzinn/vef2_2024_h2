
import NavLink from "./navLink/navLink";
import styles from "./links.module.css";
const Links = () => {
    const links = [
        { title: 'Home', path: '/' },
        { title: 'Events', path: '/events' },
        { title: 'About', path: '/about' },
    ];

    const session = true;
    const isAdmin = true;
    

    return (
        <>
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
        </>
    );
}

export default Links;