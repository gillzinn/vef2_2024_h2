import React, { Component, ReactNode, useEffect, cache } from "react";
import { Context } from "./User";

export const fetchEvents = cache(async (url: string) => {
  const events = await fetch(url);
  if (!events.ok) {
    throw new Error("Unable to fetch events");
  }
  return events.json();
});

export const fetchEvent = cache(async (url: string) => {
  const events = await fetch(url);
  if (!events.ok) {
    throw new Error("Unable to fetch event");
  }
  return events.json();
});

export const fetchRegistrations = cache(async (url: string, user: string) => {
  const currRegistrations: Array<[number, number]> = [];
  const token = localStorage.getItem("token");
  if(!token){
    console.error("Enginn token, signa inn aftur?");
    return;
  }
  const registrations = await fetch(url, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
  });
  if (!registrations.ok) {
    throw new Error("Unable to fetch registrations");
  }
  const regs = await registrations.json();
  for (let reg of regs) {
    if (reg.username === user) {
      currRegistrations.push([reg.eventId, reg.id]);
    }
  }
  console.log(currRegistrations);
  return currRegistrations;
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
