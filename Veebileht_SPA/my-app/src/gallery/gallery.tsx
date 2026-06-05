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
    { id: 1, src: "https://upload.wikimedia.org/wikipedia/commons/e/ea/2018_Mazda6_Sport_NAV%2B_Diesel_2.2_Front.jpg"},
    { id: 2, src: "https://i.pinimg.com/736x/0c/65/e3/0c65e39c227b3faff63d40d5a35f82f5.jpg"},
    { id: 3, src: "https://cdn.modera.org/resized/3000x2000/s/a0fba38b-2a69-417b-a924-f422aac51ca3/web/usedcars/69e206f68ee37"},
    { id: 4, src: "https://content.deal-drive.com/images/c2601760521e6f2b99a5affa3be5333e85f7b713aded5cab4d0b595363b43a90.jpg"},
    { id: 5, src: "https://mzauto.ee/wp-content/uploads/2021/10/vaz1.jpg"},
    { id: 6, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf2JGx3IiL_pxoIGyH-10KFOhPFMSfR3ob3A&s"},
    { id: 7, src: "https://img13.img-bcg.eu/h32/3ca0eb/s1/v2/205311974.jpg"},
    { id: 8, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNEplKrrOv32FIpHGQrbNbt7oPJ-ifbhUoQA&s"},
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