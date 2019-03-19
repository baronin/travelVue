<template>
        <main class="main">
            <div class="container">
                <the-form/>
            </div>
        </main>
</template>

<script>
    import './the-main.scss';
    import TheForm from "../the-form/the-form";
    export default {
        name: "the-main",
        components: {TheForm},
    }
</script>