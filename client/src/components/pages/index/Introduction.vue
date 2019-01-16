<template>
  <div class="page-index_intro" id="pageIndexIntroduction">
    <div class="page-index_introInner">
      <h1>
        <small>Freelancer-To-Agency</small>
        Front End <br />
        Coding Service
      </h1>
      <hr class="fish--hook" />
      <p>We are focused on delivering high-class HTML/CSS markup, VueJs, react SPA development.</p>
    </div>
    <img src="https://previews.123rf.com/images/ilyaf/ilyaf1511/ilyaf151100005/48490154-illustration-vectorielle-des-essaims-de-requins-sur-la-profondeur-de-l-oc%C3%A9an.jpg" />
  </div>
</template>

<style lang="scss" scoped>
  .page-index_introInner {
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      background: url(/static/img/fugubg.png);
      background-repeat: no-repeat;
      background-size: auto 300px;
      background-position: center right;
      opacity: 0.2;
    }
  }
</style>
