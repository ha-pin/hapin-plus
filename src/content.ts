import { transformCyrillicToArabic, transformCyrillicToHapin } from "hapin-utils"
import { fromDomNodeToVNode } from "million/ssr"
import { render, VElement, VNode } from "million"

function VNodeModifier(vnode: VNode, fn: (text: string) => string) {
	let tmp = vnode as VElement

	if (!!(<VElement>vnode)?.props?.placeholder) {
		tmp.props.placeholder = fn((<VElement>vnode).props.placeholder)
	}

	if ((<VElement>vnode).children.length === 0) {
		return vnode
	}

	tmp.children = (<VElement>vnode).children.map((item) => {
		if (typeof item === "string") {
			const EmailRegExp = /([a-zA-Z0-9\.\_\-]+)\@([a-zA-Z0-9]+)\.([a-z]+)/

			if (EmailRegExp.test(item)) {
				return item
			}

			return fn(item)
		}

		if (!!(<VElement>item)?.props?.placeholder) {
			item.props.placeholder = fn((<VElement>item).props.placeholder)
		}

		if ((<VElement>item).children.length === 0) {
			return item
		}

		return VNodeModifier(item, fn)
	})

	return tmp
}

function tranformTitle(fn: (text: string) => string) {
	const title = document.getElementsByTagName("title")[0]
	if (!!title?.innerText) {
		title.innerText = fn(title.innerText)
	}
}

// TODO 处理 script 报错
// TODO 处理页面加载不完全报错
function tranformer(action: string, fn: (text: string) => string) {
	const raw = fromDomNodeToVNode(document.body)
	const after = VNodeModifier(raw, fn)
	tranformTitle(fn)
	render(document.body, after, raw)

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