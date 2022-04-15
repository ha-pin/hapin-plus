import fs from "fs"
import path from "path"

const __dirname = path.resolve()

function deepCopy(dir, target) {
    const dirs = fs.readdirSync(dir)
	if (dirs.length === 0) {
		return
	}

	dirs.forEach(item => {
		const itemPath = path.join(dir, item)
		const stat = fs.statSync(itemPath)
		if (stat.isDirectory()) {
			deepCopy(itemPath, target)
		} else {
			const targetPath = path.join(target, item)
			fs.copyFileSync(itemPath, targetPath)
		}
	})
}

export { deepCopy }
