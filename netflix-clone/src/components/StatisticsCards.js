import React from "react";
import {
    FaFilm,
    FaTv,
    FaHeart,
    FaClock,
} from "react-icons/fa";

function StatisticsCards({ stats }) {

    if (!stats) return null;

    const cards = [

        {
            icon: <FaFilm />,
            title: "Movies Watched",
            value: stats.movies_watched || 0,
            color: "#E50914",
        },

        {
            icon: <FaTv />,
            title: "TV Shows",
            value: stats.tv_shows_watched || 0,
            color: "#46D369",
        },

        {
            icon: <FaHeart />,
            title: "My List",
            value: stats.my_list || 0,
            color: "#F5C518",
        },

        {
            icon: <FaClock />,
            title: "Hours Watched",
            value: `${stats.hours_watched || 0} hrs`,
            color: "#3EA6FF",
        },

    ];

    return (

        <section className="statistics-section">

            <div className="section-header">

                <h2>Viewing Statistics</h2>

                <p>Your activity across Netflix</p>

            </div>

            <div className="statistics-grid">

                {cards.map((card) => (

                    <div
                        className="statistics-card"
                        key={card.title}
                    >

                        <div
                            className="statistics-icon"
                            style={{
                                background: card.color,
                            }}
                        >

                            {card.icon}

                        </div>

                        <div className="statistics-content">

                            <h3>

                                {card.value}

                            </h3>

                            <span>

                                {card.title}

                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default StatisticsCards;