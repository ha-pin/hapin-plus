import { transformCyrillicToArabic, transformCyrillicToHapin } from "hapin-utils"

/**
 * 可见元素筛选器
 * @param item
 * @returns
 */
function filter(item: Element) {
	if (["HTML, LINK, SCRIPT, META, LINK"].includes(item.nodeName)) {
		return false
	}

	if (["TEXTAREA", "INPUT"].includes(item.nodeName)) {
		return true
	}

	const emailRegExp = /([a-zA-Z0-9\.\_\-]+)\@([a-zA-Z0-9]+)\.([a-z]+)/

	// TODO 性能提升，筛选不可见元素
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

function checkChildrenAreAllTextNode(text: string) {
	if (/\n/.test(text)) {
		return false
	}

	return true
}

function tranformer(action: string, fn: (text: string) => string) {
	const doms = getAllTextNodes()
	doms.forEach(item => {
		if (["TEXTAREA", "INPUT"].includes(item.nodeName)) {
			(<HTMLInputElement>item).placeholder = fn((<HTMLInputElement>item).placeholder)
		} else {
			if (checkChildrenAreAllTextNode(item.innerText)) {
				item.innerText = fn(item.innerText)
			} else {
				item.firstChild.textContent = fn(item.firstChild.textContent)
			}
		}
	})

	return action
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const { action } = request
	switch (action) {
		case "hapin-plus-c2a":
			{
				sendResponse(tranformer(action, transformCyrillicToArabic))
				break
			}
		case "hapin-plus-c2h":
			{
				sendResponse(tranformer(action, transformCyrillicToHapin))
				break
			}
		default: {
			sendResponse(null)
			break
		}
	}
})