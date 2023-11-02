import styles from "@/styles/admin.module.css"
import mobile_styles from "@/styles/admin.mobile.module.css"
import dynamic from "next/dynamic"
import { useState } from "react"
const Editor = dynamic(() => import('../components/Editor'), { ssr: false })

function AdminDesktop() {
    let [links, setLinks] = useState([
        {
            name: "link_1",
        },
        {
            name: "link_2",
        }
    ])
    let [selectedLink, setSelectedLink] = useState(null)
    let [role, setRole] = useState("")
    let [title, setTitle] = useState("")
    let [link, setLink] = useState("")
    let [video, setVideo] = useState("")
    return (
        <div className={styles.main}>
            <div className={styles.sidebar}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Enter link name" />
                </div>
                <div className={styles.link_container}>
                    {
                        links.map((link, index) => {
                            return (
                                <div className={styles.link} key={index} onClick={() => { setSelectedLink(link) }}>
                                    {link.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.right_panel}>
                <div className={styles.topbar}>
                    <div className={styles.adminTitle}><h1>Admin Dashboard</h1></div>
                    <button>Add New Link</button>
                    <button>Delete Link</button>
                </div>
                {
                    selectedLink &&
                    <div className={styles.main_content}>
                        <div className={styles.input_container}>
                            <h2>Role</h2>
                            <input type="text" placeholder="Role" onChange={(e) => { setRole(e.target.value) }} />
                            <button>Update</button>
                        </div>
                        <div className={styles.input_container}>
                            <h2>Title</h2>
                            <input type="text" placeholder="title" onChange={(e) => { setTitle(e.target.value) }} />
                            <button>Update</button>
                        </div>
                        <div className={styles.input_container}>
                            <h2>Link</h2>
                            <input type="text" placeholder="Link" onChange={(e) => { setLink(e.target.value) }} />
                            <button>Update</button>
                        </div>
                        <div className={styles.input_container} onChange={(e) => { setVideo(e.target.value) }}>
                            <h2>Video</h2>
                            <input type="text" placeholder="Video" />
                            <button>Update</button>
                        </div>

                        <Editor />
                    </div>

                }
                {
                    !selectedLink &&
                    <div className={styles.not_selected}>
                        <h1>Link Not Selected</h1>
                    </div>
                }

            </div>

        </div>
    )
}

const TAB_OPTIONS = {
    SEARCH: 'Search',
    EDIT: 'Edit',
    ADD: 'Add',
}

function AdminMobile() {

    let [pageMode, setPageMode] = useState(TAB_OPTIONS.SEARCH);

    return (
        <div className={mobile_styles.main}>
            <div className={mobile_styles.nav_bar}>

                <div className={mobile_styles.nav_bar_option} onClick={() => { setPageMode(TAB_OPTIONS.SEARCH) }}>
                    Search
                </div>
                <div className={mobile_styles.nav_bar_option} onClick={() => { setPageMode(TAB_OPTIONS.EDIT) }}>
                    Edit
                </div>
                <div className={mobile_styles.nav_bar_option} onClick={() => { setPageMode(TAB_OPTIONS.ADD) }}>
                    add
                </div>
            </div>

            {
                (pageMode == TAB_OPTIONS.SEARCH) &&
                <div className={mobile_styles.main_content}>
                    SEARCH
                </div>
            }


            {
                (pageMode == TAB_OPTIONS.EDIT) &&
                <div className={mobile_styles.main_content}>
                    EDIT
                </div>
            }


            {
                (pageMode == TAB_OPTIONS.ADD) &&
                <div className={mobile_styles.main_content}>
                    ADD
                </div>
            }
        </div>
    )
}
export default function Admin() {
    return (
        <AdminMobile />
    )
}