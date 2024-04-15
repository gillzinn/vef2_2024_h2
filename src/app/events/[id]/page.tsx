
import styles from './../../page.module.css';
import { fetchEvents } from '@/utils/fetch';

import Image from 'next/image';

import cloudinary from '@/utils/cloudinary';
import { ImageProps } from '@/utils/types';







export default function Events({params: {id}, } : {params: {id: string}}) {

const events = fetchEvents(`https://vef2-2024-h1-iuos.onrender.com/events/${id}`);
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
            events.then(({id, title, place, date, image}: {id: string, title: string, place: string ,date: string, image: string}) => (
                <a key={id} className={styles.card} href={`/events/${id}`}>
                  <h2>{title}</h2>
                  <p>{place}</p>
                  <p>{date}</p>
                  
                </a>
              ))
            )
          }
            
      </div>
      </div>
    </main>
  );
}
