<template>
    <div>
        <Header/>
        <the-main/>
    </div>
</template>

<script>
    import Header from "../../assets/components/the-header/the-header";
    import TheMain from "../../assets/components/the-main/the-main";
    export default {
        name: 'MainComponent',
        components: {TheMain, Header},
    }
</script>
