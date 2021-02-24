import defaultSchema from '../constants/schema'

export function createLink(text, href, newTab = false) {
    const a = document.createElement('a')
    a.href = href
    a.text = text
    a.target = newTab ? '_blank' : 'page'
    return a
}

export function getSchema(key = '') {
    if (!key) {
        key = window.location.pathname.replace(/\/$/, '')
    }
    let data = localStorage.getItem(key)
    if (!data) {
        setSchema(getDefaultSchema(key), key)
        return getSchema()
    }
    return JSON.parse(data)
}

export function getDefaultSchema(key) {
    const _key = key.slice(key.lastIndexOf('/') + 1)
    return defaultSchema[_key] || {}
}

export function setSchema(data, key = '') {
    if (!key) {
        key = window.location.pathname.replace(/\/$/, '')
    }
    localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 简单防抖
 */
export function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        fn = fn.bind(this, ...arguments)
        timer = setTimeout(fn, delay)
    }
}