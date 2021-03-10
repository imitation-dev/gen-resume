import {
  getPageKey, getSchema, highLightDom, traverseDomTreeMatchStr,
} from '../../utils'
import { scrollIntoView, toggleControlPanel } from './public'
import editor from './schemaEditor'

function registerIframePageLoad() {
  document.getElementById('page').onload = (e) => {
    // show control panel
    toggleControlPanel(false)
    // 初始化json编辑器内容
    editor.set(getSchema(getPageKey()))

    // 获取点击到的内容
    e.path[0].contentDocument.body.addEventListener('click', (e) => {
      const $target = e.target
      const clickText = $target.textContent.trim()
      const matchDoms = traverseDomTreeMatchStr(
        document.getElementById('page').contentDocument.body,
        clickText,
      )
      const mathIndex = matchDoms.findIndex((v) => v === $target)
      if ($target.tagName.toLowerCase() === 'a' && !$target.dataset.open) {
        e.preventDefault()
      }

      if (editor.mode === 'code') {
        editor.changeEditorMode('tree')
      }
      if (mathIndex < 0) {
        return
      }
      // 解除上次点击的
      // TODO: 优化
      const $textarea = document.getElementById('domContext')
      highLightDom($textarea.clickDom, 0)
      // 高亮这次的10s
      highLightDom($target, 10000)
      // 更新editor中的search内容
      editor.search(clickText)
      // editor.searchBox.dom.search.value = clickText
      // editor.searchBox.dom.search.dispatchEvent(new Event('change'))

      // 更新到textarea中的内容
      $textarea.value = clickText
      // 聚焦
      if (document.getElementById('focus').checked) {
        $textarea.focus()
        setTimeout(scrollIntoView, 0, $target)
      }
      // 记录点击的dom
      $textarea.clickDom = e.target
      let i = -1
      for (const r of editor.searchResults) {
        if (r.node.value === clickText) {
          i += 1
          // 匹配到json中的节点
          if (i === mathIndex) {
            // 高亮一下$textarea
            $textarea.style.boxShadow = '0 0 1rem yellow'
            setTimeout(() => {
              $textarea.style.boxShadow = ''
            }, 200)
            // 触发editor onEvent事件-用于捕获path
            editor.activeResult.node.dom.value.click()
            return
          }
        }
        editor.nextActive()
      }
    })

    storageActivePagePath()
  }
}

function storageActivePagePath() {
  localStorage.setItem('lastActivePage', getPageKey())
}

export default registerIframePageLoad