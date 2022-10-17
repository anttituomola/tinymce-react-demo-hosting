import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "./App.css";

export default function App() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            console.log(editorRef.current.plugins.flite)
        }
    };

    const setAntti = () => {
        console.log(flite._userManager)
        console.log(editorRef.current.plugins.flite)
        flite._userManager.addUser({
            id: 'antti',
            name: 'Antti',
            style: {
                insert: {
                    color: 'blue'
                }
            }
        })
        flite._userManager.setCurrentUser('antti')
    }

    const setLauri = () => {
        flite._userManager.addUser({
            id: 'lauri',
            name: 'Lauri',
            style: {
                insert: {
                    color: 'red'
                }
            }
        })
        flite._userManager.setCurrentUser('lauri')
    }

    let flite;

    return (
        <div className="container">
            <Editor
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    height: 500,
                    width: 650,
                    menubar: true,
                    plugins: [
                        'flite',
                    ],
                    toolbar: 'flite',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                    setup: (editor) => {
                        editor.on('flite:init', (e) => {
                            flite = e.flite;
                        }
                        )
                    },
                }}
            />
            <button onClick={log}>Log editor content</button>
            <button onClick={setAntti}>Set Antti as user</button>
            <button onClick={setLauri}>Set Lauri as user</button>

        </div>
    );
}