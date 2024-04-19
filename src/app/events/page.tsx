import Image from 'next/image';
import { Event } from '@/utils/types';
import styles from './../page.module.css';
import { fetchEvents } from '@/utils/fetch';
import Link from 'next/link';





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
            events.map(({id, title, place, date, imageURL}: {id: string, title: string, place: string ,date: string, imageURL: string}) => (
                <Link key={id} className={styles.card} href={`/events/${id}`}>
                  <Image 
                    src={imageURL}
                    height={300}
                    width={300}
                    alt="Mynd fyrir viðburð"
                  />
                  <h2>{title}</h2>
                  <p>{place}</p>
                  <p>{date}</p>
                </Link>
            ))
          )}
      </div>
      </div>
    </main>
  );
}

export default Events;