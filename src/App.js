import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ComicPanel from "./ComicPanel";
import Hero from "./Hero";
import CircularProgress from "@mui/material/CircularProgress";

const HERO_BACKGROUND_IMAGE =
  process.env.REACT_APP_HERO_BACKGROUND_IMAGE_URL  ||     "https://images.unsplash.com/photo-1594712844133-d4193f13c17e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D1";

const API_URL = process.env.REACT_APP_API_BASE_URL || "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
const API_TOKEN = process.env.REACT_APP_API_TOKEN

/**
 * Represents a form component for generating comic panels.
 * @returns {JSX.Element} The ComicForm component.
 */
const ComicForm = () => {
  // State variables
  console.log(HERO_BACKGROUND_IMAGE)
  console.log(API_TOKEN)
  console.log(API_URL)
  const [panels] = useState(Array(10).fill(""));
  const [images, setImages] = useState([]);
  const [imageInput, setImageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Queries the API to generate an image based on the given prompt.
   * @param {Object} prompt - The prompt object.
   * @returns {Promise<string>} The URL of the generated image.
   */
  const query = async (prompt) => {
    console.log(prompt);
    const response = await fetch(
      API_URL,
      {
        headers: {
          Accept: "image/png",
          Authorization:
          API_TOKEN,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(prompt),
      }
    );
    const result = await response.blob();
    const imgURL = URL.createObjectURL(result);
    return imgURL;
  };

  /**
   * Generates the comic panels based on the input and updates the state.
   * @param {Event} event - The form submit event.
   */
  const generateComic = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const images = await Promise.all(
      panels.map(async (text, index) => {
        try {
          console.log(index)
          const image = await query({ inputs: imageInput });
          return image;
        } catch (err) {
          console.log(err);
        }
      })
    );
    console.log(images);
    setImages(images);
    setIsLoading(false);
  };

  // JSX rendering
  return (
    <div>
      <Hero
        generateComic={generateComic}
        backgroundImage={HERO_BACKGROUND_IMAGE}
        imageInput={imageInput}
        setImageInput={setImageInput}
      />
      <div>
        <Grid container spacing={2}>
          {isLoading ? ( 
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            images.map((image, index) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                key={index}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ComicPanel
                  imageUrl={image}
                  isLoading={isLoading}
                  key={index}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </div>
  );
};

const App = () => (
  <div style={{ backgroundColor: "#e6f1f8", minHeight: "100vh" }}>
    <ComicForm />
  </div>
);

export default App;
