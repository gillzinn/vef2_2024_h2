import React, { Component, ReactNode, useEffect, cache } from "react";
import { Context } from "./User";

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


export const fetchUsers = cache(async (url: string) => {
    const users = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage}`,
        },
    });
    console.log(localStorage);
    if(!users.ok){
        throw new Error("Unable to fetch users");
    }
    return users.json();
});