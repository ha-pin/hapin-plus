import { defineConfig } from "tsup"

export const tsup = defineConfig({
	entry: {
		"background": "src/background.ts",
		"content": "src/content.ts",
	},
	clean: false,
	outDir: "dist",
	format: ["iife"]
})