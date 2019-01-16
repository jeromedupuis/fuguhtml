<template>
  <layout-default class="page-index" headerClass="is--inverted">

    <index-introduction />

    <section class="section-container is--fluid section--first">
      <div class="section-container_head">
        <h1 class="text--shadow">Our services</h1>
      </div>
      <p>
        Every line of code we deliver is carefully thought by our engineering team.<br />
        While constantly looking for best practicing, we are focusing our attention on theses areas :
      </p>

      <div class="row section-services_list">
        <div class="col-4 section-services_listItem">
          <div class="section-services_listItem_head">
            <img src="http://www.iconarchive.com/download/i73026/cornmanthe3rd/plex/Other-html-5.ico" />
          </div>
          <h2>
            <small>PSD to HTML</small>
            Front End Coding
          </h2>
          <p>We convert any design file: PSD, Sketch, Ai, Adobe XD to pixel perfect, semantic and standard compliant HTML/CSS template.</p>
          <hr class="fish--hook" />
        </div>
        <div class="col-4 section-services_listItem">
          <div class="section-services_listItem_head">
            <img src="https://humancoders-formations.s3.amazonaws.com/uploads/course/logo/104/thumb_bigger_formation-vue-js.png" />
          </div>
          <h2>
            <small>PSD to VueJs App</small>
            VueJs App
          </h2>
          <p>Performance, Scalability, Reusable Components, One Way Data Flow - the perfect ingredients for single-page applications.</p>
          <hr class="fish--hook" />
        </div>
        <div class="col-4 section-services_listItem">
          <div class="section-services_listItem_head">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png" />
          </div>
          <h2>
            <small>PSD to React App</small>
            React App
          </h2>
          <p>Performance, Scalability, Reusable Components, One Way Data Flow - the perfect ingredients for single-page applications.</p>
          <hr class="fish--hook" />
        </div>
      </div>
    </section>
  </layout-default>
</template>

<style lang="sass">
  @import "../../../assets/sass/pages/index.scss";
</style>

<script>
import LayoutDefault from '@/components/layouts/default/Layout';
import IndexIntroduction from '@/components/pages/index/Introduction';

export default {
  components: {
    'layout-default': LayoutDefault,
    'index-introduction': IndexIntroduction
  }
};
</script>
