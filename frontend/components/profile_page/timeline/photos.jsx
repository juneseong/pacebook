import React from "react";
import { Link } from "react-router-dom";

const Photos = ({ user, photos }) => (
    <div className="profile-photos">
        <i className="fas fa-image"></i>
        <Link to={`/users/${user.id}/photos`}><h3>Photos</h3></Link>
        {photos.length > 0
            ? <ul className="photo-list">
                {photos.slice(0, 9).map((photo, i) => {
                    const li = (i + 1) % 3 === 0 ? "end" : "";

                    return (
                        <li key={i} className={li}>
                            <div style={{ backgroundImage: `url(${photo})` }} />
                        </li>
                    )
                })}
            </ul>
            : null}
    </div>
)

export default Photos;