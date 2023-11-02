const { getAllLinks, updateRole, updateTitle, updateVideo, updateMarkdown, updateName, addLink, deleteLink } = require("@/database/functions");
const { useState, useEffect } = require("react");



function useLinks(selectedLink, setSelectedLink) {

    let [links, setLinks] = useState([]);
    let [role, setRole] = useState("")
    let [title, setTitle] = useState("")
    let [link, setLink] = useState("")
    let [newLink, setNewLink] = useState("")
    let [video, setVideo] = useState("")
    let [markdown, setMarkdown] = useState("");
    let [refetch, setRefetch] = useState(false);
    let [forceRender, setForceRender] = useState(false);

    let [keyword, setKeyword] = useState("");








    async function updateRoleInDatabase() {

        await updateRole(selectedLink.name, role);
        setRefetch(!refetch);
        return "Successfully updated role!"


    }

    async function updateTitleInDatabse() {
        await updateTitle(selectedLink.name, title);
        setRefetch(!refetch);
        return "Successfully updated title!"

    }

    async function updateVideoInDatabase() {
        await updateVideo(selectedLink.name, video);
        setRefetch(!refetch);
        return "Successfully updated video!"

    }

    async function updateMarkdownInDatabase() {
        await updateMarkdown(selectedLink.name, markdown);
        setRefetch(!refetch);
        return "Successfully updated markdown!"

    }

    async function updateNameInDatabase() {

        if (link.includes(" ")) return "username can't have space"
        let exists = false;
        for (let i = 0; i < links.length; i++) {
            if (link == links[i].name) {
                console.log('came here');
                console.log(selectedLink.name, links[i].name);
                exists = true;
                break;
            }
        }

        if (exists) {
            return "A link with this name already exists!"
        }
        else {
            await updateName(selectedLink.name, link);
            setRefetch(!refetch);
            return "Updated!";
        }

    }

    async function createLinkInDatabase() {
        if (newLink.includes(" ")) return "username can't have space"
        let result = await addLink(newLink);
        if (result === "Successfully created a new link!") {
            setRefetch(!refetch)
        }
        return result;

    }

    async function deleteLinkFromDatabase() {
        if (!selectedLink) return "Link Not Selected";
        await deleteLink(selectedLink?.name);
        setSelectedLink(null);
        setRefetch(!refetch);
        return "Link has been deleted!"
    }

    useEffect(() => {
        async function getLinksFromDatabase() {
            let fetchedLinks = await getAllLinks();
            if (selectedLink && link !== selectedLink.name) {
                for (let i = 0; i < fetchedLinks.length; i++) {
                    if (link == fetchedLinks[i].name) {
                        setSelectedLink(fetchedLinks[i]);
                        break;
                    }
                }
            }
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
            setForceRender(!forceRender);
        }


    }, [selectedLink])




    return {
        links,

        role, setRole,
        title, setTitle,
        link, setLink,
        video, setVideo,
        markdown, setMarkdown,
        newLink, setNewLink,
        keyword, setKeyword,
        forceRender,

        updateRoleInDatabase,
        updateTitleInDatabse,
        updateVideoInDatabase,
        updateMarkdownInDatabase,
        updateNameInDatabase,
        createLinkInDatabase,
        deleteLinkFromDatabase


    }

}
export default useLinks;