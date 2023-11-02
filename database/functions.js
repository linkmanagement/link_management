import { app } from './firebase';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';
const database = getFirestore(app);


async function getAllLinks() {
    const linksColumn = collection(database, 'links');
    const linksSnapshot = await getDocs(linksColumn);
    const linksList = linksSnapshot.docs.map(documents => documents.data());
    return linksList;
}



async function updateRole(link, role) {
    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', link));
    const linksSnapshot = await getDocs(mathchedLinks);

    const matchedLink = linksSnapshot.docs[0];
    await updateDoc(matchedLink.ref, { role: role });

}

async function updateTitle(link, title) {
    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', link));
    const linksSnapshot = await getDocs(mathchedLinks);

    const matchedLink = linksSnapshot.docs[0];
    await updateDoc(matchedLink.ref, { title: title });

}

async function updateVideo(link, video) {
    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', link));
    const linksSnapshot = await getDocs(mathchedLinks);

    const matchedLink = linksSnapshot.docs[0];
    await updateDoc(matchedLink.ref, { video: video });

}

async function updateMarkdown(link, markdown) {
    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', link));
    const linksSnapshot = await getDocs(mathchedLinks);

    const matchedLink = linksSnapshot.docs[0];
    await updateDoc(matchedLink.ref, { markdown: markdown });
}

async function updateName(link, name) {
    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', link));
    const linksSnapshot = await getDocs(mathchedLinks);

    const matchedLink = linksSnapshot.docs[0];
    await updateDoc(matchedLink.ref, { name: name });
}

async function addLink(name) {

    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', name));
    const linksSnapshot = await getDocs(mathchedLinks);

    if (linksSnapshot.docs.length !== 0) {
        return "A link with the same username exists!";
    }
    else {
        await addDoc(linksColumn, {
            name: name,
            role: "",
            title: "",
            video: "",
            markdown: "",
        });
        return "Successfully created a new link!";
    }


}



async function deleteLink(name) {

    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', name));
    const linksSnapshot = await getDocs(mathchedLinks);

    if (linksSnapshot.size === 0) {
        return null;
    }

    const linkDoc = linksSnapshot.docs[0];
    await deleteDoc(linkDoc.ref);

    return linkDoc.data();
}

async function getLinkByName(name) {

    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', name));
    const linksSnapshot = await getDocs(mathchedLinks);

    if (linksSnapshot.size === 0) {
        return null;
    }
    else {
        return linksSnapshot.docs[0].data();
    }

}

export {
    getAllLinks,
    updateRole,
    updateTitle,
    updateVideo,
    updateMarkdown,
    updateName,
    addLink,
    deleteLink,
    getLinkByName
}