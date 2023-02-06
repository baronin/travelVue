<template>
  <form @submit.prevent="onSubmit">
    <input v-model="title" type="text" placeholder="title" />
    <input v-model="body" type="text" placeholder="body" />
    <button type="submit">Create post</button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'FormPost',
  data() {
    return {
      title: '',
      body: '',
    }
  },
  methods: {
    ...mapMutations(['createPost']),
    onSubmit() {
      this.createPost({
        title: this.title,
        body: this.body,
        id: Date.now(),
      })
      this.title = this.body = ''
    },
  },
}
</script>

