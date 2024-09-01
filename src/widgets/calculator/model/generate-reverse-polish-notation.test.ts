import { generateReversePolishNotation } from './generate-reverse-polish-notation'

describe('Generate reverse Polish notation', () => {
    it('Correct data', () => {
        let expression = '5+5*2'

        expect(generateReversePolishNotation(expression)).toEqual([
            '5',
            '5',
            '2',
            '*',
            '+',
        ])

        expression = '10-√(10-6*7)'

        expect(generateReversePolishNotation(expression)).toEqual([
            '10',
            '10',
            '6',
            '7',
            '*',
            '-',
            '√',
            '-',
        ])

        expression = '(√(25+5*3)-40/5)*(50/2+100%)-√144+7*(3+15/3)'

        expect(generateReversePolishNotation(expression)).toEqual(
            '25 5 3 * + √ 40 5 / - 50 2 / 100 % + * 144 √ - 7 3 15 3 / + * +'.split(
                ' '
            )
        )
    })

    it('Incorrect data', () => {
        let expression = '5+5*2)'

        expect(generateReversePolishNotation(expression)).toBeNaN()

        expression = '(10-√(10-6*7)'

        expect(generateReversePolishNotation(expression)).toBeNaN()

        expression = '((((((√(25)))))+5*3)))))-40/5)*(100%50/2)-√144+7*(3+15/3)'

        expect(generateReversePolishNotation(expression)).toBeNaN()
    })
})
