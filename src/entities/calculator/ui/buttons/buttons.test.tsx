import { fireEvent, render, screen } from '@testing-library/react'

import { Buttons } from './buttons'

const characters = [
    'C',
    '√',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '00',
    '0',
    ',',
    '=',
]

const onClick = jest.fn()

describe('Buttons tests', () => {
    beforeEach(() => {
        jest.resetAllMocks()

        render(<Buttons onClick={onClick} characters={characters} />)
    })

    it('Render buttons', () => {
        expect(screen.getAllByTestId(/calculator-buttons/)).toHaveLength(
            characters.length
        )
        expect(onClick).toHaveBeenCalledTimes(0)
    })

    it('Click button test', () => {
        const expression = '2+2*2/3-10'

        for (const char of expression) {
            fireEvent.click(screen.getByText(char))
        }

        expect(onClick).toHaveBeenCalledTimes(expression.length)
    })
})
