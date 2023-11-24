import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
    background-image: ${({ backgroundImage }) =>
        backgroundImage ? `url(${backgroundImage})` : "none"};
    background-color: #f2f2f2;
    height: 300px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const InputField = styled.input`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    width: 300px;
    margin-right: 10px;

    @media (max-width: 768px) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
    }
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 100%;
    }
`;


/**
 * Renders the Hero component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.backgroundImage - The background image for the Hero component.
 * @param {Function} props.generateComic - The function to generate a comic.
 * @param {string} props.imageInput - The input value for the comic idea.
 * @param {Function} props.setImageInput - The function to set the input value for the comic idea.
 * @returns {JSX.Element} The rendered Hero component.
 */
const Hero = ({ backgroundImage, generateComic, imageInput, setImageInput }) => {
    return (
        <HeroContainer backgroundImage={backgroundImage} >
            <div> 
                <form onSubmit={generateComic}>
                    <InputContainer>
                        <InputField
                            type="text"
                            placeholder="Enter your amazing comic idea ✨"
                            value={imageInput}
                            onChange={(event) => {
                                event.preventDefault();
                                imageInput = event.target.value;
                                setImageInput(imageInput);
                            }}
                        />

                        <SubmitButton type="submit">Generate</SubmitButton>
                    </InputContainer>
                </form>
            </div>
        </HeroContainer>
    );
};

export default Hero;

