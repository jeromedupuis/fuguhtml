<template>
  <div class="layout-default_header" id="siteHeader">
    <site-logo />

    <nav class="layout-default_nav">
      <ul>
        <li>
          <router-link :to="{ name: 'PageIndex' }">Home</router-link>
        </li>
        <li class="nav__dropdown-holder">
          <router-link :to="{ name: 'PageServices' }">Services</router-link>
          <ul>
            <li>
              <a href="/front-end-coding">
                <span class="nav__dropdown-icon">
                  <i class="ico-nav-html"></i>
                </span>
                <span>Front-End Coding</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <router-link :to="{ name: 'PageAbout' }">About</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'PageSamples' }">Samples</router-link>
        </li>
        <li class="nav__order">
          <router-link :to="{ name: 'PageOrderNow' }">Order Now</router-link>
        </li>
        <li class="nav__login">
          <router-link :to="{ name: 'PageClientAreaLogin' }">
            <span>Client Login</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
