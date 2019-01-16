<template>
  <div class="page-comment" v-if="hasModuleAccess('comment')">
    <div class="page-comment_listContainer" ref="container">
      <template v-if="mergedComments && mergedComments.length">
        <div class="page-comment_container" v-for="(comment, index) in mergedComments" :key="index">
          <div v-if="comment.user && comment.body" :id="`comment-${index+1}`">
            <div class="page-comment_top">
              <div class="page-comment_icon">
                <img :src="comment.user.picture" alt="" class="page-comment_userIcon">
              </div>
              <div class="page-comment_header">
                <div class="page-comment_name">{{ comment.user.name }}</div>
                <div class="page-comment_date">{{ comment.createdAt | moment('YYYY.MM.DD HH:mm') }}</div>
                <div class="page-comment_note"><router-link :to="getCurrentNoteLink(index+1)">#{{ index+1 }}</router-link></div>
              </div>
            </div>
            <div class="page-comment_content">{{ comment.body }}</div>
          </div>
        </div>
      </template>
    </div>
    <div class="page-comment_form" v-if="!isLoading">
      <textarea placeholder="コメントする" class="page-comment_text" v-model="newComment"></textarea>
      <div class="page-comment_formSubmit">
        <ui-input-submit :disabled="!newComment" label="投稿" @click="onSubmit" />
      </div>
    </div>
  </div>

</template>

<style lang="sass" scoped>
  @import "../../assets/sass/module";
</style>

<script>
import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';

export default {
  data() {
    return {
      newComment: '',
      loadedComments: [],
      isLoading: false
    };
  },
  props: {
    reference: {
      type: String,
      required: true
    },
    doc: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    mergedComments() {
      return _.concat(this.comments, this.loadedComments);
    }
  },
  methods: {
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
      this.loadedComments.push(comment);
      this.isLoading = false;
    },
    getCurrentNoteLink(note) {
      return window.location.pathname+'#comment-'+note;
    },
    scrollToNote() {
      if(window.location.hash) {
        this.$scrollTo(window.location.hash, 500, {
          offset: -80
        });
      }
    }
  },
  async mounted() {
    if(_.isEmpty(this.comments)) {
      this.isLoading = true;

      let docs = await Vue.$api.get(`/comments`, {
        params: {
          reference: this.reference,
          doc: this.doc
        }
      });

      this.loadedComments = docs;
      this.isLoading = false;
      this.$nextTick(() => {
        this.scrollToNote();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .page-comment_top {
    margin-top:22px;
    background-color: #f8f8f8;
    padding: 8px;
    padding-left: 11px;
    padding-right: 20px;
    border-bottom: none;
  }
  .page-comment_icon {
    float:left;
  }
  .page-comment_header {
    display: block;
    font-size: 12px;
    color: #333;
  }
  .page-comment_name {
    display: inline-block;
  }
  .page-comment_date {
    display: inline-block;
  }
  .page-comment_note {
    display: inline-block;
    float: right;
  }
  .page-comment_content {
    padding: 10px 10px 20px 10px;
    color: #333;
    line-height: 1.6;
    white-space: pre-wrap
  }
  .page-comment_form {
    background: #f8f8f8;
    border-radius: 3px;
    padding: 15px;
    &Submit {
      text-align: right;
    }
    textarea {
      display: block;
      margin-bottom: 12px;
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      height: 80px;
      min-height: 80px;
      font-size: 14px;
      color: #333;
      -webkit-appearance: none;
      border: 1px solid #ccc;
      padding: 10px;
    }
  }
</style>
