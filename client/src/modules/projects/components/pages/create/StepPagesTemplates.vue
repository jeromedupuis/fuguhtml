<template>
  <form class="project-create_step--step3">
    <section class="project-create_formTitle">
      <h1><img src="/static/img/svg/004-puzzle-pieces.svg" /><span>Pages and Templates</span></h1>
    </section>
    <div class="row">
      <div class="col-12">
        <section class="project-create_inputTitle">
          <h1>Number of templates</h1>
        </section>
        <div class="text--center">
          <button class="project-create_buttonCount" @click.prevent="incrementTemplate(-1)">
            <img src="/static/img/svg/023-less.svg" />
          </button>
          <ui-input-number v-model="templateCount" :min="1" :max="999" :step="1" name="pages" placeholder="-" class="project-create_input--count" />
          <button class="project-create_buttonCount" @click.prevent="incrementTemplate(1)">
            <img src="/static/img/svg/022-more.svg" />
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <section class="project-create_inputTitle">
          <h1>Number of pages</h1>
        </section>
        <div class="text--center">
          <button class="project-create_buttonCount" @click.prevent="incrementPage(-1)">
            <img src="/static/img/svg/023-less.svg" />
          </button>
          <ui-input-number v-model="pageCount" :min="1" :max="999" :step="1" name="pages" placeholder="-" class="project-create_input--count" />
          <button class="project-create_buttonCount" @click.prevent="incrementPage(1)">
            <img src="/static/img/svg/022-more.svg" />
          </button>
        </div>
      </div>
    </div>

    <div class="row margin--double">
      <div class="col-12">
        <section class="project-create_inputTitle">
          <h1>Select Compatibility</h1>
        </section>
        <div class="project-create_selectCompatilibity">
          <ul>
            <li>
              <div>
                <img src="/static/img/svg/031-desktop.svg" width="60" />
                <span>Desktop</span>
              </div>
            </li>
            <li>
              <div>
                <img src="/static/img/svg/032-tablet.svg" width="60" />
                <span>Tablet</span>
              </div>
            </li>
            <li>
              <div>
                <img src="/static/img/svg/033-smartphone.svg" width="60" />
                <span>Smartphone</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      pageCount: 1,
      templateCount: 1
    };
  },
  mounted() {
    this.setNewProjectInfo();
  },
  destroyed() {
    this.setNewProjectInfo();
  },
  methods: {
    setNewProjectInfo() {
      this.$store.dispatch('setNewProjectInfo', {
        frontend: {
          pageCount: this.pageCount,
          templateCount: this.templateCount
        }
      });
    },
    incrementTemplate(inc) {
      let templateCount = parseInt(this.templateCount) + parseInt(inc);
      if(templateCount < 1) {
        templateCount = 1;
      }
      else if(templateCount > 999) {
        templateCount = 999;
      }
      this.templateCount = templateCount;
      return false;
    },
    incrementPage(inc) {
      let pageCount = parseInt(this.pageCount) + parseInt(inc);
      if(pageCount < 1) {
        pageCount = 1;
      }
      else if(pageCount > 999) {
        pageCount = 999;
      }
      this.pageCount = pageCount;
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
  .project-create_selectCompatilibity {
    text-align: center;
    ul {
      list-style: none;
      li {
        width: 100px;
        display: inline-block;
        img, span {
          display: block;
        }
        img {
          height: 60px;
          width: auto;
          margin:0 auto;
        }
        span {
          margin-top:12px;
        }
      }
    }
  }
</style>
