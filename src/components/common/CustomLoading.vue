<template>
    <div class="loading">
        <img src="@/assets/loading4.gif" alt="">
    </div>
</template>

<style scoped lang="scss">
.loading {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
        padding: 6px 15px;
    }
}
.loading img{
    width: 5rem;
    height: 5rem;
}
</style>