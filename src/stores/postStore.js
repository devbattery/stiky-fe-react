import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => ({
    myBlog: {
      title: "",
      description: "",
      defaultCategory: "dev",
    },
    myPosts: [],
    currentPost: null,
    feedPosts: [],
    isLoading: false,
  }),
  getters: {
    hasBlog(state) {
      return Boolean(state.myBlog?.title);
    },
  },
  actions: {
    async fetchMyBlog() {
      // TODO: call GET /api/me/blog and update myBlog
    },
    async updateMyBlog(payload) {
      // TODO: call PUT /api/me/blog with payload then refresh state
    },
    async fetchMyPosts() {
      // TODO: call GET /api/posts?authorId=me
    },
    async fetchPostById(postId) {
      // TODO: call GET /api/posts/:id and set currentPost
    },
    async savePost(payload) {
      // TODO: call POST or PUT depending on payload.id
    },
    async fetchTrendingPosts(params) {
      // TODO: call GET /api/feed/trending?
    },
    resetCurrentPost() {
      this.currentPost = null;
    },
  },
});
