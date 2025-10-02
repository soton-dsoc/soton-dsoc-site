import React, { Component, SetStateAction, useEffect, useState } from 'react';
import styles from '../styles/Events.module.css';
import eventsSource from './events.json'

import EventObject from './EventObject';

function Events() {

    type Event = {
        key: number,
        title: string,
        date: Date,
        location: string,
        abstract: string[],
        organisers: string[],
        speakers: string[],
        learningOutcomes: string[],
        media: string[]
    }

    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [visiblePastEvents, setVisiblePastEvents] = useState(5);

    useEffect(() => {
        const events: Event[] = [];
        
        // Get all events
        for (let i = 0; i < eventsSource.events.length; i++) {
            const e = eventsSource.events[i];
            
            events.push({
                key: i,
                title: e.title,
                date: new Date(e.date),
                location: e.location,
                abstract: e.abstract,
                organisers: e.organisers,
                speakers: e.speakers,
                learningOutcomes: e.learningOutcomes,
                media: e.media
            })
        }

        const upcoming: Event[] = [];
        const past: Event[] = [];

        // Categorize events
        events.forEach((e) => {
            const today = new Date();
            if (e.date > today) {
                upcoming.push(e);
            } else {
                past.push(e);
            }
        });

        // Sort events
        upcoming.sort((a, b) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
            return 0;
        });

        past.sort((a, b) => {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
    }, []);

    return (
        <div id="events" className={styles.events} style={{ paddingTop: '70px' }}>
            <h1>Events</h1>
                <div className={styles.upcoming}>
                    <h2 id="upcomingDiv">Upcoming Events</h2>
                        <p style={{ display: `${upcomingEvents.length > 0 ? "none" : "block"}` }}>It seems like there are no events planned right now, please check again soon!</p>
                        {
                            upcomingEvents.map((e, i) =>
                                <div key={i}>
                                    <EventObject data={e} category="upcoming"/>
                                </div>
                            )
                        }
                </div>

                <div className={styles.past}>
                    <h2>Past Events</h2>
                        {
                            pastEvents.slice(0, visiblePastEvents).map((e, i) =>
                                <div key={i}>
                                    <EventObject data={e} category="past"/>
                                </div>
                            )
                        }
                        {visiblePastEvents < pastEvents.length && (
                            <button 
                                className={styles.showMoreButton}
                                onClick={() => setVisiblePastEvents(Math.min(visiblePastEvents + 5, pastEvents.length))}
                            >
                                Show More
                            </button>
                        )}
                        {visiblePastEvents >= pastEvents.length && pastEvents.length > 5 && (
                            <button 
                                className={styles.showMoreButton}
                                onClick={() => setVisiblePastEvents(5)}
                            >
                                Show Less
                            </button>
                        )}
                </div>

        </div>
    );
}

export default Events;
