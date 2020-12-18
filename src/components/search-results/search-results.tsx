import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, CircularProgress } from '@material-ui/core';
import { Movie, SearchData } from '../../interfaces';
import './search-results.scss';
import Preview from '../preview/preview';

interface Props {
  preview?: Movie,
  setPreview: React.Dispatch<React.SetStateAction<Movie | undefined>>
  loading: boolean,
  data: SearchData | undefined
}

function SearchResults({ preview, setPreview, loading, data }: Props) {
  const movies = data?.result.Search;
  if (loading) {
    return (
      <div className="search-results">
        <h2>Results</h2>
        <div className="loading">
          <CircularProgress />
        </div>
      </div>
    )
  }
  return (
    <div className="search-results">
      <h2>Search</h2>
      <p>Please, enter the title of a movie.</p>
      {movies &&
        <List className="list">
          {movies.map((movie: Movie) =>
            <div key={movie.imdbID}>
              <ListItem
                key={movie.imdbID} button className="list-item" onClick={() => setPreview(movie)}>
                <ListItemText primary={`${movie.Title} (${movie.Year})`} style={{ paddingRight: 60 }} />
                <ListItemSecondaryAction>
                  <Button>Nominate</Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Preview {...{ movie }} selected={movie.imdbID === preview?.imdbID} />
            </div>
          )}
        </List>
      }
    </div>
  )
}

export default SearchResults;