
import styles from './../../page.module.css';
import { fetchEvent } from '@/utils/fetch';

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
                  <a key={id} className={styles.card} href={`/events/${id}`}>
                    <h2>{events.title}</h2>
                    <p>{events.place}</p>
                    <p>{events.date}</p>
                  </a>
              )
            }
              
        </div>
        </div>
      </main>
    );
}


export default Events;
