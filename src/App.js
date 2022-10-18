import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "./App.css";



export default function App() {
    const [changeElements, setChangeElements] = useState([]);
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };


    const logData = () => {
        if (editorRef.current) {
            const editorContent = editorRef.current.getContent();
            console.log(typeof editorContent);
            const spans = /<span.*?<\/span>/gms
            // convert spans into array of objects
            const spansArray = editorContent.match(spans)
            console.log(spansArray)
            const matchEl = []
            for (const row in spansArray) {
                const osuma = {}
                console.log(spansArray[row])
                const row2 = spansArray[row]
                const regex = /<span(?:.*?)>(?<content>.*?)<\/span>|data-username="(?<name>.*?)"/gms;
                for (const match of row2.matchAll(regex)) {
                    const { content } = match.groups;
                    console.log(content);
                    osuma.content = content
                }
                const regex2 = /data-username="(?<name>.*?)"/gms
                for (const match of row2.matchAll(regex2)) {
                    const { name } = match.groups;
                    console.log(name);
                    osuma.name = name
                }
                const regexTime = /data-time="(?<time>.*?)"/gms
                for (const match of row2.matchAll(regexTime)) {
                    const { time } = match.groups;
                    console.log(time);
                    osuma.time = time
                }
                matchEl.push(osuma)
            }
            console.log(matchEl)
            renderChangeElements(matchEl)
        }
    };

    const renderChangeElements = (matchEl) => {
        const theArray = matchEl.map(change => {
            return (
                <div key={change.time}>
                    <h2>{change.name}</h2>
                    <p>{change.content}</p>
                    <p>{change.time}</p>
                </div>
            )
        })
        setChangeElements(theArray)
    }

    const setAntti = () => {
        const anttiUser = flite._userManager.getUser("antti")
        if (!anttiUser) {
            flite._userManager.addUser({
                id: 'antti',
                name: 'Antti',
                style: {
                    insert: {
                        color: 'blue'
                    }
                }
            })
        }
        flite._userManager.setCurrentUser('antti')
        editorRef.current.focus()
    }

    const setLauri = () => {
        const lauriUser = flite._userManager.getUser("lauri")
        if (!lauriUser) {
            flite._userManager.addUser({
                id: 'lauri',
                name: 'Lauri',
                style: {
                    insert: {
                        color: 'red'
                    }
                }
            })
        }
        flite._userManager.setCurrentUser('lauri')
        editorRef.current.focus()
    }

    let flite;

    return (
        <>
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
                        content_style: 'body { font-family:,Arial,sans-serif; font-size:14px }',

                        setup: (editor) => {
                            editor.on('flite:init', (e) => {
                                flite = e.flite;
                            }
                            )
                        },
                    }}
                />
                <div className='muutoshistoriaElement'>
                    Muutoshistoria
                    {changeElements}
                </div>
            </div>
            <div className='buttonContainer'>
                <button onClick={log}>Log editor content</button>
                <button onClick={logData}>Log data</button>
                <button onClick={setAntti}>Set Antti as user</button>
                <button onClick={setLauri}>Set Lauri as user</button>
            </div >
        </>
    );
}