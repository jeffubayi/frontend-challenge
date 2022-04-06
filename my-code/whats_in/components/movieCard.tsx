import {
  CardMedia,
  ImageListItem,
  ImageList,
  ImageListItemBar,
  Grid,
} from "@mui/material";
import { StyledRating } from "../styles";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import NoMovieAvailable from "../components/emptyMovie";
import {  Key } from "react";

interface movieType {
  length: any;
}

interface movieCard {
  movies: [
    {
      imdbID: string;
      Title: string;
      Poster: string;
      Year:string;
      index: Key ;
    }
  ];
}

const TextBody = ({ movies }: movieCard) => {
  return (
    <>
      {(movies || {}).length ? (
        (movies || []).map((movie, index) => {
          return (
            <Grid key={index} item xs={6} md={2}>
              <Link
                href={{
                  pathname: `/detail`,
                  query: { imdbID: `${movie?.imdbID}` },
                }}
                passHref
              >
                <ImageList cols={1} sx={{ cursor: "pointer" }}>
                  <ImageListItem>
                    <CardMedia
                      sx={{ borderRadius: "0.3rem" }}
                      component="img"
                      width={220}
                      height={250}
                      title={movie?.Title}
                      image={
                        movie?.Poster !== "N/A"
                          ? `${movie?.Poster}`
                          : `no-movie.png`
                      }
                      alt="movie poster"
                    />
                    <ImageListItemBar
                      sx={{
                        background: "rgba(0, 0, 0, 0.85)",
                      }}
                      title={movie?.Title}
                      subtitle={movie?.Year}
                      actionIcon={
                        <IconButton
                          aria-label="add to favorites"
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <StyledRating
                            size="large"
                            max={1}
                            defaultValue={0}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={
                              <FavoriteBorderIcon fontSize="inherit" />
                            }
                          />
                        </IconButton>
                      }
                      actionPosition="right"
                    />
                  </ImageListItem>
                </ImageList>
              </Link>
            </Grid>
          );
        })
      ) : (
        <NoMovieAvailable />
      )}
    </>
  );
};
export default TextBody;
