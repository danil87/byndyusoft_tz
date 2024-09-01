const priorityOfOperations = {
    '(': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '√': 3,
    '%': 3,
}

type PriorityOfOperationsKey = keyof typeof priorityOfOperations

export const generateReversePolishNotation = (expression: string) => {
    if (!expression) {
        return NaN
    }

    const stack: string[] = []
    const reversePolishNotation: string[] = []
    const expressionArr = [
        '?',
        ...expression.match(/(\d+(\.\d+)?|\+|-|\*|\/|%|√|\(|\))/g)!,
        '?',
    ]
    let currentChar = ''

    for (const char of expressionArr) {
        if (char === '?') {
            if (!stack.length) {
                stack.push(char)
            } else {
                currentChar = stack.pop()!

                while (currentChar !== '?') {
                    if (currentChar === '(') {
                        return NaN
                    }

                    reversePolishNotation.push(currentChar)
                    currentChar = stack.pop()!
                }
            }

            continue
        }

        if (!isNaN(Number(char))) {
            reversePolishNotation.push(char)
            continue
        }

        if (char === '(') {
            stack.push(char)
            continue
        }

        currentChar = stack.pop()!

        if (char === ')') {
            while (currentChar !== '(') {
                if (currentChar === '?') {
                    return NaN
                }

                reversePolishNotation.push(currentChar)
                currentChar = stack.pop()!
            }

            continue
        }

        if (
            !stack.length ||
            priorityOfOperations[char as PriorityOfOperationsKey] >
                priorityOfOperations[currentChar as PriorityOfOperationsKey]
        ) {
            stack.push(currentChar, char)
            continue
        }

        while (
            currentChar !== '?' &&
            priorityOfOperations[char as PriorityOfOperationsKey] <=
                priorityOfOperations[currentChar as PriorityOfOperationsKey]
        ) {
            reversePolishNotation.push(currentChar)
            currentChar = stack.pop()!
        }

        stack.push(currentChar, char)
    }
    return reversePolishNotation
}
