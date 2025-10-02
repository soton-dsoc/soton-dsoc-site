import Image, { StaticImageData } from 'next/image';
import React, { useEffect } from 'react';
import styles from '../styles/EventObject.module.css';

function EventObject(props: any) {

    const eventData = props.data;
    const [ active, setActive ] = React.useState(false);

    const key: number = eventData ? eventData.key : "";
    const title: string = eventData ? eventData.title : "";
    const date: string = eventData ? eventData.date.toString() : "";
    const location: string = eventData ? eventData.location : "";
    const abstract: string[] = eventData ? eventData.abstract : [];
    const organisers: string[] = eventData ? eventData.organisers : [];
    const speakers: string[] = eventData ? eventData.speakers : [];
    const learningOutcomes: string[] = eventData ? eventData.learningOutcomes : [];
    const media = eventData ? eventData.media : []

    function getHeight() {
        const elem = document.getElementById(`collapsible${key}`);
        console.log(elem?.scrollHeight);
        return elem?.scrollHeight;
    }

    // Helper function to convert URLs to clickable links
    function convertUrlsToLinks(text: string) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, index) => {
            if (urlRegex.test(part)) {
                return (
                    <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#0066FF', textDecoration: 'underline' }}>
                        {part}
                    </a>
                );
            }
            return part;
        });
    }

    // Extract sign-up link from abstract for upcoming events
    function getSignUpLink() {
        if (props.category !== "upcoming") return null;
        const signUpText = abstract.find(text => text.includes("Sign up here:"));
        if (signUpText) {
            const urlMatch = signUpText.match(/(https?:\/\/[^\s]+)/);
            return urlMatch ? urlMatch[0] : null;
        }
        return null;
    }

    // have the upcoming events open by default
    useEffect(() => {
        if (props.category === "upcoming") {
            setActive(true)
        }
    })

    return(
        <div className={styles.wrapper}>
            {/* <div className={styles.box} style={{ background: `${props.category === "upcoming" ? "linear-gradient(90deg, #9000A8, #0066FF)" : ""}`}} onClick={() => setActive(!active)}> */}
            <div className={`${styles.box} ${props.category === "upcoming" ? styles.upcoming : ""}`} onClick={() => setActive(!active)}>
                <div className={styles.title}>
                    {props.category === "upcoming" && getSignUpLink() ? (
                        <a 
                            href={getSignUpLink()} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                            {title}
                        </a>
                    ) : (
                        title
                    )}
                </div>
                <div className={styles.date}>{date}</div>
            </div>
            <div className={`${styles.collapsible} ${active ? styles.active : ""}`} id={`collapsible${key}`} style={{ maxHeight: active ? getHeight() : 0}}>
                <div className={styles.collapWrap} id={styles.collapWrap}>
                    <div className={styles.left}>
                        <div className={styles.abstract}>
                            <div className={styles.title}>Abstract</div>
                            {
                                abstract.map((s: string, i: number) =>
                                    <p key={i}>{convertUrlsToLinks(s)}</p>
                                )
                            }
                        </div>
                        <div className={styles.media}>
                            {
                                media.map((m: string, i: number) => 
                                    <div className={styles.imageContainer} key={i}>
                                        <Image 
                                            className={styles.image} 
                                            src={`/${m}`} 
                                            alt={`Event image for ${title}`}
                                            width={600}
                                            height={400}
                                            style={{ borderRadius: "10px", objectFit: "contain"}}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div style={{ display: `${props.category === "past" ? "block" : "none"}`}}>
                            <p>This event has passed</p>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.dateAndLocation}>
                            <div className={styles.title}>Date and Location</div>
                            <p>{date}</p>
                            <p>{location}</p>
                        </div>
                        <div className={styles.organisers}>
                            <div className={styles.title}>Organisers</div>
                            {
                                organisers.map((organiser: string, i: number) =>
                                    <p key={i}>{organiser}</p>
                                )
                            }  
                        </div>
                        <div className={styles.speakers}>
                            <div className={styles.title}>Speakers</div>
                            {
                                speakers.map((speaker: string, i: number) => 
                                    <p key={i}>{speaker}</p>
                                )
                            }
                        </div>
                        <div className={styles.learningOutcomes}>
                            <div className={styles.title}>Learning Outcomes</div>
                            {
                                learningOutcomes.map((outcome: string, i: number) => 
                                    <p key={i}>{outcome}</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventObject;