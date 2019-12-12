import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const [error, setError] = useState('');

    useEffect (() => {
        const movieToUpdate = props.movies.find (
            movie => `${movie.id}` === props.match.params.id
        );

        if (movieToUpdate) setMovie(movieToUpdate);
    }, [props.movies, props.match.params.id]);

    const changeHandler = event => {
        event.persist();

        setMovie({
            ...movie,
            [event.target.name] : event.target.value
        });
    };

        const handleSubmit = event => {
            event.preventDefault ();

            setError('');
            axios
                .put(`http://localhost:3000/movies/${movie.id}`, movie)
                .then (result => {
                    console.log(result);
                    props.updateMovies(result.data);
                    props.history.goBack();
                })
                .catch(error => {
                    console.log (error);
                    setError(error.message);
                });
        };

        return (
            <div>
                <h2>Update Movie</h2>
                <form onSubmit = {handleSubmit}>
                    <input  
                        type = "text"
                        name = "title"
                        onChange = {changeHandler}
                        placeholder = "Title"
                        value = {movie.title}
                        />

                        <br></br>

                    <input  
                        type = "text"
                        name = "director"
                        onChange = {changeHandler}
                        placeholder = "Director"
                        value = {movie.director}
                        />
                        <br></br>

                    <input  
                        type = "number"
                        name = "metascore"
                        onChange = {changeHandler}
                        placeholder = "Metascore"
                        value = {movie.metascore}
                        />
                        <br></br>

                    <input 
                        type = "text"
                        name = "stars"
                        onChange = {changeHandler}
                        placeholder = "Stars"
                        value = {movie.stars}
                        />

                        <br></br>

                        <button className = "update-movie-form-btn">Update Movie</button>

                </form>
                {error && <div style = {{color: "orange"}}>{error}</div> }
            </div>
        );
};

export default UpdateMovieForm;