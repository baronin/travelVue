<template>
  <section class="posts">
    <div class="container posts__container">
      <h1>posts {{ postCount }}</h1>
      <form-post />
      <hr />
      <ul>
        <li v-for="post in validPost" :key="post.id" class="post-item">
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormPost from '@/components/form-post/form-post'

export default {
  name: 'ThePosts',
  components: { FormPost },
  computed: {
    ...mapGetters(['validPost', 'postCount']),
  },
  async mounted() {
    await this.fetchPosts()
  },
  methods: {
    // ...mapActions('api', ['getToken']),
    ...mapActions(['fetchPosts']),
  },
}
</script>

<style scoped>
.posts {
  padding-top: 40px;
  padding-bottom: 40px;
}
.posts__container {
  max-width: 90%;
}

.post-item {
  padding: 10px;
  border-bottom: 1px solid blueviolet;
}
</style>
