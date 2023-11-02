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

    }


    return <h1 className={styles.title}><span style={{ color: "#1880bd", marginRight: "10px" }}>{firstWord}</span>{secondWord}</h1>
}

let markdown = `
#
`;

export default function Home({ slug }) {

    // const router = useRouter();
    let [link, setLink] = useState(null);
    let [noData, setNoData] = useState(false);


    useEffect(() => {

        async function fetchData() {
            if (slug) {
                let data = await getLinkByName(slug);
                setLink(data);
                if(!data) setNoData(true);
            }
        }

        fetchData();

    }, [slug])

    if (!link) {
        return (
            <div className={styles.main} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1>
                   {
                          noData ? "No data found" : "Loading..."
                   }
                </h1>
            </div>
        )
    }

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
                    markdown={link.markdown} />

            }

        </div>
    )
}

export async function getServerSideProps({ params }) {
    // Use the slug from the URL to fetch data from your database
    const slug = params.link; // 'page' should match the dynamic segment in your route

    return {
        props: {
            slug,
        },
    };
}