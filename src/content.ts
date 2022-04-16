import { transformCyrillicToArabic } from "hapin-utils"

/**
 * 可见元素筛选器
 * @param item
 * @returns
 */
function filter(item: Element) {
	if (["HTML, LINK, SCRIPT, META, LINK"].includes(item.nodeName)) {
		return false
	}

	const emailRegExp = /([a-zA-Z0-9\.\_\-]+)\@([a-zA-Z0-9]+)\.([a-z]+)/

	// TODO 性能提升，筛选不可见元素
	// TODO placeholder 转化
	// TODO title 转化

	if (item.firstChild?.nodeType === Node.TEXT_NODE) {
		if (emailRegExp.test(item.firstChild?.textContent)) {
			return false
		}
		return true
	}
}

function getAllTextNodes() {
	const doms = [...document.getElementsByTagName("*")].filter(item => filter(item)
	)
	return doms
}

function tranformCyrillic2Arabic() {
	const doms = getAllTextNodes()
	doms.forEach(item => {
		item.firstChild.textContent = transformCyrillicToArabic(item.firstChild.textContent)
	})
	return "hapin-plus-c2a"
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const { action } = request
	switch (action) {
		case "hapin-plus-c2a":
			{
				sendResponse(tranformCyrillic2Arabic())
				break
			}
		default: {
			sendResponse(null)
			break
		}
	}
})