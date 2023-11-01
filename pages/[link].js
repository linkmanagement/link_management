import { useRouter } from "next/router";

export default function Link(){
    
    const router = useRouter();
    let slug = router.query.link;
    return <div>Link {slug}</div>
}