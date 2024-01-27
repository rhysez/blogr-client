import * as React from "react"

const Comment = (props) => {

    return (
        <section className='comment'>
            <p className='comment-text'>{props.text}</p>
            <strong><p className='comment-user'>posted by {props.user}</p></strong>
        </section>
    )
}

export default Comment