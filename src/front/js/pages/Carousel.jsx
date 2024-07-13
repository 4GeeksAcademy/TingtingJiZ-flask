import React from "react";

export const Carousel = () => {
    return (
        <div className="container my-5">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://j.gifs.com/0gojO7.gif" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.contentapi.ea.com/content/dam/eacom/en-us/migrated-images/2016/11/news-article-images-star-wars-goh-splash.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.icegif.com/wp-content/uploads/2022/02/icegif-893.gif" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
