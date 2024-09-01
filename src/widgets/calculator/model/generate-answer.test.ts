import { generateAnswer } from './generate-answer'
import { generateReversePolishNotation } from './generate-reverse-polish-notation'

describe('Generate answer tests', () => {
    it('Correct data', () => {
        let expression = '5+5*2'

        let reversePolishNotation = generateReversePolishNotation(expression)

        if (!Array.isArray(reversePolishNotation)) {
            return
        }
        expect(generateAnswer(reversePolishNotation)).toBe('15')

        expression = '10-√(10+2*3)'

        reversePolishNotation = generateReversePolishNotation(expression)

        if (!Array.isArray(reversePolishNotation)) {
            return
        }

        expect(generateAnswer(reversePolishNotation)).toBe('6')

        expression = '(√(35+7*2)*(200/10+50%)-√81+7*(5+9/3))'

        reversePolishNotation = generateReversePolishNotation(expression)

        if (!Array.isArray(reversePolishNotation)) {
            return
        }

        expect(generateAnswer(reversePolishNotation)).toBe('257')
    })

    it('Incorrect data', () => {
        let expression = '5%+5*2'

        let reversePolishNotation = generateReversePolishNotation(expression)

        if (!Array.isArray(reversePolishNotation)) {
            return
        }
        expect(generateAnswer(reversePolishNotation)).toBe('NaN')

        expression = '10%-√(10+2*3)'

        reversePolishNotation = generateReversePolishNotation(expression)

        if (!Array.isArray(reversePolishNotation)) {
            return
        }

        expect(generateAnswer(reversePolishNotation)).toBe('NaN')

        expression = '(√(35%+7*2)*(200/10+50%)-√81+7*(5+9/3))'

        reversePolishNotation = generateReversePolishNotation(expression)

        if (!Array.isArray(reversePolishNotation)) {
            return
        }

        expect(generateAnswer(reversePolishNotation)).toBe('NaN')
    })
})
