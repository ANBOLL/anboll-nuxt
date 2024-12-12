<script setup lang="ts">
	const className = "b-main-banner";

	defineProps<{
		image: string;
		title: string;
	}>();
</script>

<template>
	<div :class="[className]">
        <img :src="image" alt="">
        <div :class="[className + '__title-banner', 'h1', 'padding-violet-top', 'padding-violet-bottom']" v-html="title"/>
    </div>
</template>

<style lang="scss">
	$class-name: "b-main-banner";

	.#{$class-name} {
        height: 100vh;
        width: 100vw;
        position: relative;
        overflow-y: scroll;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: bottom;
        }

        &__title-banner {
            position: absolute;
            inset: 0;
            margin: auto;
            height: max-content;
            width: max-content;
            font-weight: bold;
            color: $color-grey;
            padding-left: 40px;
            padding-right: 40px;
            background-color: $color-select-blue;
            border-radius: 50px;
        }
    }
</style>
