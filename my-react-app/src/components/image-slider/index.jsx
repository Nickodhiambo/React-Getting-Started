import { useState, useEffect } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import './style.css'

export default function ImageSlider(url, page = 1, limit = 10) {

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    // Make an API call to an image URL
    async function fetchImages(getUrl) {
        try {
            setLoading(true);
            const data = await (await fetch(`${getUrl}?page=${page}&limit=${limit}`)).json();
            if (data) {
                setImages(data);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            setErrorMsg(e.message);
        }
    }

    // Move images with left arrow
    function handlePrevious(){
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    }

    // Move images with right arrow
    function handleNext(){
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    }

    // Render the UI only if url is provided
    useEffect(() => {
        if (url !== '') {
            fetchImages(url)
        }
    }, [url])

    if (loading) {
        return (<div>Wait while the images load</div>)
    }

    if (errorMsg !== null) {
        return (<div>An error occurred: ${errorMsg}</div>)
    }
    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={() => handlePrevious()} className='arrow arrow-left' />
            {
                images && images.length ?
                    images.map((imageItem) => (
                        <img
                            key={imageItem.id}
                            src={imageItem.download_url}
                            alt={imageItem.download_url}
                            className={currentSlide === index ? 'current-image' : 'current-image hide-current-image'}
                        />
                    ))
                    : null
            }
            <BsArrowRightCircleFill onClick={() => handleNext()} className='arrow arrow-right' />

            <span className="circle-indicators">
                {
                    images && images.length ?
                        images.map((_, index) => (
                            <button className={currentSlide === index ? 'current-indicator' : 'current-indicator inactive-indicator'}
                                key={index}
                                onClick={setCurrentSlide(index)}>
                            </button>
                        ))
                        : null
                }
            </span>
        </div>
    )
}