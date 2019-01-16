<template>
  <form>
    <section class="project-create_formTitle">
      <h1><img src="/static/img/svg/016-suitcase.svg" /><span>About your company</span></h1>
    </section>
    <div class="row">
      <div class="col-6">
        <ui-input-text name="companyname" placeholder="Your company name" class="is--fluid" />
      </div>
      <div class="col-6">
        <ui-input-text name="lastname" placeholder="Your company id" class="is--fluid" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <ui-input-text name="email" placeholder="Zipcode" class="is--fluid" />
      </div>
      <div class="col-6">
        <ui-input-text name="adress" placeholder="Address" class="is--fluid" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <ui-input-text name="tel" placeholder="Phone number" class="is--fluid" />
      </div>
    </div>
  </form>
</template>
