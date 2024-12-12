<script setup lang="ts">
	import { Header } from "@/3-widgets/header";
	import { Footer } from "@/3-widgets/footer";
	import Lenis from "lenis";
	import { onMounted } from "vue";

	onMounted(() => {
		new Lenis({
			autoRaf: true,
			duration: 2,
		});
	});
</script>

<template>
	<div>
		<Header />
		<slot />
		<Footer />
	</div>
</template>
