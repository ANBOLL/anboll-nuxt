<script setup lang="ts">
	const className = "b-footer";
</script>

<template>
	<div :class="[className, 'l-content-container']">
		<p>Ага, вот этот подвал</p>
	</div>
</template>

<style lang="scss">
	$class-name: "b-footer";

	.#{$class-name} {
		display: flex;
		align-items: center;
		width: 100%;
		height: 90px;
		background-color: $color-grey;
	}
</style>
