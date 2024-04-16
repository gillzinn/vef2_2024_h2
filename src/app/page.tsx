'use client'
import Image from "next/image";
import styles from "./page.module.css";
import headerstyles from "./../components/Header/Header.module.css";

const cards = [
  {
    id: 1,
    title: "Mountain Adventure",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    imageUrl: "https://source.unsplash.com/WLUHO9A_xik/1600x900" // Sample image from Unsplash
  },
  {
    id: 2,
    title: "City Life",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    imageUrl: "https://source.unsplash.com/6jYoil2GhVk/1600x900"
  },
  {
    id: 3,
    title: "Forest Trail",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    imageUrl: "https://source.unsplash.com/5KRFtK2Il8w/1600x900"
  },
  {
    id: 4,
    title: "Beach Paradise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    imageUrl: "https://source.unsplash.com/JmuyB_LibRo/1600x900"
  }
];


export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <div>
          <h2>
            Dagskrá Menningarnætur
          </h2>
        </div>
        <div>

        </div>
      </div>
      <div className={styles.grid}>
        {cards.map(card => (
          <div key={card.id} className={styles.card}>
            <Image
              src={card.imageUrl}
              alt={card.title}
              layout="responsive"
              width={1600}
              height={900}
            />
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
