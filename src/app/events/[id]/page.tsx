"use client";

import styles from "./../../page.module.css";
import { fetchEvent } from "@/utils/fetch";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import cloudinary from "@/utils/cloudinary";
import { ImageProps } from "@/utils/types";
import { Context } from "../../../utils/User";
import { fetchRegistrations } from "@/utils/fetch";

const Events = ({ params: { id } }: { params: { id: string } }) => {
  const URL = `https://vef2-2024-h1-iuos.onrender.com/registrations`;
  const UserState = () => {
    return useContext(Context);
  };
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [fetchingRegs, setFetchingRegs] = useState(false);
  const { authenticated, addRegistration, deleteRegistration, user } =
    UserState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await fetchEvent(
          `https://vef2-2024-h1-iuos.onrender.com/events/${id}`
        );
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setFetchingRegs(true);
    const fetchData = async () => {
      await fetchRegistrations(
        URL,
        user
      )
        .then((regsRes) => {
          if (regsRes) {
            setRegistered(
              regsRes.some(([eventId]) => eventId === parseInt(id, 10))
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching registrations:", error);
        })
        .finally(() => {
          setFetchingRegs(false);
        });
    }
    fetchData();
  }, [id, user, URL]);

  const handleSubmitAdd = async () => {
    try {
      setRegistered(true);
      await addRegistration(event.title);
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  const handleSubmitDelete = async () => {
    try {
      setRegistered(false);
      const currRegs = await fetchRegistrations(URL,user);
      const tuple = currRegs?.filter(
        ([eventIdfind, _]) => eventIdfind === parseInt(id, 10)
      );
      if (tuple) {
        for(let eventTuple of tuple){
          await deleteRegistration(eventTuple[1]);
        }
      }
    } catch (error) {
      console.error("Error unregistering from event:", error);
    }
  };

  if (loading || fetchingRegs) {
    return <div>Loading...</div>;
  }
  return (
    <main className={styles.main}>
      <div>
        <h2>Dagskrá Menningarnætur</h2>
        {event ? (
          <React.Fragment>
            <a className="card" href={`/events/${id}`}>
              <h2>{event.title}</h2>
              <p>{event.place}</p>
              <p>{event.date}</p>
              <Image
                src={event.imageURL}
                alt={event.title}
                layout="responsive"
                width={1600}
                height={900}
              />
            </a>
            {authenticated && !registered && (
              <button onClick={async () => await handleSubmitAdd()}>Skrá á viðburð</button>
            )}
            {authenticated && registered && (
              <button onClick={async () => await handleSubmitDelete()}>Skrá af viðburði</button>
            )}
          </React.Fragment>
        ) : (
          <div>Event not found</div>
        )}
      </div>
    </main>
  );
};

export default Events;
