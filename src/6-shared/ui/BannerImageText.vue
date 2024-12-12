<script setup lang="ts">
	const className = "b-banner-image-text";

	defineProps<{
		title: string;
		image: string;
		desc?: string;
		link?: string;
		mod?: string;
	}>();
</script>

<template>
	<div :class="[className, mod]">
        <div :class="[className + '__text-block', 'padding-yellow-top', 'padding-yellow-bottom']">
            <div :class="[className + '__title', 'h2']" v-html="title" />
            <div v-if="desc" :class="[className + '__desc', 'texts1', 'margin-violet-top']" v-html="desc" />
        </div>
        <div :class="[className + '__image-block']">
            <img :src="image">
        </div>
    </div>
</template>

<style lang="scss">
	$class-name: "b-banner-image-text";

	.#{$class-name} {
        overflow: hidden;

        @include grid-container12();

        &.left {
            .#{$class-name} {
                &__text-block {
                    order: 1;
                }

                &__image-block {
                    order: 0;
                }
            }
        }

        &__text-block {
            grid-column: 4 span;
            background-color: $color-grey-light;
            border-radius: 30px;
            padding-left: 30px;
            padding-right: 30px;

            @include breakpoint("tablet") {
                grid-column: 6 span;
                padding-left: 40px;
                padding-right: 40px;
			}

            @include breakpoint("desktop") {
                grid-column: 4 span;
                padding-left: 50px;
                padding-right: 50px;
			}
        }

		&__image-block {
			display: block;
			width: 100%;
			object-fit: cover;
			object-position: center;
			border-radius: 30px;
			height: 150px;
            overflow: hidden;
            grid-column: 4 span;

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                grid-column: 4 span;
                min-height: 300px;
            }

			@include breakpoint("tablet") {
                grid-column: 8 span;
			}

			@include breakpoint("middle") {
				min-height: 550px;
			}

			@include breakpoint("desktop") {
				min-height: 700px;
			}
		}
    }
</style>
