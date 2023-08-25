import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { assestURL } from "../services/config";


import {
    bannerData,
    clearLoadingDatas,
    clearData,
    clearErrormsg,
    bannerSelector
} from "../store/reducer/banner";
import { API_STATUS } from "../utils/constants";


function Banner(bannerDatas) {
    console.log(bannerDatas,"bannerDatas")
    const banner = bannerDatas.bannerDatas;
    return (
        <section class="hero__slider--section">
            <div class="hero__slider--inner hero__slider--activation swiper">
                <div class="hero__slider--wrapper swiper-wrapper">
                    {banner && banner.map((row) => ((row.type === 0) ?
                        <div class="swiper-slide ">
                            <div class="hero__slider--items style4 slider4__items--bg1">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-7 col-md-7">
                                            <div class="slider__content style4">
                                                <span class="slider__subtitle style4">{row.name}</span>
                                                <h3 class="slider__maintitle style4 h1">{row?.short_text}</h3>
                                                <p class="slider__desc style4">{row.description} </p>
                                                {(row.button_link)?
                                                <a class="primary__btn slider__btn" href={row.button_link}>
                                                    Shop now
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.8335 3.6178L8.26381 0.157332C8.21395 0.107774 8.1532 0.0681771 8.08544 0.0410843C8.01768 0.0139915 7.94441 0 7.87032 0C7.79624 0 7.72297 0.0139915 7.65521 0.0410843C7.58745 0.0681771 7.5267 0.107774 7.47684 0.157332C7.37199 0.262044 7.31393 0.39827 7.31393 0.539537C7.31393 0.680805 7.37199 0.817024 7.47684 0.921736L10.0943 3.45837H0.55625C0.405122 3.46829 0.26375 3.52959 0.160556 3.62994C0.057363 3.73029 0 3.86225 0 3.99929C0 4.13633 0.057363 4.26829 0.160556 4.36864C0.26375 4.46899 0.405122 4.53029 0.55625 4.54021H10.0927L7.47527 7.07826C7.37042 7.18298 7.31235 7.3192 7.31235 7.46047C7.31235 7.60174 7.37042 7.73796 7.47527 7.84267C7.52513 7.89223 7.58588 7.93182 7.65364 7.95892C7.7214 7.98601 7.79467 8 7.86875 8C7.94284 8 8.0161 7.98601 8.08386 7.95892C8.15162 7.93182 8.21238 7.89223 8.26223 7.84267L11.8335 4.38932C11.9406 4.28419 12 4.14649 12 4.00356C12 3.86063 11.9406 3.72293 11.8335 3.6178V3.6178Z" fill="currentColor" />
                                                    </svg>
                                                </a>
                                                :""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="hero__slider--layer__style4" style={{width:"auto"}}>
                                    <img class="slider__layer--img " src={assestURL+row.images} alt="slider-img" />
                                </div>
                            </div>
                        </div>
                        :""
                    )
                    )}
                </div>
                <div class="slider__pagination swiper-pagination"></div>
            </div>
        </section>
    )
}

export default Banner;