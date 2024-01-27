import Icon from '@mdi/react'
import { mdiThumbUp, mdiThumbDown, mdiCommentText } from "@mdi/js"
import { useNavigate } from 'react-router-dom'

export default function Post(props) {
    const navigate = useNavigate()

    const navigateToPost = () => {
        const target = `/posts/activepost`
        navigate(target, {
            state: {
                id: props.id
            }
        })
    }   

    return (
        <>
            <section className='trending-post'>
                <h2 className='post-title'>{props.title}</h2>
                <p className='post-text'>{props.text}</p>
                <section className='likes'>
                    <div className='likes-dislikes'>
                        <div className='likes'>
                            <Icon className='like' path={mdiThumbUp} size={2} />
                            <span className='like-count'>{props.likes}</span>
                        </div>
                        <div className='dislikes'>
                            <Icon className='dislike' path={mdiThumbDown} size={2} />
                            <span className='dislike-count'>{props.dislikes}</span>
                        </div>
                        <Icon path={mdiCommentText} size={2} />
                        <span className='comment-count'>{props.comments}</span>
                    </div>

                    <section className='post-buttons'>
                        <p className='hero-latest-post' id='read-post' onClick={() => {navigateToPost()}}>Read post</p>
                    </section>
                </section>
            </section>
        </>
    )
}