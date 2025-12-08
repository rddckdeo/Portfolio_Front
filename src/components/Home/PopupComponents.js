// eslint-disable-next-line
import React, {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import styles from '../../css/Popup.module.css'

const PopupComponents = ({mdFile}) => {
    const [content, setContent] = useState("");
    useEffect(() => {
        if(!mdFile)return;
        fetch(mdFile)
            .then(res => res.text())
            .then(text => setContent(text))
            .catch(err => console.error("Markdown load error", err));
    },[mdFile]);
    return (
        <div className={styles.markdownBody}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}>
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default PopupComponents