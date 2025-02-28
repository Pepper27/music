import { db } from "../db";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Buttonlike } from "../components/Buttonlike";
import { Buttonplay } from "../components/Buttonplay";

const Lovesong = () => {
    const [song, setSong] = useState([]);
    useEffect(() => {
        const arraySong = [];
        const getlikesong = ref(db, `songs`);
        onValue(getlikesong, (items) => {
            items.forEach(item => {
                const data = item.val();
                const key = item.key;
                console.log("singerId:", data.singerId);
                if (data.singerId && data.singerId.length > 0 && data.like === "true") {
                    const getsinger = ref(db, `singers/${data.singerId[0]}`);
                    onValue(getsinger, (item) => {
                        const datasinger = item.val();
                        arraySong.push(
                            {
                                keyson: key,
                                title: data.title,
                                image: data.image,
                                singer: datasinger.title,
                                statuslike: data.like,
                                audio: data.audio
                            }
                        )
                        setSong([...arraySong]);
                    })
                }
            });
        })
    }, [])
    return (
        <>
            {
                song.map((item, index) => (
                    <div className="Search" >
                        <div className="section_2" >
                            <div className='list'>
                                {
                                    <div className='box' >
                                        <div className='left'>
                                            <Buttonplay />
                                            <Link to={`/detail_song/${item.keysong}`} >
                                                <img src={item.image} alt="" />
                                            </Link>
                                            <h2>{item.title}</h2>
                                        </div>
                                        <div className='mid'>
                                            <p >{item.singer}</p>
                                        </div>
                                        <div className='right'>
                                            <p >4:32</p>
                                            <Buttonlike id={item.keyson} statuslike={item.statuslike} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );

};
export default Lovesong;