import {api} from "@/api/api";

export default {
    state: {
        posts: []
    },
    getters: {
        validPost(state) {
            return state.posts.filter(content => {
                return content.title && content.body;
            })
        },
        allPosts(state) {
            return state.posts;
        },
        postCount(state, getters) {
            return getters.validPost.length;
        }
    },
    mutations: {
        updatePost(state, posts) {
            state.posts = posts;
        },
        createPost(state, newPost) {
            if (!newPost.title || !newPost.body) return;
            console.log('createPost', newPost);
            state.posts.unshift(newPost)
        }
    },
    actions: {
        async fetchPosts(context) {
            // const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
            // const posts = await res.json();
            const posts = await api.posts.get({limit: 3})
            console.log('posts', posts)
            context.commit('updatePost', posts.data)
        }
    },
}
