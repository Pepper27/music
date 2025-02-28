import { FaPlay } from "react-icons/fa";
import { onValue, ref } from "firebase/database";
import { db } from "../db";
import { useEffect, useState } from "react";
export const Buttonplay = (props) => {
    const { id } = props;
    const [newid, setNewid] = useState(1);
    const [arraytop, setArraytop] = useState([]);
    useEffect(() => {
        const arraytopSong = [];
        const topSong = ref(db, `songs/${newid}`);
        onValue(topSong, (item) => {
            const data = item.val();//noi dung ben trong
            const key = item.key;// khoa cua noi dung
            if (arraytopSong.length < 3) {
                const Id = data.singerId[0];
                const singer = ref(db, `singers/${Id}`);
                onValue(singer, (item) => {
                    const datasinger = item.val();//noi dung ben trong
                    arraytopSong.push(
                        {
                            id: key,
                            image: data.image,
                            title: data.title,
                            singer: datasinger.title,
                            listen: data.listen,
                            audio: data.audio
                        }
                    )
                    setArraytop(...[arraytopSong]);
                })
            }
        })
    }, [newid]);

    const lieuClick = () => {
        setNewid(id);
        if (arraytop) {
            const playImage = document.querySelector(".play-image");
            const playName = document.querySelector(".play-name");
            const playSinger = document.querySelector(".play-singer");
            playImage.src = arraytop[0]?.image;
            playName.innerHTML = arraytop[0]?.title;
            playSinger.innerHTML = arraytop[0]?.singer;
            const innerAudio = document.querySelector(".inner-audio");
            const source = innerAudio.querySelector("source");
            source.src = arraytop[0]?.audio;
            innerAudio.load();
            innerAudio.oncanplay = () => {
                innerAudio.play();
            };
        }

    }
    return (
        <>
            <div className="Buttonplay" >
                <button className='box_rightt' onClick={lieuClick}>
                    <FaPlay />
                </button>
            </div>
        </>
    )
}