
import React from 'react';

/**
 * Represents a comic panel component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.imageUrl - The URL of the image to be displayed.
 * @param {boolean} props.isLoading - Indicates whether the image is still loading.
 * @param {string} [props.altText="Generate some cool image"] - The alternative text for the image.
 * @returns {JSX.Element} The rendered comic panel component.
 */
const ComicPanel = ({ imageUrl, isLoading, altText = "Generate some cool image" }) => {
    return (
        <div style={{  marginBottom: "20px" }}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <img src={imageUrl} alt={altText} style={{ width: "100%", height: "100%" }} />
            )}
        </div>
    );
};

export default ComicPanel;
