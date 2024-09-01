export const generateAnswer = (reversePolishNotation: string[]) => {
    const stack: number[] = []

    for (const char of reversePolishNotation) {
        if (!isNaN(Number(char))) {
            stack.push(Number(char))
            continue
        }

        const secondNum = stack.pop()!

        if (char === '√') {
            stack.push(Math.sqrt(secondNum))
            continue
        }

        const firstNum = stack.pop()!

        if (char === '+') {
            stack.push(firstNum + secondNum)
            continue
        }

        if (char === '-') {
            stack.push(firstNum - secondNum)
            continue
        }

        if (char === '*') {
            stack.push(firstNum * secondNum)
            continue
        }

        if (char === '/') {
            stack.push(firstNum / secondNum)
            continue
        }

        if (char === '%') {
            stack.push(firstNum)
            stack.push((firstNum * secondNum) / 100)
            continue
        }
    }

    return stack.pop()?.toString().replace(/\./g, ',')
}
