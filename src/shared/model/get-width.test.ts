import { getWidth } from './get-width'

describe('Get width tests', () => {
    it('Get width', () => {
        const div = document.createElement('div')

        div.style.width = '100px'
        expect(getWidth(div)).toBe(100)

        div.style.padding = '10px'
        expect(getWidth(div)).toBe(100)

        div.style.boxSizing = 'border-box'
        expect(getWidth(div)).toBe(80)

        const newDiv = document.createElement('div')

        newDiv.style.width = '250px'

        div.appendChild(newDiv)
        expect(getWidth(div)).toBe(80)
    })
})
