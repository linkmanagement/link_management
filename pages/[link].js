import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from '@/styles/Home.module.css'
import Preview from '@/components/Preview'
import { getLinkByName } from "@/database/functions";



function isValidVideoLink(videoLink) {
    // Check if videoLink starts with "http://" or "https://"
    return videoLink && (videoLink.startsWith("http://") || videoLink.startsWith("https://"));
}

function Title({ title }) {


    // Find the index of the first space in the string
    var spaceIndex = title.indexOf(" ");

    let firstWord = "";
    let secondWord = "";
    if (spaceIndex !== -1) {
        // Split the string based on the first space position
        firstWord = title.substring(0, spaceIndex);
        secondWord = title.substring(spaceIndex + 1);

        console.log("firstWord:", firstWord);
        console.log("secondWord:", secondWord);
    } else {
        console.log("The string does not contain a space.");
    }


    return <h1 className={styles.title}><span style={{ color: "#ff4500", marginRight: "10px" }}>{firstWord}</span>{secondWord}</h1>
}

let markdown = `
#
`;

export default function Home({ slug }) {

    // const router = useRouter();
    let [link, setLink] = useState(null);


    useEffect(() => {

        async function fetchData() {
            if (slug) {
                let data = await getLinkByName(slug);
                setLink(data);
            }
        }

        fetchData();

    }, [slug])

    return (
        <div className={styles.main}>
            <div className={styles.top_container}>
                <div className={styles.logo}>
                </div>
                <div className={styles.role}>
                    {link ? ("HIRING : " + link.role) : "HIRING"}
                </div>

                <Title title={link ? link.title : "Warning: not your typical operations role"} />
                <p className={styles.prompt}>KINDLY WATCH THE VIDEO BELOW BEFORE APPLYING</p>
            </div>
            <div className={styles.video}>
                {
                    link && isValidVideoLink(link.video) && (
                        <iframe src={link.video} frameBorder="0" allowFullScreen></iframe>
                    )
                }
            </div>
            {
                link && link.markdown &&
                <Preview
                    markdown={markdown} />

            }

        </div>
    )
}

export async function getServerSideProps({ params }) {
    // Use the slug from the URL to fetch data from your database
    const slug = params.link; // 'page' should match the dynamic segment in your route
    console.log('ok', slug)

    return {
        props: {
            slug,
        },
    };
}