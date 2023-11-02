const { getAllLinks, updateRole } = require("@/database/functions");
const { useState, useEffect } = require("react");



function useLinks(selectedLink) {

    let [links, setLinks] = useState([]);
    let [role, setRole] = useState("")
    let [title, setTitle] = useState("")
    let [link, setLink] = useState("")
    let [video, setVideo] = useState("")
    let [markdown, setMarkdown] = useState("");
    let [refetch, setRefetch] = useState(false);


    let [notification, setNotification] = useState("Notification!");




    async function updateRoleInDatabase() {
        setNotification("Successfully updated role!")
        await updateRole(selectedLink.name, role);
        setRefetch(!refetch);

    }

    useEffect(() => {
        async function getLinksFromDatabase() {
            let fetchedLinks = await getAllLinks();
            setLinks(fetchedLinks);
        }

        getLinksFromDatabase();

    }, [refetch])

    useEffect(() => {

        if (selectedLink) {
            setRole(selectedLink.role);
            setTitle(selectedLink.title);
            setLink(selectedLink.name);
            setVideo(selectedLink.video);
            setMarkdown(selectedLink.markdown);
        }


    }, [selectedLink])


    return {
        links,

        role, setRole,
        title, setTitle,
        link, setLink,
        video, setVideo,
        markdown, setMarkdown,

        updateRoleInDatabase,
        notification
    }

}
export default useLinks;