import React from "react";

const ALL_GENRES = [
    "Action",
    "Adventure",
    "Anime",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller"
];

function ContentPreferences({ settings, onChange }) {

    const selectedGenres =
        settings.preferred_genres || [];

    const toggleGenre = (genre) => {

        let updatedGenres;

        if (selectedGenres.includes(genre)) {

            updatedGenres = selectedGenres.filter(
                (item) => item !== genre
            );

        } else {

            updatedGenres = [
                ...selectedGenres,
                genre
            ];

        }

        onChange(
            "preferred_genres",
            updatedGenres
        );

    };

    return (

        <section className="settings-section">

            <h2 className="settings-title">

                ❤️ Content Preferences

            </h2>

            <div className="settings-card">

                <h4>

                    Preferred Genres

                </h4>

                <p className="settings-description">

                    Select your favorite genres to
                    improve movie and TV show
                    recommendations.

                </p>

                <div className="genre-grid">

                    {

                        ALL_GENRES.map((genre) => (

                            <button

                                key={genre}

                                className={
                                    selectedGenres.includes(genre)

                                    ?

                                    "genre-chip active"

                                    :

                                    "genre-chip"
                                }

                                onClick={() =>
                                    toggleGenre(genre)
                                }

                            >

                                {

                                    selectedGenres.includes(genre)

                                    ?

                                    "✓ "

                                    :

                                    ""

                                }

                                {genre}

                            </button>

                        ))

                    }

                </div>

                <div className="selected-count">

                    {

                        selectedGenres.length

                    }

                    {" "}

                    genre

                    {

                        selectedGenres.length !== 1

                        ?

                        "s"

                        :

                        ""

                    }

                    {" "}

                    selected

                </div>

            </div>

        </section>

    );

}

export default ContentPreferences;