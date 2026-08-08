import React from "react";
import {
  FaStar,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function ReviewsPreview({ reviews = [] }) {
  return (
    <section className="profile-section">

      <div className="section-header">

        <h2>Your Reviews</h2>

      </div>

      {reviews.length === 0 ? (

        <div className="empty-card">

          <p>You haven't written any reviews yet.</p>

        </div>

      ) : (

        <div className="reviews-list">

          {reviews.slice(0, 5).map((review) => (

            <div
              key={review.movie_id || review.id}
              className="review-card"
            >

              <img
                src={`https://image.tmdb.org/t/p/w300${review.poster_path}`}
                alt={review.title}
                className="review-poster"
              />

              <div className="review-content">

                <div className="review-header">

                  <h3>{review.title}</h3>

                  <div className="review-rating">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <FaStar
                        key={star}
                        className={
                          star <= Math.round((review.rating || 0) / 2)
                            ? "filled-star"
                            : "empty-star"
                        }
                      />

                    ))}

                    <span>

                      {review.rating?.toFixed(1) || "0.0"}

                    </span>

                  </div>

                </div>

                <p className="review-text">

                  {review.review ||
                    "No review available."}

                </p>

                <div className="review-footer">

                  <span className="review-date">

                    {review.created_at
                      ? new Date(
                          review.created_at
                        ).toLocaleDateString()
                      : ""}

                  </span>

                  <div className="review-actions">

                    <button
                      className="review-btn edit-btn"
                    >

                      <FaEdit />

                      Edit

                    </button>

                    <button
                      className="review-btn delete-btn"
                    >

                      <FaTrash />

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default ReviewsPreview;