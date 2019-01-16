<template>
  <div class="sidebar-comment" :class="showSidebar ? 'sidebar-comment--showing' : 'sidebar-comment--hiding'" v-if="hasModuleAccess('comment')">
    <div class="sidebar-comment_buttonContainer">
      <div class="sidebar-comment_title">{{ title }}</div>
      <div class="sidebar-comment_closeIcon" @click.prevent="hideSidebarComment"></div>
    </div>
    <div class="sidebar-comment_listContainer" ref="container">
      <template v-if="comments && comments.length">
        <template v-for="(comment, index) in comments">
          <div class="sidebar-comment_container" :key="index" v-if="comment.user && comment.body">
            <div class="sidebar-comment_top">
              <div class="sidebar-comment_icon">
                <img :src="comment.user.picture" alt="" class="sidebar-comment_userIcon">
              </div>
              <div class="sidebar-comment_header">
                <div class="sidebar-comment_name">{{ comment.user.name }}</div>
                <div class="sidebar-comment_date">{{ comment.createdAt | convertDate }}</div>
              </div>
            </div>
            <div class="sidebar-comment_content">{{ comment.body }}</div>
          </div>
        </template>
      </template>
    </div>
    <div class="sidebar-comment_form">
      <textarea placeholder="コメントする" class="sidebar-comment_text" v-model="newComment"></textarea>
      <ui-input-submit label="投稿" :disabled="!newComment || isLoading" @click="onSubmit" />
    </div>
  </div>

</template>

<style lang="sass" scoped>
  @import "../../assets/sass/module";
</style>

<script>
import Vue from 'vue';
import moment from 'moment';

export default {
  data() {
    return {
      newComment: '',
      showSidebar: false,
      title: '',
      endpoint: '',
      comments: [],
      isLoading: false
    };
  },
  mounted() {
    Vue.$bus.$on("setSidebarComment", async (data) => {
      this.title = data.title;
      this.reference = data.reference;
      this.doc = data.doc;
      this.submit = data.submit;
      this.showSidebar = true;

      this.isLoading = true;

      let docs = await Vue.$api.get(`/comments`, {
        params: {
          reference: this.reference,
          doc: this.doc
        }
      });
      this.comments = docs;

      this.isLoading = false;
      this.$nextTick(() => {
        this.scrollBottom();
      });
    });
  },
  updated() {
    this.scrollBottom();
  },
  filters: {
    convertDate(value) {
      if(!value) return '';
      return moment(value).format('YYYY.MM.DD HH:mm') ;
    }
  },
  methods: {
    scrollBottom() {
      const comments = this.$refs.container;
      if(comments) {
        comments.scrollTop = comments.scrollHeight;
      }
    },
    async onSubmit() {
      if(!this.reference || !this.doc) return false;

      this.isLoading = true;

      let comment = {
        body: this.newComment,
        user: {
          userId: this.me._id,
          name: `${this.me.firstname} ${this.me.lastname}`,
          picture: ''
        },
        createdAt: moment().format('YYYY/MM/DD HH:mm')
      };

      await Vue.$api.post(`/comments`, {
        reference: this.reference,
        doc: this.doc,
        ...comment
      });

      this.newComment = '';
      this.comments.push(comment);
      this.isLoading = false;
    },
    hideSidebarComment() {
      this.title = '';
      this.comments = [];
      this.showSidebar = false;
    }
  }
};
</script>
