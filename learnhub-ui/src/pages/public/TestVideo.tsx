import React from "react";

const TestVideo: React.FC = () => {
    const videoUrl = "http://d3dpldjcl8ur47.cloudfront.net/uploads/public/fe9fe698-4d77-4948-9cca-2c3f1beff9c5.mp4";

    return (
        <div>
            <h1>Test Video</h1>
            <video width="600" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default TestVideo;
