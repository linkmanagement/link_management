import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DOMpurify from 'dompurify';
import styles from '@/styles/Home.module.css'

function Preview({ markdown }) {
    return (
        <Markdown className={"markdown_div"} rehypePlugins={[rehypeRaw]}>{DOMpurify.sanitize(markdown)}</Markdown>
    )
}
export default Preview;