import { Box, Divider, Typography } from '@mui/material'
import { Buttons } from 'entities/calculator'
import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { CustomTypography } from 'shared/ui/custom-typography'

import { generateAnswer } from '../model/generate-answer'
import { generateReversePolishNotation } from '../model/generate-reverse-polish-notation'

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
const skipSliceCharacters = ['(', '%', '√']

const calculatorBoxSX = {
    background: 'linear-gradient(to right bottom, #295290, #3976cf)',
    boxSizing: 'border-box',
    boxShadow: 3,
    width: { sm: '95%', xs: '100%' },
    height: { sm: '92%', xs: '100%' },
    padding: { sm: '50px', xs: '20px' },
}

export const Calculator: FC = () => {
    const [expression, setExpression] = useState('')
    const [previousExpression, setPreviousExpression] = useState('')
    const boxRef = useRef<HTMLDivElement>(null)

    const solutionExpression = (expression: string) => {
        if (expression === 'NaN') {
            return
        }

        const reversePolishNotation = generateReversePolishNotation(
            expression.replace(/,/g, '.')
        )

        if (!Array.isArray(reversePolishNotation)) {
            setExpression('NaN')
            return
        }

        const answer = generateAnswer(reversePolishNotation)

        setPreviousExpression(expression)
        return answer || 'NaN'
    }

    const changeExpression = (value: string) => {
        setExpression(prev => {
            if (prev === 'NaN') {
                return ''
            }

            if (value === '=') {
                return solutionExpression(prev) || 'NaN'
            }

            if (value === 'C') {
                setPreviousExpression('')
                return ''
            }

            const lastChar = prev[prev.length - 1]

            if (
                !skipSliceCharacters.includes(value) &&
                lastChar !== ')' &&
                isNaN(Number(value)) &&
                isNaN(Number(lastChar))
            ) {
                return isNaN(Number(prev[prev.length - 2]))
                    ? prev.slice(0, prev.length - 2) + value
                    : prev.slice(0, prev.length - 1) + value
            }

            if ((value === '(' || value === '√') && !isNaN(Number(lastChar))) {
                return `${prev}*${value}`
            }

            return prev + value
        })
    }

    const onClickButton = useCallback((event: MouseEvent, value: string) => {
        event.preventDefault()
        changeExpression(value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            event.preventDefault()

            if (event.key === 'Backspace') {
                if (expression === 'NaN') {
                    setExpression('')
                    return
                }

                if (!expression) {
                    setPreviousExpression('')
                }

                setExpression(prev => prev.slice(0, prev.length - 1))
                return
            }

            if (event.key === 'Escape') {
                setExpression('')
                setPreviousExpression('')
                return
            }

            if (event.key === 'Enter') {
                setExpression(solutionExpression(expression) || 'NaN')
                return
            }

            if (
                characters.includes(event.key) ||
                ['(', ')'].includes(event.key)
            ) {
                changeExpression(event.key)
            }
        }

        const onKeyUp = (event: KeyboardEvent) => event.preventDefault()

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expression])

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='flex-end'
            borderRadius={10}
            width={560}
            ref={boxRef}
            sx={calculatorBoxSX}
        >
            <Typography
                fontSize={30}
                alignSelf='flex-end'
                textOverflow='ellipsis'
                overflow='hidden'
                display='-webkit-box'
                maxWidth='100%'
                marginBottom='20px'
            >
                {previousExpression}
            </Typography>
            <CustomTypography
                value={expression}
                onChange={setExpression}
                parentRef={boxRef}
            />
            <Divider color='#fff' />
            <Buttons onClick={onClickButton} characters={characters} />
        </Box>
    )
}
