import Markdown from "react-markdown";

function Preview({markdown}){
    return (
        <Markdown>{markdown}</Markdown>
    )
}
export default Preview;