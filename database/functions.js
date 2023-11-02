import { app } from './firebase';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';
const database = getFirestore(app);


async function getAllLinks() {
    const linksColumn = collection(database, 'links');
    const linksSnapshot = await getDocs(linksColumn);
    const linksList = linksSnapshot.docs.map(documents => documents.data());
    return linksList;
}

async function upsertProduct(product) {
    const productsCollection = collection(database, 'products');
    const matchingProductsQuery = query(productsCollection, where('id', '==', product.id));
    const matchingProductsSnapshot = await getDocs(matchingProductsQuery);

    if (matchingProductsSnapshot.size === 0) {
        await addDoc(productsCollection, product);
    } else {
        const matchingProductDoc = matchingProductsSnapshot.docs[0];
        await updateDoc(matchingProductDoc.ref, product);
    }
}

async function updateRole(link, role) {
    const linksColumn = collection(database, 'links');
    const mathchedLinks = query(linksColumn, where('name', '==', link));
    const linksSnapshot = await getDocs(mathchedLinks);

    const matchedLink = linksSnapshot.docs[0];
    await updateDoc(matchedLink.ref, { role: role });

}

export {
    getAllLinks,
    updateRole
}