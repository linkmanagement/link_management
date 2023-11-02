import React from 'react'
import dynamic from 'next/dynamic'
import styles from '@/styles/Home.module.css'
import Preview from '@/components/Preview'


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
# Role

The Director of Operations will be responsible for developing and implementing workflows, processes, analytics, and automation to enable the organization to operate more efficiently at scale. This role will create dashboards, workflows, and standard operating procedures to improve cross-functional communication and collaboration.

## Responsibilities

- Create and manage dashboards, workflows, analytics, and automation to improve efficiency
- Standardize processes and implement organizational changes to support scaling
- Design and implement communication cadences and meeting workflows
- Develop standard operating procedures and ensure adherence
- Identify areas for improvement through data analysis
- Manage special projects and drive change management initiatives

## Qualifications

- 5+ years experience in operations management
- Proficiency in PowerBi or similar business intelligence platforms
- Excellent project management and organizational skills
- Knowledge of workflow management tools like ClickUp, Asana, Airtable, and similar
- Demonstrated ability to analyze data and improve workflows
- Experience with operations automation and analytics
- Ability to collaborate with technology teams on solutions
- Strong communication and relationship-building abilities
- Change management experience
- Bachelor's degree required, Master’s preferred
- Experience in the NSFW is not required, but you should be ok with the nature of the industry
- Fluent in English

## Additional Info

- Salary: flexible range depending on experience + bonus/profit sharing opportunity
- Location: remote w/ option for relocation to Dubai (paid by the company)
- Hours: will become more standardized as the team grows, but flexible so long as the work is completed
- Extras: paid company retreats, learning stipend (education, conferences), home office (or co-working) and technology stipend
- Company: athos.com is our portfolio company - the company this product is for will be revealed during the interview process

## Core Values

We don’t believe in listing cliches like integrity, quality, fun, teamwork, or being customer-oriented. Integrity is not something you claim - it’s something you are. Quality is expected. Fun is like being cool - if you have to say it, you aren’t. Teamwork and being customer-oriented are common sense, and you should question any organization that has to highlight the importance of either.

Our 8 core values make a person capable and an organization competent:

- Speed
- Ownership
- Organization
- Communication
- Simplicity
- Numbers
- Execution
- Winning

Apply: By invitation only.
`;

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.top_container}>
        <div className={styles.logo}>
        </div>
        <div className={styles.role}>
          HIRING : DIRECTOR OF OPERATIONS
        </div>

        <Title title={"Warning: not your typical operations role"} />
        <p className={styles.prompt}>KINDLY WATCH THE VIDEO BELOW BEFORE APPLYING</p>
      </div>
      <div className={styles.video}>
        <iframe src="https://www.loom.com/embed/e5b8c04bca094dd8a5507925ab887002" frameBorder="0" allowFullScreen></iframe>
      </div>

      <Preview
        markdown={markdown} />

    </div>
  )
}