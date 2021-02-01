<template>
  <article class="shopping" :class="{isClose, isAnimate, isOpen: openPanel}" @click.self="closePanelHandler">
    <div v-if="!finallyPanel" class="shopping__panel">
      <div class="shopping__header">
        <div class="shopping__header-count">
          <div class="shopping__header-title">
            {{ 'shopping_title' | localize(locale) }}<span v-if="card.length > 0">:</span>
          </div>
          <div v-if="card.length > 0" class="shopping__header-value">
            {{ card.length }} <span v-if="card.length === 1">{{ 'search_item' | localize(locale) }}</span>
            <span v-else-if="card.length > 1 && card.length < 4">{{ 'search_items' | localize(locale) }}</span>
            <span v-else>{{ 'search_itemss' | localize(locale) }}</span>
          </div>
        </div>

        <div class="shopping__header-state">
          <div class="shopping__header-title">
            {{ panelTitle | localize(locale) }}
          </div>
        </div>

        <div class="shopping__header-close" @click="closePanelHandler">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.8"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.3338 4.36311L20.061 3.09032L12 11.1513L3.93898 3.09032L2.66619 4.36311L10.7272 12.4241L3.09045 20.0609L4.36325 21.3337L12 13.6969L19.6368 21.3337L20.9095 20.0609L13.2728 12.4241L21.3338 4.36311Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div class="panel" :class="{isOpen: openPanel, isSale: couponSale > 0 || notFoundCoupon, 'isSale--dbl': notFoundCouponDbl}">
        <div class="panel__header">
          <div class="panel__header-logo" @click="closePanelHandler">
            <nuxt-link to="/">
              <svg
                width="40"
                height="29"
                viewBox="0 0 40 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.846317"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.2011 4.15234H0.283203V2.17432C0.283203 1.53369 0.369954 1.11996 0.543457 0.933105C0.730307 0.759602 1.14404 0.672852 1.78467 0.672852H13.8564C14.5104 0.672852 14.9242 0.759602 15.0977 0.933105C15.2845 1.11996 15.3779 1.53369 15.3779 2.17432V3.05518C15.3779 3.56407 15.319 3.92979 15.2011 4.15234ZM14.2536 11.1523H0.283203V26.498C0.283203 27.152 0.369954 27.5658 0.543457 27.7393C0.71696 27.9128 1.13069 27.9995 1.78467 27.9995H13.8564C14.5104 27.9995 14.9242 27.9128 15.0977 27.7393C15.2845 27.5658 15.3779 27.152 15.3779 26.498V25.6172C15.3779 24.9632 15.2845 24.5495 15.0977 24.376C14.9242 24.2025 14.5104 24.1157 13.8564 24.1157H5.40723C4.85494 24.1157 4.40723 23.668 4.40723 23.1157V15.9868C4.40723 15.4345 4.85494 14.9868 5.40723 14.9868H13.5361C14.1901 14.9868 14.6038 14.9001 14.7773 14.7266C14.9508 14.5397 15.0376 14.126 15.0376 13.4854V12.6045C15.0376 11.9505 14.9508 11.5368 14.7773 11.3633C14.6794 11.2653 14.5048 11.195 14.2536 11.1523ZM37.3488 5.51758L36.568 5.97803C36.0875 6.27165 35.7606 6.41846 35.5871 6.41846C35.2667 6.41846 34.9665 6.20492 34.6862 5.77783C33.9388 4.61669 32.791 4.03613 31.2428 4.03613C30.0416 4.03613 29.0674 4.37646 28.32 5.05713C27.5993 5.7111 27.2389 6.5052 27.2389 7.43945C27.2389 8.34701 27.6727 9.10107 28.5402 9.70166C28.9406 9.99528 29.3243 10.2255 29.6913 10.3923C30.0583 10.5592 31.1427 11.0096 32.9445 11.7437C35.2267 12.6779 36.855 13.7856 37.8292 15.0669C38.8436 16.4015 39.3507 17.9764 39.3507 19.7915C39.3507 22.4207 38.4232 24.5895 36.568 26.2979C34.9664 27.7793 32.9645 28.52 30.5622 28.52C28.1865 28.52 26.1912 27.7593 24.5763 26.2378C23.8956 25.5838 23.2917 24.743 22.7645 23.7153C22.2374 22.6877 21.9738 21.8335 21.9738 21.1528C21.9738 20.8459 22.0572 20.629 22.224 20.5022C22.3909 20.3754 22.7345 20.252 23.255 20.1318L24.4762 19.8716C24.89 19.7782 25.1636 19.7314 25.297 19.7314C25.7908 19.7314 26.0845 20.0851 26.1779 20.7925C26.338 21.8869 26.7985 22.7811 27.5592 23.4751C28.4267 24.2492 29.4811 24.6362 30.7223 24.6362C32.1103 24.6362 33.2314 24.1424 34.0856 23.1548C34.833 22.3006 35.2067 21.273 35.2067 20.0718C35.2067 18.5236 34.5727 17.3291 33.3048 16.4883C32.8511 16.1813 32.4306 15.9377 32.0436 15.7576C31.6566 15.5774 30.5288 15.0936 28.6603 14.3062C24.9233 12.7313 23.0548 10.4224 23.0548 7.37939C23.0548 4.937 24.0958 3.02849 26.1779 1.65381C27.6994 0.652827 29.3943 0.152344 31.2628 0.152344C34.159 0.152344 36.4012 1.32014 37.9894 3.65576C38.2029 3.97608 38.3097 4.23633 38.3097 4.43652C38.3097 4.66341 38.253 4.83691 38.1395 4.95703C38.0261 5.07715 37.7625 5.264 37.3488 5.51758Z"
                  fill="white"
                />
              </svg>
            </nuxt-link>
          </div>

          <ul class="panel__header-nav">
            <li v-for="item in header" :key="item.id" class="panel__header-item">
              <div class="panel__header-label" :class="{isPassed: item.isPassed, isActive: item.isActive}">
                {{ item.label | localize(locale) }}
              </div>
            </li>
          </ul>
        </div>

        <div ref="wrapper" class="panel__wrapper">
          <ul class="panel__wrapper-list" :style="`transform: translate(${bodyPosition}px, 0)`">
            <li class="panel__wrapper-item">
              <div class="panel__body">
                <div class="panel__body-group">
                  <div class="panel__title">
                    {{ 'shipping_address' | localize(locale) }}
                  </div>

                  <div class="panel__form">
                    <div class="panel__form-group">
                      <input
                        v-model="firstName"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_name_first' | localize(locale)"
                        :class="{invalid: ($v.firstName.$dirty && !$v.firstName.required)}"
                      >

                      <div v-if="$v.firstName.$dirty && !$v.firstName.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__form-group">
                      <input
                        v-model="lastName"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_name_last' | localize(locale)"
                        :class="{invalid: ($v.lastName.$dirty && !$v.lastName.required)}"
                      >

                      <div v-if="$v.lastName.$dirty && !$v.lastName.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__form-group">
                      <input
                        v-model="country"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_country' | localize(locale)"
                        :class="{invalid: ($v.country.$dirty && !$v.country.required)}"
                      >

                      <div v-if="$v.country.$dirty && !$v.country.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__form-group">
                      <input
                        v-model="stateProvince"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_state_province' | localize(locale)"
                        :class="{invalid: ($v.stateProvince.$dirty && !$v.stateProvince.required)}"
                      >

                      <div v-if="$v.stateProvince.$dirty && !$v.stateProvince.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__form-group">
                      <input
                        v-model="city"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_city' | localize(locale)"
                        :class="{invalid: ($v.city.$dirty && !$v.city.required)}"
                      >

                      <div v-if="$v.city.$dirty && !$v.city.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__form-group">
                      <input
                        v-model="address"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_address' | localize(locale)"
                        :class="{invalid: ($v.address.$dirty && !$v.address.required)}"
                      >

                      <div v-if="$v.address.$dirty && !$v.address.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__form-group">
                      <input
                        v-model="apartment"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_apartment' | localize(locale)"
                        :class="{invalid: ($v.apartment.$dirty && !$v.apartment.required)}"
                      >

                      <div v-if="$v.apartment.$dirty && !$v.apartment.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__form-group">
                      <input
                        v-model="zipCode"
                        class="panel__form-input"
                        type="number"
                        maxlength="5"
                        :placeholder="'referral_postal' | localize(locale)"
                        :class="{invalid: ($v.zipCode.$dirty && !$v.zipCode.required || $v.zipCode.$dirty && !$v.zipCode.minLength)}"
                      >

                      <div v-if="$v.zipCode.$dirty && !$v.zipCode.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                      <div v-else-if="$v.zipCode.$dirty && !$v.zipCode.minLength" class="sign__body-error">
                        {{ 'field_min_length' | localize(locale) }} {{ $v.password.$params.minLength.min }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="panel__body-group">
                  <div class="panel__title">
                    {{ 'contact_information' | localize(locale) }}
                  </div>

                  <div class="panel__form">
                    <div class="panel__form-group">
                      <input
                        v-model="email"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_email' | localize(locale)"
                        :class="{invalid: ($v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email)}"
                      >

                      <div v-if="$v.email.$dirty && !$v.email.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                      <div v-else-if="$v.email.$dirty && !$v.email.email" class="sign__body-error">
                        {{ 'field_email' | localize(locale) }} {{ $v.password.$params.minLength.min }}
                      </div>
                    </div>

                    <div class="panel__form-group">
                      <input
                        v-model="phone"
                        class="panel__form-input"
                        type="text"
                        :placeholder="'referral_phone' | localize(locale)"
                        :class="{invalid: $v.phone.$dirty && !$v.phone.required }"
                      >

                      <div v-if="$v.phone.$dirty && !$v.phone.required" class="sign__body-error">
                        {{ 'field_required_field' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__form-checkbox panel__form-col2">
                      <input id="subscribe_email" v-model="newsletters" type="checkbox">
                      <label for="subscribe_email">{{ 'shopping_newsletter' | localize(locale) }}</label>
                    </div>
                  </div>

                  <div class="panel__body-group">
                    <div class="panel__form-checkbox">
                      <input id="call" v-model="notPhone" type="checkbox">
                      <label for="call">{{ 'shopping_dont_call' | localize(locale) }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li class="panel__wrapper-item">
              <div class="panel__body-group pt-0">
                <div class="panel__title pb-4">
                  {{ 'shipping_method' | localize(locale) }}
                </div>

                <ul class="panel__shipping">
                  <li v-for="shipping in shippingList" :key="shipping.title" class="panel__shipping-item">
                    <div class="panel__shipping-info">
                      <div class="panel__shipping-radio">
                        <input :id="shipping.title" v-model="shippingType" :value="shipping.title" type="radio" name="shipping" >
                        <label :for="shipping.title">{{ shipping.title }}</label>
                      </div>

                      <div class="panel__shipping-date">
                        {{ shipping.shipping.from }} {{ 'to' | localize(locale) }} {{ shipping.shipping.to }} {{ 'business_days' | localize(locale) }}
                      </div>
                    </div>

                    <div class="panel__shipping-price">
                      {{
                        shipping.price[currency]
                          ? currency === 'usd' ? '$' + shipping.price[currency] : shipping.price[currency] + ' грн'
                          : 'Free'
                      }}
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            <li class="panel__wrapper-item">
              <div class="panel__filter">
                <div class="panel__filter-header panel__title">
                  {{ 'payment_method' | localize(locale) }}
                </div>

                <div v-if="error" class="panel__filter-error">
                  {{ errorMsg }}
                </div>

                <ul class="panel__filter-body">
                  <li
                    v-for="filter in filtersCard"
                    :key="filter.id"
                    class="panel__filter-item"
                    :class="{isActive: filter.isActive}"
                    @click="filterCardHandler(filter.id)"
                  >
                    <span v-if="filter.localize">{{ filter.label | localize(locale) }}</span>
                    <span v-else>{{ filter.label }}</span>
                  </li>
                </ul>
              </div>

              <div v-if="activeFilterCard === 'debit_card'" class="panel__body">
                Mastercard / visa
              </div>

              <div v-else-if="activeFilterCard === 'paypal'" class="panel__body">
                paypal
              </div>

              <div v-else-if="activeFilterCard === 'bonus'" class="panel__body">
                <div class="panel__bonus">
                  <div class="panel__bonus-label">
                    {{ 'shopping_bill' | localize(locale) }}:
                  </div>

                  <div class="panel__bonus-value">
                    <span v-if="currency === 'usd'">$</span>{{ bonus[currency].toFixed(2) }} <span v-if="currency === 'uah'">грн.</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <ul
        v-if="card.length > 0"
        class="shopping__body"
        :class="{isSale: couponSale > 0 || notFoundCoupon, 'isSale--dbl': notFoundCouponDbl}"
      >
        <li v-for="product in card" :key="product.id" class="shopping__product">
          <div class="shopping__product-info">
            <nuxt-link :to="`/shop/${product.name.toLowerCase().split(' ').join('-')}`" class="shopping__product-thumb">
              <img :src="product.thumb" :alt="product.name" @click="closePanelHandler">
            </nuxt-link>

            <div>
              <div class="shopping__product-name">
                {{ product.name }}
              </div>

              <div class="shopping__product-pack">
                <div class="shopping__product-pack__label">
                  {{ product.pack }} {{ 'shopping_pack' | localize(locale) }}
                </div>

                <div class="shopping__product-pack__control">
                  <span @click="packMinusHandler(product.id)">&#8211;</span>
                  /
                  <span @click="packPlusHandler(product.id)">+</span>
                </div>
              </div>
            </div>
          </div>

          <div class="shopping__product-action">
            <p class="shopping__product-price">
              <span v-if="currency === 'usd'">$</span>{{ currency === 'usd'
                ? (product.pack * product.price[currency]).toFixed(2)
                : product.pack * product.price[currency] }} <span v-if="currency === 'uah'">грн.</span>
            </p>

            <p class="shopping__product-remove" @click="removeProductHandler(product.id)">
              {{ 'shopping_remove' | localize(locale) }}
            </p>
          </div>
        </li>
      </ul>

      <div v-else class="shopping__empty">
        <img
          src="data:image/png;base64,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"
          alt=""
          class="shopping__empty-icon"
        >

        <p class="shopping__empty-text">
          {{ 'shopping_empty' | localize(locale) }}
        </p>

        <div class="btn--lg1" @click="closePanelHandler">
          <nuxt-link to="/shop" class="shopping__empty-link btn btn--green btn--lg1">
            {{ 'to_the_webshop' | localize(locale) }}
          </nuxt-link>
        </div>
      </div>

      <div v-if="card.length > 0" class="shopping__general">
        <div v-if="!openPanel" class="shopping__general-info">
          <div class="shopping__general-description">
            <div class="shopping__general-title">
              {{ 'card_subtotal' | localize(locale) }}:
            </div>

            <div class="shopping__general-text">
              {{ 'shopping_description' | localize(locale) }}
            </div>
          </div>

          <div class="shopping__general-total">
            <span v-if="currency === 'usd'">$</span>{{ currency === 'usd'
              ? total.toFixed(2)
              : total }} <span v-if="currency === 'uah'">грн.</span>
          </div>
        </div>

        <div v-if="!openPanel" class="shopping__general-actions">
          <div class="shopping__general-wrap" @click="closePanelHandler">
            <nuxt-link to="/shop" class="shopping__general-link btn btn--default btn--fluid1">
              {{ 'to_shop' | localize(locale) }}
            </nuxt-link>
          </div>

          <div class="shopping__general-wrap" @click="openCheckoutPanel">
            <div class="shopping__general-link btn btn--green btn--fluid1">
              {{ 'shopping_checkout' | localize(locale) }}
            </div>
          </div>
        </div>

        <div v-if="openPanel" class="panel__info">
          <form class="panel__info-coupon" @submit.prevent="searchCoupon">
            <input
              v-model="coupon"
              :placeholder="'shopping_coupon_enter' | localize(locale)"
              class="panel__info-input"
              type="text"
              :class="{invalid: notFoundCoupon}"
              @input="resetCouponHandler"
            >

            <button class="panel__info-submit btn btn--default btn--default-green btn--xl">
              {{ 'apply' | localize(locale) }}
            </button>
          </form>

          <div v-if="notFoundCoupon" class="panel__info-helper">
            {{ 'shopping_coupon_not' | localize(locale) }}
          </div>

          <ul class="panel__info-list">
            <li class="panel__info-item">
              <div class="panel__info-title">
                {{ 'card_subtotal_2' | localize(locale) }}:
              </div>

              <div class="panel__info-value">
                <span v-if="currency === 'usd'">$</span>{{ currency === 'usd'
                  ? total.toFixed(2)
                  : total }} <span v-if="currency === 'uah'">грн.</span>
              </div>
            </li>
            <li class="panel__info-item">
              <div class="panel__info-title">
                {{ 'shopping_shipping' | localize(locale) }}:
              </div>

              <div class="panel__info-value">
                {{
                  shipping[currency] === 0
                    ? '&#8211;'
                    : currency === 'usd'
                      ? `$${shipping[currency].toFixed(2)}`
                      : `${shipping[currency]} грн`
                }}
              </div>
            </li>
            <li v-if="couponSale !== 0" class="panel__info-item">
              <div class="panel__info-title">
                {{ 'shopping_coupon_title' | localize(locale) }}:
              </div>

              <div class="panel__info-value">
                {{ couponSale }}%
              </div>
            </li>
          </ul>
        </div>

        <div v-if="openPanel" class="panel__total">
          <div class="panel__total-label">
            {{ 'card_total' | localize(locale) }}:
          </div>

          <div class="panel__total-price">
            <span v-if="currency === 'usd'">$</span>{{ totalValue }} <span v-if="currency === 'uah'">грн.</span>
          </div>
        </div>

        <div v-if="panelType === 'order'" class="shopping__general-actions">
          <div class="shopping__general-wrap" @click="closePanelHandler">
            <nuxt-link to="/shop" class="shopping__general-link btn btn--white btn--fluid1">
              {{ 'shopping_return_to_shop' | localize(locale) }}
            </nuxt-link>
          </div>

          <div class="shopping__general-wrap" @click="nextSteepHandler('shipping')">
            <div class="shopping__general-link btn btn--green btn--fluid1">
              {{ 'shopping_next_step' | localize(locale) }}
            </div>
          </div>
        </div>
        <div v-else-if="panelType === 'shipping'" class="shopping__general-actions">
          <div class="shopping__general-wrap" @click="prevSteepHandler('order')">
            <div class="shopping__general-link btn btn--default btn--fluid1">
              {{ 'shopping_back' | localize(locale) }}
            </div>
          </div>

          <div class="shopping__general-wrap" @click="nextSteepHandler('card')">
            <div class="shopping__general-link btn btn--green btn--fluid1">
              {{ 'shopping_next_step' | localize(locale) }}
            </div>
          </div>
        </div>
        <div v-else-if="panelType === 'card'" class="shopping__general-actions">
          <div class="shopping__general-wrap" @click="prevSteepHandler('shipping')">
            <div class="shopping__general-link btn btn--default btn--fluid1">
              {{ 'shopping_back' | localize(locale) }}
            </div>
          </div>

          <div class="shopping__general-wrap" @click="sendFormHandler">
            <div class="shopping__general-link btn btn--green btn--fluid1">
              {{ 'shopping_send' | localize(locale) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="shopping__panel">
      <div class="shopping__header">
        <div class="shopping__header-count">
          <div class="shopping__header-title">
            {{ 'shopping_title' | localize(locale) }}<span v-if="card.length > 0">:</span>
          </div>
          <div v-if="card.length > 0" class="shopping__header-value">
            {{ card.length }} <span v-if="card.length === 1">{{ 'search_item' | localize(locale) }}</span>
            <span v-else-if="card.length > 1 && card.length < 4">{{ 'search_items' | localize(locale) }}</span>
            <span v-else>{{ 'search_itemss' | localize(locale) }}</span>
          </div>
        </div>

        <div class="shopping__header-close" @click="closePanelHandler">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.8"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.3338 4.36311L20.061 3.09032L12 11.1513L3.93898 3.09032L2.66619 4.36311L10.7272 12.4241L3.09045 20.0609L4.36325 21.3337L12 13.6969L19.6368 21.3337L20.9095 20.0609L13.2728 12.4241L21.3338 4.36311Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div class="shopping__empty">
        <img
          src="data:image/png;base64,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"
          alt=""
          class="shopping__empty-icon"
        >

        <p class="shopping__empty-text">
          {{ 'shopping_finally' | localize(locale) }}
        </p>

        <div class="btn--lg1" @click="closePanelHandler">
          <nuxt-link to="/shop" class="shopping__empty-link btn btn--green btn--lg1">
            {{ 'to_the_webshop' | localize(locale) }}
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="shopping__bg"/>
  </article>
</template>

<script>
import Shopping from '@/mixins/shopping/shopping.mixin'
import Panel from '@/mixins/shopping/panel.mixin'

import Order from '@/mixins/shopping/order.mixin'
import Info from '@/mixins/shopping/info.mixin'
import Shipping from '@/mixins/shopping/shipping.mixin'
import Payment from '@/mixins/shopping/payment.mixin'
import localeMixin from '@/mixins/localize.mixin'

export default {
  name: 'ShoppingCard',
  mixins: [Shopping, Panel, Order, Shipping, localeMixin, Info, Payment],
  data: () => ({
    isAnimate: false,

    openPanel: false,

    coupon: 'ACF3AC52338A9D4E',
    notFoundCoupon: false,
    notFoundCouponDbl: false,

    shipping: {uah: 0, usd: 0},
    couponSale: 0
  }),
  computed: {
    totalValue () {
      if (this.couponSale > 0) {
        return this.currency === 'usd'
          ? (this.total - ((this.total / 100) * this.couponSale) + this.shipping[this.currency]).toFixed(2)
          : (this.total - ((this.total / 100) * this.couponSale) + this.shipping[this.currency])
      }

      return this.currency === 'usd'
        ? (this.total + this.shipping[this.currency]).toFixed(2)
        : this.total + this.shipping[this.currency]
    }
  },
  methods: {
    resetCouponHandler () {
      this.notFoundCoupon = false
      this.notFoundCouponDbl = false
    },

    async searchCoupon () {
      await this.$axios.$post('/api/coupon', {coupon: this.coupon})
        .then((res) => {
          if (res.ok) {
            this.couponSale = res.body
          } else {
            this.notFoundCoupon = true
            this.notFoundCouponDbl = this.couponSale > 0
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
