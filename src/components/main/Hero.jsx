import { useNavigate } from "react-router-dom"

function Hero(props) {
    const navigate = useNavigate();

    const navigateToPost = () => {
        const target = `/posts/activepost`
        navigate(target, {
            state: {
                id: props.latestPost._id
            }
        })
    }

    return (
        <section className='hero'>
            <section className='hero-container-1'>
                <h2 className='hero-title'>Read your mind away</h2>
                <p className='hero-subtitle'>View, like and comment on your favourite posts...</p>
            </section>
            <section className='hero-container-2'>
                <p className='hero-latest-post' onClick={navigateToPost}>Latest post: {props.latestPost.title}</p>
            </section>
        </section>
    )
}

export default Hero