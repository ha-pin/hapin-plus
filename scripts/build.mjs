import path from "path"
import fs from "fs"
import { deepCopy } from "./copy.mjs"
import { exec } from "child_process"

const __dirname = path.resolve()

function checkDist() {
    if (!fs.existsSync(path.join(__dirname, "dist"))) {
        return false
    }

	return true
}

function copyPublic() {
	if (!checkDist()) {
		throw new Error("请先构建脚本文件, 没找到 dist 文件夹")
	}

	const pb = path.join(__dirname, "public")
	const dist = path.join(__dirname, "dist")

	deepCopy(pb, dist)
}

function buildDist() {
	exec("tsup", (err, stdout, stderr) => {
		if (err !== null) {
			throw new Error(err)
		}

		console.log(stdout)
	})
}

function build() {
	buildDist()
	copyPublic()
}

build()