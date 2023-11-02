import styles from "@/styles/admin.module.css"
import mobile_styles from "@/styles/admin.mobile.module.css"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import useLinks from "@/hooks/useLinks"
const Editor = dynamic(() => import('../components/Editor'), { ssr: false })
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function AdminDesktop() {

    let [selectedLink, setSelectedLink] = useState(null)

    let [isAdding, setIsAdding] = useState(false);

    let {
        links,
        role, setRole,
        title, setTitle,
        link, setLink,
        video, setVideo,

        notification,

        updateRoleInDatabase
    } = useLinks(selectedLink);


    const notify = (notification) => toast(notification);


    return (
        <div className={styles.main}>
            {
                isAdding &&
                <div className={styles.overlay}>
                    <div className={styles.add_box}>


                        <div className={styles.close_overlay}>
                            <h2>Adding New Link</h2>

                        </div>
                        <div className={styles.add_box_main}>
                            <input type="text" placeholder="Enter link name" />
                            <div className={styles.overlay_buttons}>


                                <button onClick={() => { setIsAdding(!isAdding) }}
                                >cancel</button>
                                <button onClick={() => { setIsAdding(!isAdding) }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.sidebar}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Enter link name"

                        onChange={(e) => { setSelectedLink(null) }}
                    />
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
                    <div className={styles.adminTitle}><h1>
                        {
                            selectedLink ? "https://link-management.onrender.com/" + selectedLink?.name : "Admin Dashboard"
                        }
                    </h1></div>
                    <button onClick={() => { setIsAdding(true) }}>Add New Link</button>
                    {
                        selectedLink &&
                        <button>Delete Link</button>
                    }
                </div>
                {
                    selectedLink &&
                    <div className={styles.main_content}>
                        <div className={styles.input_container}>
                            <h2>Name</h2>
                            <input type="text" placeholder="Name" value={link} onChange={(e) => { setLink(e.target.value) }} />
                            <button>Update</button>
                        </div>
                        <div className={styles.input_container}>
                            <h2>Role</h2>
                            <input type="text" placeholder="Role" value={role} onChange={(e) => {
                                setRole(e.target.value);

                            }} />
                            <button
                                onClick={async () => {
                                    await updateRoleInDatabase();
                                    notify(notification);
                                }}
                            >Update</button>
                        </div>
                        <div className={styles.input_container}>
                            <h2>Title</h2>
                            <input type="text" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            <button>Update</button>
                        </div>
                        <div className={styles.input_container}>
                            <h2>Video</h2>
                            <input type="text" placeholder="Video" value={video} onChange={(e) => { setVideo(e.target.value) }} />
                            <button>Update</button>
                        </div>

                        <Editor />
                        <div className={styles.input_container} onChange={(e) => { setVideo(e.target.value) }}>
                            <button>Update</button>
                        </div>
                    </div>

                }
                {
                    !selectedLink &&
                    <div className={styles.not_selected}>
                        <h1>Link Not Selected</h1>
                    </div>
                }

            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark" />
        </div>
    )
}

const TAB_OPTIONS = {
    SEARCH: 'Search',
    EDIT: 'Edit',
    ADD: 'Add',
}

function AdminMobile() {

    let [selectedLink, setSelectedLink] = useState(null);

    let {
        links,
        role, setRole,
        title, setTitle,
        link, setLink,
        video, setVideo,
        setMarkdown, markdown
    } = useLinks(selectedLink);

    let [pageMode, setPageMode] = useState(TAB_OPTIONS.SEARCH);

    return (
        <div className={mobile_styles.main}>
            <div className={mobile_styles.nav_bar}>

                <div className={mobile_styles.nav_bar_option} onClick={() => { setPageMode(TAB_OPTIONS.SEARCH) }}>
                    <button
                        style={{ backgroundColor: `${(TAB_OPTIONS.SEARCH == pageMode ? "#1e3d6e" : "#4d91ff")}` }}
                    >Search</button>
                </div>
                <div className={mobile_styles.nav_bar_option}>
                    <button
                        style={{ backgroundColor: `${(TAB_OPTIONS.EDIT == pageMode ? "#1e3d6e" : "#4d91ff")}` }}
                    >Edit</button>
                </div>
                <div className={mobile_styles.nav_bar_option} onClick={() => { setPageMode(TAB_OPTIONS.ADD) }}>
                    <button
                        style={{ backgroundColor: `${(TAB_OPTIONS.ADD == pageMode ? "#1e3d6e" : "#4d91ff")}` }}
                    >Add</button>
                </div>
            </div>

            {
                (pageMode == TAB_OPTIONS.SEARCH) &&
                <div className={mobile_styles.main_content}>
                    <div className={mobile_styles.searchBar}>
                        <input type="text" placeholder="Enter link name" />
                    </div>
                    <div className={mobile_styles.link_container}>
                        {
                            links.map((link, index) => {
                                return (
                                    <div className={mobile_styles.link} key={index} onClick={() => { setSelectedLink(link); setPageMode(TAB_OPTIONS.EDIT) }}>
                                        {link.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }


            {
                (pageMode == TAB_OPTIONS.EDIT) &&
                <div className={mobile_styles.main_content}>

                    <div className={mobile_styles.input_container}>
                        <h2>Name</h2>
                        <input type="text" placeholder="Name" onChange={(e) => { setLink(e.target.value) }} value={link} />
                        <button>Update</button>
                    </div>
                    <div className={mobile_styles.input_container}>
                        <h2>Role</h2>
                        <input type="text" placeholder="Role" onChange={(e) => { setRole(e.target.value) }} value={role} />
                    </div>
                    <div className={mobile_styles.input_container}>
                        <h2>Title</h2>
                        <input type="text" placeholder="title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                        <button>Update</button>
                    </div>

                    <div className={mobile_styles.input_container}>
                        <h2>Video</h2>
                        <input type="text" placeholder="Video" onChange={(e) => { setVideo(e.target.value) }} value={video} />
                        <button>Update</button>
                    </div>
                    <div>
                        <Editor markdown={markdown} setMarkdown={setMarkdown} />
                    </div>

                    <div className={mobile_styles.input_container} onChange={(e) => { setVideo(e.target.value) }}>
                        <button>Update</button>
                    </div>
                </div>
            }


            {
                (pageMode == TAB_OPTIONS.ADD) &&
                <div className={mobile_styles.main_content}>



                    <div className={mobile_styles.adding_link}>
                        <h2>Adding New Link</h2>

                    </div>
                    <div className={mobile_styles.add_box_main}>
                        <input type="text" placeholder="Enter link name" />
                        <div className={styles.overlay_buttons}>

                            <button onClick={() => { setIsAdding(!isAdding) }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default function Admin() {

    return (
        <>
            <AdminMobile />
            <AdminDesktop />
        </>
    )
}