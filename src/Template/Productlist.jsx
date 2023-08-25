import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { assestURL } from "../services/config";
import Banner from "./Banner";
import ProductSection from "./Productsecion";

import {
    productData,
    categoryData,
    cardData,
    clearLoadingDatas,
    clearData,
    bannerData,
    clearErrormsg,
    bannerSelector
} from "../store/reducer/banner";
import { API_STATUS } from "../utils/constants";
import _ from "lodash";


function ProductList() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { productDatas, bannerDatas, categoryDatas, reviewDatas, allRatingsDatas, offerDatas, bestsellDatas, toprateDatas } = useSelector(bannerSelector);
    const [tab, setTab] = useState(111);

    const reviewDatasProd = (row, type) => {
        let reviews = [];
        if (type == 1)
            reviews = _.filter(reviewDatas, { product_id: row.id });
        else
            reviews = _.filter(allRatingsDatas, { product_id: row.id });
        let count_re = parseInt(reviews[0].rating / reviews[0].count);
        let data = ""
        let non_stars = 5 - count_re;
        return (
            <ul class="rating product__card--rating d-flex">
                {_.times(count_re, (i) => (
                    <>
                        <li class="rating__list">
                            <span class="rating__icon">
                                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.08398 0.921875L4.56055 4.03906L1.11523 4.53125C0.505859 4.625 0.271484 5.375 0.716797 5.82031L3.17773 8.23438L2.5918 11.6328C2.49805 12.2422 3.1543 12.7109 3.69336 12.4297L6.76367 10.8125L9.81055 12.4297C10.3496 12.7109 11.0059 12.2422 10.9121 11.6328L10.3262 8.23438L12.7871 5.82031C13.2324 5.375 12.998 4.625 12.3887 4.53125L8.9668 4.03906L7.41992 0.921875C7.16211 0.382812 6.36523 0.359375 6.08398 0.921875Z" fill="currentColor" />
                                </svg>
                            </span>
                        </li>
                    </>
                ))}
                {_.times(non_stars, (i) => (
                    <>
                        <li class="rating__list">
                            <span class="rating__icon">
                                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.4141 4.53125L8.99219 4.03906L7.44531 0.921875C7.1875 0.382812 6.39062 0.359375 6.10938 0.921875L4.58594 4.03906L1.14062 4.53125C0.53125 4.625 0.296875 5.375 0.742188 5.82031L3.20312 8.23438L2.61719 11.6328C2.52344 12.2422 3.17969 12.7109 3.71875 12.4297L6.78906 10.8125L9.83594 12.4297C10.375 12.7109 11.0312 12.2422 10.9375 11.6328L10.3516 8.23438L12.8125 5.82031C13.2578 5.375 13.0234 4.625 12.4141 4.53125ZM9.53125 7.95312L10.1875 11.75L6.78906 9.96875L3.36719 11.75L4.02344 7.95312L1.25781 5.28125L5.07812 4.71875L6.78906 1.25L8.47656 4.71875L12.2969 5.28125L9.53125 7.95312Z" fill="currentColor" />
                                </svg>
                            </span>
                        </li>
                    </>
                ))}
                <li>
                    <span class="rating__review--text">({reviews[0].count}) Review</span>
                </li>
            </ul>
        )
    }

    const getPrdts = (cat_id) => {
        if (cat_id == 0)
            dispatch(productData({ limit: 4 }));
        else
            dispatch(productData({ limit: 4, query: cat_id }));

    }

    useEffect(() => {
        dispatch(productData({ limit: 4 }));
        dispatch(categoryData({}));
        dispatch(bannerData({}));
        dispatch(cardData({}));
    }, [])
    return (
        <>
            {(bannerDatas) ? <Banner bannerDatas={bannerDatas} /> : ""}
            <ProductSection />
            <section class="product__section section--padding  pt-0">
                <div class="container">
                    <div class="section__heading section__heading--flex border-bottom d-flex justify-content-between mb-30">
                        <h2 class="section__heading--maintitle">Featured <span>Products</span></h2>
                        <ul class="nav tab__btn--wrapper" role="tablist">
                            <li class="tab__btn--item" role="presentation">
                                <button class={(tab == 111) ? "tab__btn--link active" : "tab__btn--link "} data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab" aria-selected="true" onClick={(e) => { setTab(111); getPrdts(0); }}> All
                                </button>
                            </li>
                            {(categoryDatas && categoryDatas.map((row, i) => (
                                <li class="tab__btn--item" role="presentation">
                                    <button class={(tab == i) ? "tab__btn--link active" : "tab__btn--link "} data-bs-toggle="tab" data-bs-target={"#" + row.name} type="button" role="tab" aria-selected="true" onClick={(e) => { setTab(i); getPrdts(row.id); }}> {row.name}
                                    </button>
                                </li>
                            ))
                            )}
                        </ul>
                    </div>
                    <div class="product__section--inner">
                        <div class="tab-content" id="nav-tabContent">
                            <div id="all" class={(tab == 111) ? "tab-pane fade show active" : "tab-pane fade"} role="tabpanel">
                                <div class="product__wrapper">
                                    <div class="row mb--n30">
                                        {(productDatas && productDatas.map((row) => (
                                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 custom-col mb-30">
                                                <article class="product__card">
                                                    <div class="product__card--thumbnail">
                                                        <a class="product__card--thumbnail__link display-block" href="product-details.html">
                                                            <img class="product__card--thumbnail__img product__primary--img" src={assestURL + row.image_path} alt="product-img" />
                                                            <img class="product__card--thumbnail__img product__secondary--img" src={assestURL + row.image_path} alt="product-img" />
                                                        </a>
                                                        
                                                        <ul class="product__card--action d-flex align-items-center justify-content-center">
                                                            <li class="product__card--action__list">
                                                                <a class="product__card--action__btn" title="Quick View" data-open="modal1" href="javascript:void(0)">
                                                                    <svg class="product__card--action__btn--svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.6952 14.4991L11.7663 10.5588C12.7765 9.4008 13.33 7.94381 13.33 6.42703C13.33 2.88322 10.34 0 6.66499 0C2.98997 0 0 2.88322 0 6.42703C0 9.97085 2.98997 12.8541 6.66499 12.8541C8.04464 12.8541 9.35938 12.4528 10.4834 11.6911L14.4422 15.6613C14.6076 15.827 14.8302 15.9184 15.0687 15.9184C15.2944 15.9184 15.5086 15.8354 15.6711 15.6845C16.0166 15.364 16.0276 14.8325 15.6952 14.4991ZM6.66499 1.67662C9.38141 1.67662 11.5913 3.8076 11.5913 6.42703C11.5913 9.04647 9.38141 11.1775 6.66499 11.1775C3.94857 11.1775 1.73869 9.04647 1.73869 6.42703C1.73869 3.8076 3.94857 1.67662 6.66499 1.67662Z" fill="currentColor"></path>
                                                                    </svg>
                                                                    <span class="visually-hidden">Quick View</span>
                                                                </a>
                                                            </li>
                                                            <li class="product__card--action__list">
                                                                <a class="product__card--action__btn" title="Compare" href="#">
                                                                    <svg class="product__card--action__btn--svg" width="17" height="17" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6.89137 6.09375C6.89137 6.47656 7.16481 6.75 7.54762 6.75H10.1453C10.7195 6.75 11.0203 6.06641 10.5828 5.65625L9.8445 4.89062L12.907 1.82812C13.0437 1.69141 13.0437 1.47266 12.907 1.36328L12.2781 0.734375C12.1687 0.597656 11.95 0.597656 11.8132 0.734375L8.75075 3.79688L7.98512 3.05859C7.57496 2.62109 6.89137 2.92188 6.89137 3.49609V6.09375ZM1.94215 12.793L5.00465 9.73047L5.77028 10.4688C6.18043 10.9062 6.89137 10.6055 6.89137 10.0312V7.40625C6.89137 7.05078 6.59059 6.75 6.23512 6.75H3.61012C3.0359 6.75 2.73512 7.46094 3.17262 7.87109L3.9109 8.63672L0.848402 11.6992C0.711683 11.8359 0.711683 12.0547 0.848402 12.1641L1.47731 12.793C1.58668 12.9297 1.80543 12.9297 1.94215 12.793Z" fill="currentColor" />
                                                                    </svg>
                                                                    <span class="visually-hidden">Compare</span>
                                                                </a>
                                                            </li>
                                                            <li class="product__card--action__list">
                                                                <a class="product__card--action__btn" title="Wishlist" href="#">
                                                                    <svg class="product__card--action__btn--svg" width="18" height="18" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M13.5379 1.52734C11.9519 0.1875 9.51832 0.378906 8.01442 1.9375C6.48317 0.378906 4.04957 0.1875 2.46364 1.52734C0.412855 3.25 0.713636 6.06641 2.1902 7.57031L6.97536 12.4648C7.24879 12.7383 7.60426 12.9023 8.01442 12.9023C8.39723 12.9023 8.7527 12.7383 9.02614 12.4648L13.8386 7.57031C15.2879 6.06641 15.5886 3.25 13.5379 1.52734ZM12.8816 6.64062L8.09645 11.5352C8.04176 11.5898 7.98707 11.5898 7.90504 11.5352L3.11989 6.64062C2.10817 5.62891 1.91676 3.71484 3.31129 2.53906C4.3777 1.63672 6.01832 1.77344 7.05739 2.8125L8.01442 3.79688L8.97145 2.8125C9.98317 1.77344 11.6238 1.63672 12.6902 2.51172C14.0847 3.71484 13.8933 5.62891 12.8816 6.64062Z" fill="currentColor" />
                                                                    </svg>
                                                                    <span class="visually-hidden">Wishlist</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="product__card--content">
                                                        {reviewDatasProd(row, 1)}
                                                        <h3 class="product__card--title"><a href="#">{row.name}</a></h3>
                                                        <div class="product__card--price">
                                                            <span class="current__price">${row.sale_price}</span>
                                                            <span class="old__price"> ${row.regular_price}</span>
                                                        </div>
                                                        <div class="product__card--footer">
                                                            <a class="product__card--btn primary__btn" href="#">
                                                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M13.2371 4H11.5261L8.5027 0.460938C8.29176 0.226562 7.9402 0.203125 7.70582 0.390625C7.47145 0.601562 7.44801 0.953125 7.63551 1.1875L10.0496 4H3.46364L5.8777 1.1875C6.0652 0.953125 6.04176 0.601562 5.80739 0.390625C5.57301 0.203125 5.22145 0.226562 5.01051 0.460938L1.98707 4H0.299574C0.135511 4 0.0183239 4.14062 0.0183239 4.28125V4.84375C0.0183239 5.00781 0.135511 5.125 0.299574 5.125H0.721449L1.3777 9.78906C1.44801 10.3516 1.91676 10.75 2.47926 10.75H11.0339C11.5964 10.75 12.0652 10.3516 12.1355 9.78906L12.7918 5.125H13.2371C13.3777 5.125 13.5183 5.00781 13.5183 4.84375V4.28125C13.5183 4.14062 13.3777 4 13.2371 4ZM11.0339 9.625H2.47926L1.86989 5.125H11.6433L11.0339 9.625ZM7.33082 6.4375C7.33082 6.13281 7.07301 5.875 6.76832 5.875C6.4402 5.875 6.20582 6.13281 6.20582 6.4375V8.3125C6.20582 8.64062 6.4402 8.875 6.76832 8.875C7.07301 8.875 7.33082 8.64062 7.33082 8.3125V6.4375ZM9.95582 6.4375C9.95582 6.13281 9.69801 5.875 9.39332 5.875C9.0652 5.875 8.83082 6.13281 8.83082 6.4375V8.3125C8.83082 8.64062 9.0652 8.875 9.39332 8.875C9.69801 8.875 9.95582 8.64062 9.95582 8.3125V6.4375ZM4.70582 6.4375C4.70582 6.13281 4.44801 5.875 4.14332 5.875C3.8152 5.875 3.58082 6.13281 3.58082 6.4375V8.3125C3.58082 8.64062 3.8152 8.875 4.14332 8.875C4.44801 8.875 4.70582 8.64062 4.70582 8.3125V6.4375Z" fill="currentColor" />
                                                                </svg>
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        )))}
                                    </div>
                                </div>
                            </div>
                            {(categoryDatas && categoryDatas.map((row, i) => (
                                <div id={row?.name} class={(tab == i) ? "tab-pane fade show active" : "tab-pane fade"} role="tabpanel">
                                    <div class="product__wrapper">
                                        <div class="row mb--n30">
                                            {(productDatas && productDatas.map((prow) => ((row.id === prow.category.id) ?
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 custom-col mb-30">
                                                    <article class="product__card">
                                                        <div class="product__card--thumbnail">
                                                            <a class="product__card--thumbnail__link display-block" href="product-details.html">
                                                                <img class="product__card--thumbnail__img product__primary--img" src={assestURL + prow.image_path} alt="product-img" />
                                                                <img class="product__card--thumbnail__img product__secondary--img" src={assestURL + prow.image_path} alt="product-img" />
                                                            </a>
                                                            
                                                            <ul class="product__card--action d-flex align-items-center justify-content-center">
                                                                <li class="product__card--action__list">
                                                                    <a class="product__card--action__btn" title="Quick View" data-open="modal1" href="javascript:void(0)">
                                                                        <svg class="product__card--action__btn--svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M15.6952 14.4991L11.7663 10.5588C12.7765 9.4008 13.33 7.94381 13.33 6.42703C13.33 2.88322 10.34 0 6.66499 0C2.98997 0 0 2.88322 0 6.42703C0 9.97085 2.98997 12.8541 6.66499 12.8541C8.04464 12.8541 9.35938 12.4528 10.4834 11.6911L14.4422 15.6613C14.6076 15.827 14.8302 15.9184 15.0687 15.9184C15.2944 15.9184 15.5086 15.8354 15.6711 15.6845C16.0166 15.364 16.0276 14.8325 15.6952 14.4991ZM6.66499 1.67662C9.38141 1.67662 11.5913 3.8076 11.5913 6.42703C11.5913 9.04647 9.38141 11.1775 6.66499 11.1775C3.94857 11.1775 1.73869 9.04647 1.73869 6.42703C1.73869 3.8076 3.94857 1.67662 6.66499 1.67662Z" fill="currentColor"></path>
                                                                        </svg>
                                                                        <span class="visually-hidden">Quick View</span>
                                                                    </a>
                                                                </li>
                                                                <li class="product__card--action__list">
                                                                    <a class="product__card--action__btn" title="Compare" href="#">
                                                                        <svg class="product__card--action__btn--svg" width="17" height="17" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.89137 6.09375C6.89137 6.47656 7.16481 6.75 7.54762 6.75H10.1453C10.7195 6.75 11.0203 6.06641 10.5828 5.65625L9.8445 4.89062L12.907 1.82812C13.0437 1.69141 13.0437 1.47266 12.907 1.36328L12.2781 0.734375C12.1687 0.597656 11.95 0.597656 11.8132 0.734375L8.75075 3.79688L7.98512 3.05859C7.57496 2.62109 6.89137 2.92188 6.89137 3.49609V6.09375ZM1.94215 12.793L5.00465 9.73047L5.77028 10.4688C6.18043 10.9062 6.89137 10.6055 6.89137 10.0312V7.40625C6.89137 7.05078 6.59059 6.75 6.23512 6.75H3.61012C3.0359 6.75 2.73512 7.46094 3.17262 7.87109L3.9109 8.63672L0.848402 11.6992C0.711683 11.8359 0.711683 12.0547 0.848402 12.1641L1.47731 12.793C1.58668 12.9297 1.80543 12.9297 1.94215 12.793Z" fill="currentColor" />
                                                                        </svg>
                                                                        <span class="visually-hidden">Compare</span>
                                                                    </a>
                                                                </li>
                                                                <li class="product__card--action__list">
                                                                    <a class="product__card--action__btn" title="Wishlist" href="#">
                                                                        <svg class="product__card--action__btn--svg" width="18" height="18" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M13.5379 1.52734C11.9519 0.1875 9.51832 0.378906 8.01442 1.9375C6.48317 0.378906 4.04957 0.1875 2.46364 1.52734C0.412855 3.25 0.713636 6.06641 2.1902 7.57031L6.97536 12.4648C7.24879 12.7383 7.60426 12.9023 8.01442 12.9023C8.39723 12.9023 8.7527 12.7383 9.02614 12.4648L13.8386 7.57031C15.2879 6.06641 15.5886 3.25 13.5379 1.52734ZM12.8816 6.64062L8.09645 11.5352C8.04176 11.5898 7.98707 11.5898 7.90504 11.5352L3.11989 6.64062C2.10817 5.62891 1.91676 3.71484 3.31129 2.53906C4.3777 1.63672 6.01832 1.77344 7.05739 2.8125L8.01442 3.79688L8.97145 2.8125C9.98317 1.77344 11.6238 1.63672 12.6902 2.51172C14.0847 3.71484 13.8933 5.62891 12.8816 6.64062Z" fill="currentColor" />
                                                                        </svg>
                                                                        <span class="visually-hidden">Wishlist</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="product__card--content">
                                                            {reviewDatasProd(prow, 1)}
                                                            <h3 class="product__card--title"><a href="#">{prow.name}</a></h3>
                                                            <div class="product__card--price">
                                                                <span class="current__price">${prow.sale_price}</span>
                                                                <span class="old__price"> ${prow.regular_price}</span>
                                                            </div>
                                                            <div class="product__card--footer">
                                                                <a class="product__card--btn primary__btn" href="#">
                                                                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M13.2371 4H11.5261L8.5027 0.460938C8.29176 0.226562 7.9402 0.203125 7.70582 0.390625C7.47145 0.601562 7.44801 0.953125 7.63551 1.1875L10.0496 4H3.46364L5.8777 1.1875C6.0652 0.953125 6.04176 0.601562 5.80739 0.390625C5.57301 0.203125 5.22145 0.226562 5.01051 0.460938L1.98707 4H0.299574C0.135511 4 0.0183239 4.14062 0.0183239 4.28125V4.84375C0.0183239 5.00781 0.135511 5.125 0.299574 5.125H0.721449L1.3777 9.78906C1.44801 10.3516 1.91676 10.75 2.47926 10.75H11.0339C11.5964 10.75 12.0652 10.3516 12.1355 9.78906L12.7918 5.125H13.2371C13.3777 5.125 13.5183 5.00781 13.5183 4.84375V4.28125C13.5183 4.14062 13.3777 4 13.2371 4ZM11.0339 9.625H2.47926L1.86989 5.125H11.6433L11.0339 9.625ZM7.33082 6.4375C7.33082 6.13281 7.07301 5.875 6.76832 5.875C6.4402 5.875 6.20582 6.13281 6.20582 6.4375V8.3125C6.20582 8.64062 6.4402 8.875 6.76832 8.875C7.07301 8.875 7.33082 8.64062 7.33082 8.3125V6.4375ZM9.95582 6.4375C9.95582 6.13281 9.69801 5.875 9.39332 5.875C9.0652 5.875 8.83082 6.13281 8.83082 6.4375V8.3125C8.83082 8.64062 9.0652 8.875 9.39332 8.875C9.69801 8.875 9.95582 8.64062 9.95582 8.3125V6.4375ZM4.70582 6.4375C4.70582 6.13281 4.44801 5.875 4.14332 5.875C3.8152 5.875 3.58082 6.13281 3.58082 6.4375V8.3125C3.58082 8.64062 3.8152 8.875 4.14332 8.875C4.44801 8.875 4.70582 8.64062 4.70582 8.3125V6.4375Z" fill="currentColor" />
                                                                    </svg>
                                                                    Add to cart
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </div>
                                                : "")))}
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Popular Products */}

            <section class="banner__section section--padding pt-0">
                <div class="container">
                    <div class="row  mb--n30">
                        {(bannerDatas && bannerDatas.map((row, i) => ((row.type === 1) ?
                            <div class="col-lg-6 col-md-6 mb-30">
                                <div class="banner__items position__relative">
                                    <a class="banner__thumbnail display-block" href={row.button_link}>
                                        <img class="banner__thumbnail--img" src={assestURL + row.images} alt="banner-img" />
                                        <div class="banner__content--style4">
                                            <h2 class="banner__content--style4__title font__style">{row.name}</h2>
                                            <h3 class="banner__content--style4__title2 font__style2">{row.description}</h3>
                                            <span class="banner__content--style4__btn primary__btn">Shop now
                                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.8335 3.6178L8.26381 0.157332C8.21395 0.107774 8.1532 0.0681771 8.08544 0.0410843C8.01768 0.0139915 7.94441 0 7.87032 0C7.79624 0 7.72297 0.0139915 7.65521 0.0410843C7.58746 0.0681771 7.5267 0.107774 7.47684 0.157332C7.37199 0.262044 7.31393 0.39827 7.31393 0.539537C7.31393 0.680805 7.37199 0.817024 7.47684 0.921736L10.0943 3.45837H0.55625C0.405122 3.46829 0.26375 3.52959 0.160556 3.62994C0.057363 3.73029 0 3.86225 0 3.99929C0 4.13633 0.057363 4.26829 0.160556 4.36864C0.26375 4.46899 0.405122 4.53029 0.55625 4.54021H10.0927L7.47527 7.07826C7.37042 7.18298 7.31235 7.3192 7.31235 7.46047C7.31235 7.60174 7.37042 7.73796 7.47527 7.84267C7.52513 7.89223 7.58588 7.93182 7.65364 7.95892C7.7214 7.98601 7.79467 8 7.86875 8C7.94284 8 8.0161 7.98601 8.08386 7.95892C8.15162 7.93182 8.21238 7.89223 8.26223 7.84267L11.8335 4.38932C11.9406 4.28419 12 4.14649 12 4.00356C12 3.86063 11.9406 3.72293 11.8335 3.6178Z" fill="currentColor" />
                                                </svg>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div> : ""
                        )))}
                    </div>
                </div>
            </section>


            <section class="product__section small__product--section__bg section--padding ">
                <div class="container">
                    <div class="row mb--n40">
                        <div class="col-lg-4 col-md-6 mb-40">
                            <div class="small__product--step">
                                <div class="section__heading border-bottom mb-30">
                                    <h2 class="section__heading--maintitle">Top Rated <span>Product</span></h2>
                                </div>
                                <div class="small__product--step__inner">
                                    {(toprateDatas && toprateDatas.map((row, i) => (
                                        <div class="small__product--card style2 d-flex mb-25">
                                            <div class="small__product--thumbnail">
                                                <a class="display-block" href="#"><img src={assestURL + row.image_path} alt="product-img" style={{ height: "70px", width: "auto" }} /></a>
                                            </div>
                                            <div class="small__product--content">
                                                {reviewDatasProd(row, 0)}
                                                <h3 class="small__product--card__title"><a href="#">{row.name} </a></h3>
                                                <div class="product__card--price">
                                                    <span class="current__price">${row.sale_price}</span>
                                                    <span class="old__price"> ${row.regular_price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )))}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-40">
                            <div class="small__product--step">
                                <div class="section__heading border-bottom mb-30">
                                    <h2 class="section__heading--maintitle">Special <span>Offers</span></h2>
                                </div>
                                <div class="small__product--step__inner">
                                    {(offerDatas && offerDatas.map((row, i) => (
                                        <div class="small__product--card style2 d-flex mb-25">
                                            <div class="small__product--thumbnail">
                                                <a class="display-block" href="#"><img src={assestURL + row.image_path} alt="product-img" style={{ height: "70px", width: "auto" }} /></a>
                                            </div>
                                            <div class="small__product--content">
                                                {reviewDatasProd(row, 0)}
                                                <h3 class="small__product--card__title"><a href="#">{row.name} </a></h3>
                                                <div class="product__card--price">
                                                    <span class="current__price">${row.sale_price}</span>
                                                    <span class="old__price"> ${row.regular_price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )))}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-40">
                            <div class="small__product--step">
                                <div class="section__heading border-bottom mb-30">
                                    <h2 class="section__heading--maintitle">Bestsellers <span></span></h2>
                                </div>
                                <div class="small__product--step__inner">
                                    {(bestsellDatas && bestsellDatas.map((row, i) => (
                                        <div class="small__product--card style2 d-flex mb-25">
                                            <div class="small__product--thumbnail">
                                                <a class="display-block" href="#"><img src={assestURL + row.image_path} alt="product-img" style={{ height: "70px", width: "auto" }} /></a>
                                            </div>
                                            <div class="small__product--content">
                                                {reviewDatasProd(row, 0)}
                                                <h3 class="small__product--card__title"><a href="#">{row.name} </a></h3>
                                                <div class="product__card--price">
                                                    <span class="current__price">${row.sale_price}</span>
                                                    <span class="old__price"> ${row.regular_price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ProductList;