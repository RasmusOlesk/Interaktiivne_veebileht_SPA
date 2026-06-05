import React, { useEffect }  from "react";
import "./gallery.css"

type Picture = {
    id: number;
    src: string;
};

type GalleryProps = {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export const pictures: Picture [] = [  // Muutuja pilt mis kasutab type Pictures'i kui järjendit, mis võrdub järjendis olevad pildid
    { id: 1, src: "https://www.classicandsportscar.com/sites/default/files/styles/slideshow_slide/public/2018-03/01_designers_favourite_cars_mercedes_300sl.png"},
    { id: 2, src: "https://www.classicandsportscar.com/sites/default/files/styles/slideshow_slide/public/2018-03/12_designers_favourite_cars_lamborghini_countach.png"},
    { id: 3, src: "https://www.classicandsportscar.com/sites/default/files/styles/slideshow_slide/public/2018-03/11_designers_favourite_cars_dino_206s.png"},
    { id: 4, src: "https://www.classicandsportscar.com/sites/default/files/styles/slideshow_slide/public/2018-03/10_designers_favourite_cars_cord_810_812.png"},
    { id: 5, src: "https://www.classicandsportscar.com/sites/default/files/styles/slideshow_slide/public/2018-03/19_designers_favourite_cars_ford_GT40.png"},
    { id: 6, src: "https://www.classicandsportscar.com/sites/default/files/styles/slideshow_slide/public/2018-03/02_designers_favourite_cars_Ferrari_P3_4.png"},
    { id: 7, src: "https://www.classicandsportscar.com/sites/default/files/styles/slideshow_slide/public/2018-03/00_designers_favourite_cars_lead.png"},
    { id: 8, src: "https://www.classicandsportscar.com/sites/default/files/styles/slideshow_slide/public/2018-03/20_designers_favourite_cars_hispano.png"},
];


const Gallery: React.FC<GalleryProps> = ({ current, setCurrent }) => {

    useEffect(() => {  // võimaldab teha kõrval effecte ning uuendab DOM'i otse
        const activatedPic = document.querySelector('.image.active');  // muutja, mis vaatab milline pilt sai klassi .image.active
        const handleTransition = () => {
            activatedPic?.classList.add('ready');  // ? siin rea sees, kui see asi ei ole tühi või null, siis anna väärtus.
        };

        activatedPic?.addEventListener('transitionend', handleTransition);

        return() => activatedPic?.removeEventListener('transitionend', handleTransition)
    }, [current])
  
    const prevIndex = (current - 1 + pictures.length) % pictures.length; // muutuja prevIndex - kalkuleerib välja indeks numbri mis on eelmine ees kuvatavast pildist
    const prevHiddenIndex = (current - 2 + pictures.length) % pictures.length; // kalkulatsioon üleeelmiseks pildiks
    const nextIndex = (current + 1) % pictures.length; // muutuja mis kalkuleerib järgmise indeksi
    const nextHiddenIndex = (current + 2) % pictures.length;  // kalkulatsioon ülejärgmiseks pildiks
        

    return (
        <div>
            <div className="gallery-container">
                <div className="gallery">
                    {pictures.map((pic, index) => { // vaatab kas väärtus pic on järjendis ning väljastab indexi
                        let className = "image";  // let muutuja mis on antud bloki ülene, saab uuendada aga mitte uuest määrata

                        if (index === current) className += " active";
                        else if (index === prevIndex) className += " prev";
                        else if (index === nextIndex) className += " next";
                        else if (index === prevHiddenIndex) className += " prevHidden";
                        else if (index === nextHiddenIndex) className += " nextHidden";
                        else className += " hidden"; // if loogika täiendab piltide klassi nimetust olenevalt id staatusest. Iga klass muudab stiili väärtuseid, mis tekitab liikuva galerii efekti.

                        return (
                            <img
                            key={pic.id}
                            src={pic.src}
                            className={className}  // klassile antakse väärtus eelneva let muutuja järgi
                            onClick={() => setCurrent(index)}
                            />
                        );
                    })}
                </div>
                <div className="controls">
                    <button onClick={() => setCurrent(prevIndex)}>◀</button>
                    <button onClick={() => setCurrent(nextIndex)}>▶</button>
                </div>
            </div>
        </div>
    )
}

export default Gallery