import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home(props) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <div>
            <section>
                <Slider {...settings}>
                    <div>
                        <div className="bg-image one">
                            {/* <div className="slide-content slide-animation">
                                <h1>Casual Clothing</h1>
                                <h2>lifestyle / clothing / hype</h2>
                            </div> */}
                        </div>
                    </div>
                    <div>
                        <div className="bg-image two">
                            {/* <div className="slide-content-2 slide-animation">
                                <h2 className="slide-2-h2-a">Hiking</h2>
                                <h2 className="slide-2-h2-b">Collection</h2>
                                <h1>2023</h1>
                            </div> */}
                        </div>
                    </div>
                    <div>
                        <div className="bg-image three">
                            {/* <div className="slide-content slide-animation">
                                <h1>Tech
                                    <span style={{ color: '#333' }}>Deals</span>
                                </h1>
                                <h2 style={{ color: '#333' }}># shopping</h2>
                            </div> */}
                        </div>
                    </div>
                </Slider>
            </section>
            {/* End Hero Section */}
            {/* Start Product Section */}
            {/* <div className="product-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                            <h2 className="mb-4 section-title">Crafted with excellent material.</h2>
                            <p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
                            <p><a href="shop.html" className="btn1">Explore</a></p>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img src="../assets/images/product-1.png" className="img-fluid product-thumbnail" />
                                <h3 className="product-title">Nordic Chair</h3>
                                <strong className="product-price">$50.00</strong>
                                <span className="icon-cross">
                                    <img src="../assets/images/cross.svg" className="img-fluid" />
                                </span>
                            </a>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img src="../assets/images/product-2.png" className="img-fluid product-thumbnail" />
                                <h3 className="product-title">Kruzo Aero Chair</h3>
                                <strong className="product-price">$78.00</strong>
                                <span className="icon-cross">
                                    <img src="../assets/images/cross.svg" className="img-fluid" />
                                </span>
                            </a>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img src="../assets/images/product-3.png" className="img-fluid product-thumbnail" />
                                <h3 className="product-title">Ergonomic Chair</h3>
                                <strong className="product-price">$43.00</strong>
                                <span className="icon-cross">
                                    <img src="../assets/images/cross.svg" className="img-fluid" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* End Product Section */}
            {/* Start Why Choose Us Section */}
            {/* <div className="why-choose-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <h2 className="section-title">Why Choose Us</h2>
                            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                            <div className="row my-5">
                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img src="../assets/images/truck.svg" alt="Image" className="imf-fluid" />
                                        </div>
                                        <h3>Fast &amp; Free Shipping</h3>
                                        <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img src="../assets/images/bag.svg" alt="Image" className="imf-fluid" />
                                        </div>
                                        <h3>Easy to Shop</h3>
                                        <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img src="../assets/images/support.svg" alt="Image" className="imf-fluid" />
                                        </div>
                                        <h3>24/7 Support</h3>
                                        <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img src="../assets/images/return.svg" alt="Image" className="imf-fluid" />
                                        </div>
                                        <h3>Hassle Free Returns</h3>
                                        <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="img-wrap">
                                <img src="../assets/images/why-choose-us-img.jpg" alt="Image" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* End Why Choose Us Section */}

            {/* Start Popular Product */}
            {/* <div className="popular-product">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="../assets/images/product-1.png" alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Nordic Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><a href="#">Read More</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="../assets/images/product-2.png" alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Kruzo Aero Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><a href="#">Read More</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="../assets/images/product-3.png" alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Ergonomic Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><a href="#">Read More</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* End Popular Product */}

            {/* Start Blog Section */}
            {/* <div className="blog-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-6">
                            <h2 className="section-title">Recent Blog</h2>
                        </div>
                        <div className="col-md-6 text-start text-md-end">
                            <a href="#" className="more">View All Posts</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="#" className="post-thumbnail"><img src="../assets/images/post-1.jpg" alt="Image" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="#">First Time Home Owner Ideas</a></h3>
                                    <div className="meta">
                                        <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 19, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="#" className="post-thumbnail"><img src="../assets/images/post-2.jpg" alt="Image" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="#">How To Keep Your Furniture Clean</a></h3>
                                    <div className="meta">
                                        <span>by <a href="#">Robert Fox</a></span> <span>on <a href="#">Dec 15, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="#" className="post-thumbnail"><img src="../assets/images/post-3.jpg" alt="Image" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
                                    <div className="meta">
                                        <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 12, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

    );
}

export default Home;