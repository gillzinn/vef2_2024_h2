
import { Event } from '@/utils/types';
import styles from './../page.module.css';
import { fetchEvents } from '@/utils/fetch';






export default function Events() {

  const events = fetchEvents("https://vef2-2024-h1-iuos.onrender.com/events");
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
            events.then((data: any[]) => (
              data.map(({id, title, place, date, image}: {id: string, title: string, place: string ,date: string, image: string}) => (
                <a key={id} className={styles.card} href={`/events/${id}`}>
                  <h2>{title}</h2>
                  <p>{place}</p>
                  <p>{date}</p>
                </a>
              ))
            ))
          )}
            
      </div>
      </div>
    </main>
  );
}