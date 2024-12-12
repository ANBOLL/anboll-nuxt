<script setup lang="ts">
	import { useSeoMeta } from "#app";
	import { definePageMeta } from "#imports";
	import { HomePage } from "@/2-pages/home-page/ui";

	useSeoMeta({
		title: "ANBOLL",
		description: "description для главной страницы.",
	});

	definePageMeta({
		headerOffset: false,
		name: "home",
        h1: "Главная",
	});
</script>

<template>
	<HomePage />
</template>
