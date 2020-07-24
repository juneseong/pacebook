import React from "react";

const Photos = ({ photos }) => (
    <div className="profile-page-container">
        <div className="profile-page-section-container">
            <div className="profile-page-section-header">
                <i className="fas fa-image"></i><h2>Photos</h2>
            </div>
            <div className="profile-page-section-body">
                {photos.length > 0
                    ? <ul className="photos-section">
                        {photos.map((photo, i) => (
                            <li key={i} style={{ backgroundImage: `url(${photo})` }} />
                        ))}
                    </ul>
                    : <div className="no-friends-text">No photos to show</div>}
            </div>
        </div>
    </div>
)

export default Photos;