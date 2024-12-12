import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

let tsrules = {};

tseslint.configs.strictTypeChecked.map((config) => {
	tsrules = {
		...tsrules,
		...config.rules,
	};
});

tseslint.configs.stylisticTypeChecked.map((config) => {
	tsrules = {
		...tsrules,
		...config.rules,
	};
});

export default [
	...pluginVue.configs["flat/recommended"].map((config) => ({
		...config,
		languageOptions: {
			...config.languageOptions,
			parserOptions: {
				parser: {
					ts: "@typescript-eslint/parser",
					js: "@typescript-eslint/parser",
					"<template>": "espree",
				},
				project: "./tsconfig.json",
				extraFileExtensions: [".vue"],
			},
		},
		files: ["**/*.vue"],
		plugins: {
			...config.plugins,
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			...config.rules,
			...tsrules,
			"vue/multi-word-component-names": "off",
			"vue/html-indent": ["warn", "tab"],
		},
	})),
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			...tsrules,
			"@typescript-eslint/no-extraneous-class": "off",
		},
	},
	{
		ignores: [
			"nuxt.config.ts",
			".*/**/*",
			".output/"
		]
	}
];
