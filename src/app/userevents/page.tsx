"use client";

import React, { useState, useEffect } from "react";
import { fetchEvent, fetchRegistrations } from "@/utils/fetch";
import styles from "./../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function UserEvents() {
  const user = localStorage.getItem("user");
  const URL = `https://vef2-2024-h1-iuos.onrender.com/registrations`;
  const [fetchingRegs, setFetchingRegs] = useState(false);
  const [regEvents, setRegEvents] = useState<any>([]);
  console.log(user);
  useEffect(() => {
    setFetchingRegs(true);
    const fetchData = async () => {
      if (!user) {
        return;
      }
      let events = [];
      await fetchRegistrations(URL, user)
        .then(async (regsRes) => {
          if (regsRes) {
            for (let reg of regsRes) {
              const event = await fetchEvent(
                `https://vef2-2024-h1-iuos.onrender.com/events/${reg[0]}`
              );
              console.log(event);
              events.push(event);
            }
            setRegEvents(events);
          }
        })
        .catch((error) => {
          console.error("Error fetching registrations:", error);
        })
        .finally(() => {
          setFetchingRegs(false);
        });
    };
    fetchData();
  }, [user, URL]);
  console.log(regEvents);
  return (
    <main className={styles.main}>
      {fetchingRegs ? (
        <p>Sæki viðburði...</p>
      ) : (
        <div>
          <div>
            <h1 className={styles.title}>Viðburðir sem þú ert skráð/ur á</h1>
          </div>
          <div className={styles.grid}>
            {regEvents.map(
              ({
                id,
                title,
                place,
                date,
                imageURL,
              }: {
                id: string;
                title: string;
                place: string;
                date: string;
                imageURL: string;
              }) => (
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
              )
            )}
          </div>
        </div>
      )}
    </main>
  );
}
