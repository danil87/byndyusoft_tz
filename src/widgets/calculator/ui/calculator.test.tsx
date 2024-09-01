import { fireEvent, render, screen } from '@testing-library/react'

import { Calculator } from './calculator'

describe('Calculator tests', () => {
    it('Key down test', () => {
        render(<Calculator />)

        const typography = screen.getByTestId('paragraph-value')

        let expression = '5+5*2'

        for (const char of expression) {
            fireEvent.keyDown(typography, { key: char })
        }

        expect(screen.getByText(expression)).toBeInTheDocument()

        fireEvent.keyDown(typography, { key: 'Escape' })

        expression = '10-√(10+2*3)'

        for (const char of expression) {
            fireEvent.keyDown(typography, { key: char })
        }

        expect(screen.getByText(expression)).toBeInTheDocument()

        fireEvent.keyDown(typography, { key: 'Escape' })

        expression = 'aiguuifhwseuifhseuihf5%awdjnkjdfgb100/+-'

        for (const char of expression) {
            fireEvent.keyDown(typography, { key: char })
        }

        expect(screen.getByText('5%100-')).toBeInTheDocument()
    })

    it('Button click test', () => {
        render(<Calculator />)

        let expression = '5+5*2'

        for (const char of expression) {
            const button = screen.getByText(char)
            fireEvent.click(button)
        }

        expect(screen.getByText(expression)).toBeInTheDocument()

        fireEvent.click(screen.getByText('C'))

        expression = '20-√36'

        for (const char of expression) {
            const button = screen.getByText(char)
            fireEvent.click(button)
        }

        expect(screen.getByText(expression)).toBeInTheDocument()

        fireEvent.click(screen.getByText('C'))

        expression = '5%200/+-'

        for (const char of expression) {
            const button = screen.getByText(char)
            fireEvent.click(button)
        }

        expect(screen.getByText('5%200-')).toBeInTheDocument()
    })

    it('Calculating key down test', () => {
        render(<Calculator />)

        const typography = screen.getByTestId('paragraph-value')

        let expression = '5+5*2'

        for (const char of expression) {
            fireEvent.keyDown(typography, { key: char })
        }

        fireEvent.keyDown(typography, { key: 'Enter' })

        expect(screen.getByText('15')).toBeInTheDocument()
        expect(screen.getByText(expression)).toBeInTheDocument()

        fireEvent.keyDown(typography, { key: 'Escape' })
        expression = '10+√(10+2*3)'

        for (const char of expression) {
            fireEvent.keyDown(typography, { key: char })
        }

        fireEvent.keyDown(typography, { key: 'Enter' })

        expect(screen.getByText('14')).toBeInTheDocument()
        expect(screen.getByText(expression)).toBeInTheDocument()

        fireEvent.keyDown(typography, { key: 'Escape' })
        expression = 'aiguuifhwseui100/+-fhseuihf5%awdjnkjdfgb'

        for (const char of expression) {
            fireEvent.keyDown(typography, { key: char })
        }

        fireEvent.keyDown(typography, { key: 'Enter' })

        expect(screen.getByText('95')).toBeInTheDocument()
        expect(screen.getByText('100-5%')).toBeInTheDocument()

        fireEvent.keyDown(typography, { key: 'Escape' })
        expression = 'aiguuifhwseuifhseuihf5%awdjnkjdfgb'

        for (const char of expression) {
            fireEvent.keyDown(typography, { key: char })
        }

        fireEvent.keyDown(typography, { key: 'Enter' })

        expect(screen.getByText('NaN')).toBeInTheDocument()
        expect(screen.getByText('5%')).toBeInTheDocument()
    })

    it('Calculating button click test', () => {
        render(<Calculator />)

        let expression = '5+5*2'

        for (const char of expression) {
            const button = screen.getByText(char)
            fireEvent.click(button)
        }

        fireEvent.click(screen.getByText('='))
        expect(screen.getByText('15')).toBeInTheDocument()
        expect(screen.getByText(expression)).toBeInTheDocument()

        fireEvent.click(screen.getByText('C'))
        expression = '20-√36'

        for (const char of expression) {
            const button = screen.getByText(char)
            fireEvent.click(button)
        }

        fireEvent.click(screen.getByText('='))
        expect(screen.getByText('14')).toBeInTheDocument()
        expect(screen.getByText(expression)).toBeInTheDocument()

        fireEvent.click(screen.getByText('C'))

        expression = '200-5%'

        for (const char of expression) {
            const button = screen.getByText(char)
            fireEvent.click(button)
        }

        fireEvent.click(screen.getByText('='))
        expect(screen.getByText('190')).toBeInTheDocument()
        expect(screen.getByText(expression)).toBeInTheDocument()
    })
})
