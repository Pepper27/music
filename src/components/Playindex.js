import { FaPlay } from "react-icons/fa";

export const Playindex = ({ item }) => {
    const lieuClick = () => {
        const MusicPlay = document.querySelector(".MusicPlay")
        if (MusicPlay) {
            const playImage = MusicPlay.querySelector(".play-image");
            const playName = MusicPlay.querySelector(".play-name");
            const playSinger = MusicPlay.querySelector(".play-singer");
            playImage.src = item.image;
            playName.innerHTML = item.title;
            playSinger.innerHTML = item.singer;
            const innerAudio = MusicPlay.querySelector(".inner-audio");
            const source = innerAudio.querySelector("source");
            source.src = item.audio;
            innerAudio.load();
            innerAudio.oncanplay = () => {
                innerAudio.play();
            };
        }
    }
    return (
        <>
            <button className='box_rightt'
                onClick={lieuClick}><FaPlay /></button>
        </>
    )
}
