import { db } from "../db";
import { onValue, ref } from "firebase/database";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlay, FaRegHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export const Search = () => {
    const [songs, setSongs] = useState([]);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    useEffect(() => {
        const array = [];
        const getsong = ref(db, 'songs/');
        onValue(getsong, (items) => {
            items.forEach(itemSong => {
                const dataSong = itemSong.val();
                const cleanTitle = dataSong.title.trim().toLowerCase();
                const cleanKeyword = keyword.trim().toLowerCase();
                if (dataSong.title && cleanTitle.includes(cleanKeyword) && dataSong.singerId[0] > 0) {
                    const getSinger = ref(db, `singers/${dataSong.singerId[0]}`);
                    onValue(getSinger, (item) => {
                        const dataSinger = item.val();
                        array.push(
                            {
                                keysong: itemSong.key,
                                title: dataSong.title,
                                img: dataSong.image,
                                singer: dataSinger.title,
                                audio: dataSong.audio
                            }
                        );
                    })
                }
            });
        });
        setSongs([...array]);
    }, [keyword]);
    return (
        <>
            {
                songs.length > 0 ? songs.map((item, index) => (
                    <div className="Search" >
                        <div className="section_2" >
                            <div className='list'>
                                {

                                    <Link to={`/detail_song/${item.keysong}`} className='box' >
                                        <div className='left'>
                                            <FaPlay />
                                            <img src={item.img} alt=""/>
                                            <h2>{item.title}</h2>
                                        </div>
                                        <div className='mid'>
                                            <p >{item.singer}</p>
                                        </div>
                                        <div className='right'>
                                            <p >4:32</p>
                                            <FaRegHeart />
                                        </div>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                )) :
                    <div className='title_a'>
                        <p >Không Tìm Thấy Bài Hát!</p>
                    </div>
            }
        </>
    );
}
export default Search;