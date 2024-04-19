
import styles from './../../page.module.css';
import { fetchEvent } from '@/utils/fetch';
import Link from 'next/link';
import Image from 'next/image';

import cloudinary from '@/utils/cloudinary';
import { ImageProps } from '@/utils/types';







const Events = async ({params: {id}, } : {params: {id: string}}) => {
  const events = await fetchEvent(`https://vef2-2024-h1-iuos.onrender.com/events/${id}`);
    return (
      <main className={styles.main}>
        <div>
          <div>
            <h2>
              Dagskrá Menningarnætur
            </h2>
          </div>
          <div className={styles.grid}>
            {events === null ? (
              <div>Loading</div>
            ) : (
                  <Link key={id} className={styles.card} href={`/events/${id}`}>
                    <h2>{events.title}</h2>
                    <p>{events.place}</p>
                    <p>{events.date}</p>
                  </Link>
              )
            }
              
        </div>
        </div>
      </main>
    );
}


export default Events;
