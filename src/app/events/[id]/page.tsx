
import eventStyles from './EventDetails.module.css';
import styles from './../../page.module.css';
import { fetchEvents } from '@/utils/fetch';

import Image from 'next/image';

import cloudinary from '@/utils/cloudinary';
import { ImageProps } from '@/utils/types';







export default function Events({ params: { id } }: { params: { id: string } }) {
  const events = fetchEvents(`https://vef2-2024-h1-iuos.onrender.com/events/${id}`);

  return (
    <main className={eventStyles.eventMain}>
      <div>
        <h2 className={styles.title}>
          Dagskrá Menningarnætur
        </h2>
        {events === null ? (
          <div>Loading...</div>
        ) : (
          events.then(({ id, title, place, date, image }: { id: string, title: string, place: string, date: string, image: string }) => (
            <div key={id} className={eventStyles.eventCard}>
              <h2 className={eventStyles.eventTitle}>{title}</h2>
              <p className={eventStyles.eventInfo}>{place}</p>
              <p className={eventStyles.eventInfo}>{date}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}