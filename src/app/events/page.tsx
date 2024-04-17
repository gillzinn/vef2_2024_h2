
import { Event } from '@/utils/types';
import styles from './../page.module.css';
import { fetchEvents } from '@/utils/fetch';






const Events = async () =>{

  const events = await fetchEvents("https://vef2-2024-h1-iuos.onrender.com/events");
  return (
    <main className={styles.main}>
      <div>
        <div>
          <h1 className = {styles.title}>
            Dagskrá Menningarnætur
          </h1>
        </div>
        <div className={styles.grid}>
          {events === null ? (
            <div>Loading</div>
          ) : (
            events.map(({id, title, place, date, image}: {id: string, title: string, place: string ,date: string, image: string}) => (
                <a key={id} className={styles.card} href={`/events/${id}`}>
                  <h2>{title}</h2>
                  <p>{place}</p>
                  <p>{date}</p>
                </a>
            ))
          )}
      </div>
      </div>
    </main>
  );
}

export default Events;