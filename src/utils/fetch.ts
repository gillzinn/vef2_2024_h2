import { cache } from "react";

export const fetchEvents = cache(async (url: string) => {
    const events = await fetch(url);
    return events.json();
});