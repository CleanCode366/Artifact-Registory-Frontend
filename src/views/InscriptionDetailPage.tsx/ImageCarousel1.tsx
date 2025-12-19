import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ImageCarousel1.css";

interface ImageCarouselProps {
    images: string[];
    alt?: string;
    className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images = [],
    alt = "",
    className = "w-full h-64 sm:h-80 md:h-96",
}) => {
    const galleryItems = images.map((image) => ({
        original: image,
        thumbnail: image,
        description: alt,
    }));

    return (
        <div className="mb-5">
            <ImageGallery
                items={galleryItems}
                showThumbnails={true}
                showFullscreenButton={true}
                showPlayButton={false}
                showBullets={true}
                useBrowserFullscreen={true}
                // thumbnailPosition={"left"}
                // showPlayButton={true}
            />
        </div>
    );
};

export default ImageCarousel;