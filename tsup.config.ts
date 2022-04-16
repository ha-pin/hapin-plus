import { defineConfig } from "tsup"

export const tsup = defineConfig({
	entry: {
		"background": "src/background.ts",
	},
	clean: false,
	outDir: "dist",
	format: ["iife"]
})