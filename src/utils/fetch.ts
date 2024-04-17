import { cache } from "react";

export const fetchEvents = cache(async (url: string) => {
    const events = await fetch(url);
    if(!events.ok){
        throw new Error("Unable to fetch events");
    }
    return events.json();
});


export const fetchEvent = cache(async (url: string) => {
    const events = await fetch(url);
    if(!events.ok){
        throw new Error("Unable to fetch event");
    }
    return events.json();
});