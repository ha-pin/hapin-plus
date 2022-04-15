import { defineConfig } from "tsup"

export const tsup = defineConfig({
	entry: {
		"backend": "src/backend.ts",
	},
	clean: false,
	outDir: "dist",
	format: ["iife"]
})