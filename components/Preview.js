import Markdown from "react-markdown";
import styles from '@/styles/Home.module.css'

function Preview({ markdown }) {
    return (
        <Markdown className={"markdown_div"}>{markdown}</Markdown>
    )
}
export default Preview;