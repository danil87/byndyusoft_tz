export const getWidth = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element)

    return computedStyle.boxSizing === 'border-box'
        ? parseFloat(computedStyle.width) -
              parseFloat(computedStyle.paddingLeft || '0') -
              parseFloat(computedStyle.paddingRight || '0')
        : parseFloat(computedStyle.width)
}
