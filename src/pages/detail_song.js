// // import React, { useState, useEffect } from 'react';
// // import { FaPlay, FaRegHeart } from "react-icons/fa";
// // import { onValue, ref, get} from 'firebase/database';
// // import { Link, useParams } from 'react-router-dom';
// // import { db } from '../db';

// // const DetailSong = () => {
// //   const {id} = useParams();
// //   const [songnow,setSongnow] = useState({});
// //   useEffect(() => {
// //     const getSongDetails = async () => {
// //       const songRef = ref(db, `songs/${id}`);
// //       const snapshot = await get(songRef);  
// //       if (snapshot.exists()) {
// //         const data = snapshot.val();
// //         const key = snapshot.key;
// //         let detailsong = {
// //           id: key,
// //           img: data.image,
// //           title: data.title,
// //           audio: data.audio,
// //           lyric: data.lyric,
// //           category: data.categoryId,
// //           singer: null,
// //           image: null
// //         };
// //         if (data.singerId && data.singerId.length > 0) {
// //           const singerRef = ref(db, `singers/${data.singerId[0]}`);
// //           const singerSnapshot = await get(singerRef);
// //           if (singerSnapshot.exists()) {
// //             const singerData = singerSnapshot.val();
// //             detailsong.singer = singerData.title;
// //             detailsong.image = singerData.image;
// //           }
// //         }
// //         setSongnow(detailsong);
// //       }
// //     };
// //     getSongDetails();
// //   }, [id]); 
  
// //   const [songsame,setSongsame] = useState([]);
// //   useEffect(()=>{
// //     const arrayList = [];
// //     const dataList = ref(db, 'songs');
// //     onValue(dataList, (items) => {
// //       items.forEach(item => {
// //         const data = item.val();
// //         const key = item.key;
// //         if(data.category===songnow.category)
// //         {
// //           const Id = data.singerId[0];
// //           const singer = ref(db, `singers/${Id}`);
// //           onValue(singer, (item) => {
// //             const datasinger = item.val();
// //             arrayList.push(
// //               {
// //                 id: key,
// //                 image: data.image,
// //                 title: data.title,
// //                 titlesinger: datasinger.title
// //               }
// //             )
// //             setSongsame([...arrayList]);
// //           })
// //         }
// //         }
// //       );
// //     })
// //   },[songnow]);
// //   useEffect(() => {
// //     const innerAudio = document.querySelector(".inner-audio");
// //     const source = innerAudio.querySelector("source");
// //     source.src = songnow.audio;
// //     innerAudio.load();
// //     innerAudio.play();
// //     const playImage = document.querySelector(".play-image");
// //     if (playImage) playImage.src = songnow.img;
  
// //     const playName = document.querySelector(".play-name");
// //     if (playName) playName.innerHTML = songnow.title;
  
// //     const playSinger = document.querySelector(".play-singer");
// //     if (playSinger) playSinger.innerHTML = songnow.singer;
// //   }, [songnow]);
  
// //   const handleClick = ()=>{
// //     const innerAudio = document.querySelector(".inner-audio");
// //     const source = innerAudio.querySelector("source");
// //     source.src = songnow.audio;
// //     console.log(songnow);
// //   }
// //   return (
// //     <div className='DetailSong'>
// // <div className='container'>
// //         <section className='section_1' >
// //             <div className='inner-wrap' key={songnow.id}>
// //               <div className='image'>
// //                 <img src={songnow.image} alt={songnow.title} />
// //               </div>
// //               <div className='content'>
// //                 <h1>{songnow.title}</h1>
// //                 <p>{songnow.singer}</p>
// //               </div>
// //             </div>
// //         </section>
// //         <section className='section_2'>
// //           <div className='title'>
// //             <h1>Lời Bài Hát</h1>
// //           </div>
// //           <div className='lyrics'>
// //             <p>{songnow.lyric}</p>
// //           </div>
// //         </section>
// //         <section className='section_3'>
// //             <div className='title_a'>
// //               <p>Bài Hát Cùng Danh Mục</p>
// //             </div>
// //             <div className='list'>
// //               {
// //                 songsame.map((item) => (
// //                   <Link to = {`/detail_song/${item.id}`} className='box'>
// //                     <div className='left'>
// //                       <button onClick={handleClick}>
// //                         <FaPlay />
// //                       </button>
// //                       <img src={item.image} alt="" />
// //                       <h2>{item.title}</h2>
// //                     </div>
// //                     <div className='mid'>
// //                       <p>{item.titlesinger}</p>
// //                     </div>
// //                     <div className='right'>
// //                       <p>4:32</p>
// //                       <FaRegHeart />
// //                     </div>
// //                   </Link>
// //                 ))
// //               }
// //             </div>
// //           </section>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DetailSong;
import React, { useState, useEffect } from 'react';
import { onValue, ref, get} from 'firebase/database';
import { Link, useParams } from 'react-router-dom';
import { db } from '../db';
import { Buttonlike } from '../components/Buttonlike';
import { Buttonplay } from '../components/Buttonplay';

const DetailSong = () => {
  const {id} = useParams();
  console.log("1232");
  console.log(id);
  const [songnow,setSongnow] = useState({});
  useEffect(() => {
    const getSongDetails = async () => {
      const songRef = ref(db, `songs/${id}`);
      const snapshot = await get(songRef);  
      if (snapshot.exists()) {
        const data = snapshot.val();
        const key = snapshot.key;
        let detailsong = {
          id: key,
          img: data.image,
          title: data.title,
          audio: data.audio,
          lyric: data.lyric,
          category: data.categoryId,
          singer: null,
          image: null,
        };
        if (data.singerId && data.singerId.length > 0) {
          const singerRef = ref(db, `singers/${data.singerId[0]}`);
          const singerSnapshot = await get(singerRef);
          if (singerSnapshot.exists()) {
            const singerData = singerSnapshot.val();
            detailsong.singer = singerData.title;
            detailsong.image = singerData.image;
          }
        }
        setSongnow(detailsong);
      }
    };
    getSongDetails();
  }, [id]); 
  
  const [songsame,setSongsame] = useState([]);
  useEffect(()=>{
    const arrayList = [];
    const dataList = ref(db, 'songs');
    onValue(dataList, (items) => {
      items.forEach(item => {
        const data = item.val();
        const key = item.key;
        if(data.singerId && data.singerId.length > 0 && data.category===songnow.category)
        {
          const singer = ref(db, `singers/${data.singerId[0]}`);
          onValue(singer, (item) => {
            const datasinger = item.val();
            arrayList.push(
              {
                id: key,
                image: data.image,
                title: data.title,
                titlesinger: datasinger.title
              }
            )
            setSongsame([...arrayList]);
          })
        }
        }
      );
    })
  },[songnow]);
  console.log(songnow)
  console.log(songsame)
  useEffect(() => {
    const playImage = document.querySelector(".play-image");
    if (playImage) playImage.src = songnow.img;
  
    const playName = document.querySelector(".play-name");
    if (playName) playName.innerHTML = songnow.title;
  
    const playSinger = document.querySelector(".play-singer");
    if (playSinger) playSinger.innerHTML = songnow.singer;
    const innerAudio = document.querySelector(".inner-audio");
    if (!innerAudio || !songnow.audio) return;
    
    innerAudio.pause();
    innerAudio.currentTime = 0;
    
    const source = innerAudio.querySelector("source");
    source.src = songnow.audio;
    innerAudio.load();
    
    innerAudio.oncanplaythrough = () => {
      innerAudio.play();
    };
  }, [songnow]);

//   const handleClick = () => {
//     const innerAudio = document.querySelector(".inner-audio");
// if (!innerAudio || !songnow.audio) return;
    
//     innerAudio.pause();
//     innerAudio.currentTime = 0;
    
//     const source = innerAudio.querySelector("source");
//     source.src = songnow.audio;
//     innerAudio.load();
    
//     innerAudio.oncanplaythrough = () => {
//       innerAudio.play();
//     };
//   };
  return (
    <div className='DetailSong'>
      <div className='container'>
        <section className='section_1' >
            <div className='inner-wrap' key={songnow.id}>
              <div className='image'>
                <img src={songnow.image} alt={songnow.title} />
              </div>
              <div className='content'>
                <h1>{songnow.title}</h1>
                <p>{songnow.singer}</p>
              </div>
            </div>
        </section>
        <section className='section_2'>
          <div className='title'>
            <h1>Lời Bài Hát</h1>
          </div>
          <div className='lyrics'>
            <p>{songnow.lyric}</p>
          </div>
        </section>
        <section className='section_3'>
            <div className='title_a'>
              <p>Bài Hát Cùng Danh Mục</p>
            </div>
            <div className='list'>
              {
                songsame.map((item) => (
                  <Link to = {`/detail_song/${item.id}`} className='box'>
                    <div className='left'>
                      {/* <button onClick={handleClick}>
                        <Buttonplay />
                      </button> */}
                      <Buttonplay />
                      <img src={item.image} alt="" />
                      <h2>{item.title}</h2>
                    </div>
                    <div className='mid'>
                      <p>{item.titlesinger}</p>
                    </div>
                    <div className='right'>
                      <p>4:32</p>
                      <Buttonlike id={item.keysong} statuslike={item.statuslike}/>
                    </div>
                  </Link>
                ))
              }
            </div>
          </section>
      </div>
    </div>
  );
};

export default DetailSong;

