import React from 'react'

const EditHistoryElement = (flite) => {
    const showChanges = () => {
        console.log(flite)
    }
    console.log(flite._tracker?._changes)
    console.log(flite)
    const changes = flite._tracker?._changes.map(change => {
        return <h2>This is change</h2>
    })
    return (
        <>
            <div>EditHistoryElement</div>
            <button onClick={showChanges}>Changes</button>
            {changes}
        </>
    )
}

export default EditHistoryElement