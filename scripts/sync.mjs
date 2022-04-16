import chokidar from "chokidar"
import { deepCopy } from "./copy.mjs"
import path from "path"

const __dirname = path.resolve()

chokidar
    .watch("./public", {
        persistent: true,
    })
    .on("all", () => {
        deepCopy(path.join(__dirname, "public"), path.join(__dirname, "dist"))
    })
