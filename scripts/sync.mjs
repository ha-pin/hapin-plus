import chokidar from "chokidar"
import { deepCopy } from "./copy.mjs"
import path from "path"
import { existsSync, mkdir } from "fs"

const __dirname = path.resolve()

if (!existsSync(path.join(__dirname, "dist"))) {
    mkdir(path.join(__dirname, "dist"))
}

chokidar
    .watch("./public", {
        persistent: true,
    })
    .on("all", () => {
        deepCopy(path.join(__dirname, "public"), path.join(__dirname, "dist"))
    })
