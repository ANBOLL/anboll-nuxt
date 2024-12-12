<script setup lang="ts">
	const className = "b-header";
</script>

<template>
	<div :class="[className, 'l-content-container']">
		<p>Ага, вот эта шапка</p>
	</div>
</template>

<style lang="scss">
	$class-name: "b-header";

	.#{$class-name} {
		display: flex;
		align-items: center;
		width: 100%;
		background-color: $color-grey;
		height: $header-height-mobile;

		@include breakpoint("tablet") {
			height: $header-height-tablet;
		}

		@include breakpoint("desktop") {
			height: $header-height-desktop;
		}
	}
</style>
