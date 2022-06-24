<template lang="">
    <header class="flex">
        <div class="branding flex" >
            <img src="../assets/icons/logo.png" />
        </div>
    </header>
</template>
<script>
export default {
    name:"Navigation"
};

</script>
<style lang="scss" scoped>
header {
    z-index: 99;
    flex-direction: row;
    background-color: #080a16;
    @media (min-width: 900px) {
        min-height: 100%;
        min-width: 90px;
        flex-direction: column;
        border-radius: 0 20px 20px 0;
    }
}

.branding {
    border-radius: 0 20px 20px 0;
    background-color: #ffffff;
    justify-content: center;
    padding: 24px;
    @media (min-width: 900px) {
       width: 100%;
    }
}

img {
    width: 90px;
    height: 30px;
}
</style>