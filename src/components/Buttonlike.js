import { doc } from "firebase/firestore/lite";
import { db } from "../db";
import { ref, update } from "firebase/database"
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const Buttonlike = ({ id, statuslike }) => {
    const start = document.querySelector(".box_right");
    const [state, setState] = useState(statuslike || "false");
    if (start) {
        if (state == "true") {
            start.style.color = "blue";
        }
    }
    const handelClick = (event) => {
        if (state === "false") {
            event.target.style.color = "blue";
            setState("true");
            update(ref(db, 'songs/' + id), {
                like: "true"
            })
        }
        else if (state === "true") {
            event.target.style.color = "white";
            setState("false");
            update(ref(db, 'songs/' + id), {
                like: "false"
            })
        }

    }

    return (
        <div className="Buttonlike" >
            <button onClick={handelClick} className="box_right">
                <FaHeart />
            </button>
        </div>
    )
}

