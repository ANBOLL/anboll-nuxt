<script setup lang="ts">
	import { BannerImageText, MainBanner } from '@/6-shared/ui';
	import { checkScreenWidth } from '@/6-shared/lib/Tools';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMounted, onUnmounted, ref } from 'vue';
	import gsap from 'gsap';
	
	const className = "b-main-page";
	const imagesBannersGsap = ref<HTMLElement | null>(null);
	const mainBannerGsap = ref<HTMLElement | null>(null);
	let gsapAnimation: ReturnType<typeof gsap.context> | null = null;
	const dataCards = [
		{
			"title": "Кто если не я?",
			"desc": "- хз.",
			"image": "/files/main-page/1.webp",
		},
		{
			"title": "А если хорошо подумать?",
			"desc": "- никто.",
			"image": "/files/main-page/2.webp",
			"mod": "left",
		},
		{
			"title": "Ну и замечательно!",
			"desc": "- факты, факты...",
			"image": "/files/main-page/3.webp",
		}
	];
	const imageMain = "/files/main-page/4.webp";
	const titleMain = "Приветули!";

	onMounted(()=> {
		gsap.registerPlugin(ScrollTrigger);
		if (!checkScreenWidth("desktop")) {
			if (imagesBannersGsap.value) {
				gsapAnimation = gsap.context(() => {
					const valuesContainer = imagesBannersGsap.value;
					
					let cards: NodeListOf<HTMLElement> | null = null;
					let textCards: HTMLElement[] = [];
						
					if (valuesContainer) {
						cards = valuesContainer.querySelectorAll(`.${className}__banner-image`);
					}
						
					if (cards) {
						textCards = Array.from(cards).map(element => element.querySelector('.b-banner-image-text__text-block') as HTMLElement);
	
						cards.forEach((card) => {
							gsap.set(card, { y: 200 });
						});
	
						cards.forEach((card) => {
							const gsapCard = gsap.timeline({
								scrollTrigger: {
									trigger: card,
									start: "top bottom",
									end: 'top 20%',
									scrub: true,
								}
							});
							gsapCard.to(card, {
								y: 0,
							});
						});
					}
	
					let titleCard: HTMLElement | null = null;
					let descCard: HTMLElement | null = null;
	
					if (textCards) {
	
						textCards.forEach((textCard, index) => {
							gsap.set(textCard, { x: 200 });
	
							if (index % 2 === 0) {
								gsap.set(textCard, { x: -200 });
							}
	
							titleCard = textCard.querySelector('.b-banner-image-text__title') as HTMLElement;
							descCard = textCard.querySelector('.b-banner-image-text__desc') as HTMLElement;
	
							gsap.set(titleCard, { y: 100, opacity: 0 });
							gsap.set(descCard, { y: 150, opacity: 0 });
	
							if (titleCard) {
								const gsapTitleCard = gsap.timeline({
									scrollTrigger: {
										trigger: titleCard,
										start: "top bottom",
										end: 'top 20%',
										scrub: true,
									}
								});
								gsapTitleCard.to(titleCard, {
									y: 0,
									opacity: 1
								});
							}
	
							if (descCard) {
								const gsapDescCard = gsap.timeline({
									scrollTrigger: {
										trigger: descCard,
										start: "top bottom",
										end: 'top 20%',
										scrub: true,
									}
								});
								gsapDescCard.to(descCard, {
									y: 0,
									opacity: 1
								});
							}
						});
	
						textCards.forEach((textCard) => {
							const gsapCard = gsap.timeline({
								scrollTrigger: {
									trigger: textCard,
									start: "top bottom",
									end: 'top 20%',
									scrub: true,
								}
							});
							gsapCard.to(textCard, {
								x: 0,
							});
						});
					}
	
				}, imagesBannersGsap.value);
			}
			
			let mainBanner: HTMLElement | null = null;
			let titleMainBanner: HTMLElement | null = null;

			if (mainBanner && titleMainBanner) {
				gsap.timeline({
					scrollTrigger: {
						scrub: 1,
						trigger: mainBanner,
						start: "top 90%",
						end: "bottom 30%",
					},
				});
			}
		}
	})

	onUnmounted(() => {
		gsapAnimation?.revert();
	});

</script>

<template>
	<div :class="[className]">
		<div ref="mainBannerGsap" :class="[className + '__main-banner']">
			<MainBanner 
				:image="imageMain"
				:title="titleMain"
			/>
		</div>
		<div class="l-content-container">
			<div ref="imagesBannersGsap" :class="[className + '__wrapper-image', 'margin-yellow-top', 'margin-red-bottom']">
				<BannerImageText
					v-for="(card, index) in dataCards"
					:key="index"
					:class="[className + '__banner-image', 'margin-yellow-bottom']"
					:title="card.title"
					:desc="card.desc"
					:image="card.image"
					:mod="card.mod ?? ''"
				/>
			</div>
		</div>
	</div>
</template>
