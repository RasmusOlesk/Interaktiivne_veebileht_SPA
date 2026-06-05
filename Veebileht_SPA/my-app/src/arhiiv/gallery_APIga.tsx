import React, { useEffect, useState } from "react";
import "./gallery_API.css"

type Picture = {
    id: number;
    src: string;
};

const Gallery2: React.FC = () => {
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        fetch("https://api.pexels.com/v1/search?query=uniquecars&per_page=100", {
        headers: {
            Authorization: "B6KaA8FTkPC7j7GPE4BpocKCIDXJRdS60gA4qytSJQbOtc2eG2SSnYb0",
        },
        })
        .then((res) => res.json())
        .then((data) => {
            const pics = data.photos.map((photo: any) => ({
                id: photo.id,
                src: photo.src.large,
            }));
            setPictures(pics);
        });
    }, []);

    if (pictures.length === 0) return <p>Loading...</p>;

    const prevIndex = (current - 1 + pictures.length) % pictures.length;
    const nextIndex = (current + 1) % pictures.length;

    return(
        <div>
            <img src={pictures[prevIndex].src} style={{ width: "150px" }} />
            <img src={pictures[current].src} style={{ width: "300px" }} />
            <img src={pictures[nextIndex].src} style={{ width: "150px" }} />
        

            <br />
            <button onClick={() => setCurrent(prevIndex)}>Prev</button>
            <button onClick={() => setCurrent(nextIndex)}>Next</button>
        </div>
    );
};

export default Gallery2
