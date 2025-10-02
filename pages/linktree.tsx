import React from 'react';
import Head from 'next/head';
import styles from '../styles/Linktree.module.css';

function Linktree() {
    const linktreeUrl = 'https://linktr.ee/soton_dsoc';
    
    // Generate QR code for the Linktree
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(linktreeUrl)}`;

    return (
        <>
            <Head>
                <title>dSoc Linktree</title>
                <meta name="description" content="Linktree for the Decentralised Society - Find all our links in one place" />
            </Head>
            <div className={styles.container}>
                <div className={styles.linktreeWrapper}>
                    <h1>dSoc Linktree</h1>
                    <p>Find all our links and resources in one place</p>
                    <div className={styles.qrCode}>
                        <img 
                            src={qrCodeUrl} 
                            alt="QR Code for dSoc Linktree" 
                            width={300} 
                            height={300}
                        />
                    </div>
                    <div className={styles.url}>
                        <p>{linktreeUrl}</p>
                    </div>
                    <div className={styles.info}>
                        <p>Scan this QR code to access our Linktree with all our social links, events, and resources!</p>
                    </div>
                    <div className={styles.directLink}>
                        <a href={linktreeUrl} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                            Open Linktree
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Linktree;
