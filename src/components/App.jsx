import React, { Component } from 'react';
import { data } from 'data/data';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { Modal } from './Modal/Modal';
const MOVIES_KEY = 'movies';

export class App extends Component {
  state = {
    movies: data,
    currentImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movies !== this.state.movies) {
      localStorage.setItem(MOVIES_KEY, JSON.stringify(this.state.movies));
    }
  }

  componentDidMount() {
    const localData = localStorage.getItem(MOVIES_KEY);

    if (localData) {
      this.setState({ movies: JSON.parse(localData) });
    }
  }

  deleteMovie = id => {
    this.setState(prevState => {
      return { movies: prevState.movies.filter(movie => movie.id !== id) };
    });
  };

  showPoster = data => {
    this.setState({ currentImg: data });
  };

  render() {
    const {currentImg} = this.state
    return (
      <>
        <MoviesGallery
          movies={this.state.movies}
          deleteMovie={this.deleteMovie}
          showPoster={this.showPoster}
        />
        {currentImg && <Modal currentImg={currentImg}/>}
        
      </>
    );
  }
}
