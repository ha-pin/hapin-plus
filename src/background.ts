chrome.runtime.onInstalled.addListener(() => {
	// 注册右击菜单插件
	const parent = chrome.contextMenus.create({
		id: 'hapin-plus',
		title: 'Hapin+',
	})

	const transformCyrillicToArabic = chrome.contextMenus.create({
		id: "hapin-plus-c2a",
		title: "西里尔字母转化为老文字",
		parentId: parent,
	})

	chrome.contextMenus.onClicked.addListener((info, tab) => {
		// 触发脚本执行
		const { menuItemId } = info
		const { id } = tab

		chrome.tabs.sendMessage(id, { action: menuItemId }, (response) => {
			console.log(response)
		})
	})
})