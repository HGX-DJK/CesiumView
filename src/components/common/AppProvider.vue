<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <sl-loading></sl-loading>
            <n-notification-provider>
                <n-message-provider>
                    <sl-message></sl-message>
                    <slot></slot>
                </n-message-provider>
            </n-notification-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>

<script setup lang="ts">
import slMessage from "./Message.vue";
import slLoading from "./Loading.vue";
</script>


<style scoped></style>