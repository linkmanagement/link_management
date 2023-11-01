// You can use this code in a separate component that's imported in your pages.
import '@mdxeditor/editor/style.css';
import React, { useState } from 'react';
const { MDXEditor, codeBlockPlugin, headingsPlugin, listsPlugin, linkPlugin, quotePlugin, markdownShortcutPlugin, useCodeBlockEditorContext } = await import('@mdxeditor/editor')
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { BlockTypeSelect, CreateLink, linkDialogPlugin } from '@mdxeditor/editor';




const PlainTextCodeEditorDescriptor = {
    match: () => true,
    priority: 0,
    Editor: (props) => {
        const cb = useCodeBlockEditorContext()
        return (
            <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
                <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
            </div>
        )
    }
}

function Editor() {
    
    return (
        <div>
            <MDXEditor
                markdown={""}
                contentEditableClassName="prose"
                plugins={[
                    codeBlockPlugin({ codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
                    headingsPlugin(),
                    listsPlugin(),
                    linkPlugin(),
                    quotePlugin(),
                    markdownShortcutPlugin(),
                    linkDialogPlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (<>
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <CreateLink />
                            <BlockTypeSelect />
                        </>)
                    })
                ]}
            />
        </div>
    )


}

export default Editor