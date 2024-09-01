import { Typography, TypographyProps } from '@mui/material'
import {
    Dispatch,
    FC,
    RefObject,
    SetStateAction,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { getWidth } from 'shared/model/get-width'

const invisibleTypographySX = {
    opacity: 0,
}

type Props = {
    value: string
    parentRef: RefObject<HTMLElement>
    onChange: Dispatch<SetStateAction<string>>
} & Omit<TypographyProps, 'onChange'>

export const CustomTypography: FC<Props> = ({ value, parentRef, onChange }) => {
    const [fontSize, setFontSize] = useState(50)
    const invisibleTypographyRef = useRef<HTMLParagraphElement>(null)
    const invisibleTypographyLargeRef = useRef<HTMLParagraphElement>(null)
    const invisibleTypographySmallRef = useRef<HTMLParagraphElement>(null)

    const changeFontSize = () => {
        if (
            invisibleTypographyRef.current!.clientWidth * value.length >
            getWidth(parentRef.current!)
        ) {
            if (
                fontSize > 25 &&
                invisibleTypographySmallRef.current!.clientWidth! *
                    value.length <
                    getWidth(parentRef.current!)
            ) {
                setFontSize(prev => prev - 5)
                return
            }

            onChange(prev => prev.slice(0, prev.length - 1))
            return
        }

        if (
            invisibleTypographyRef.current!.clientWidth * value.length <
            getWidth(parentRef.current!)
        ) {
            if (
                fontSize < 50 &&
                invisibleTypographyLargeRef.current!.clientWidth *
                    (value.length + 5) <
                    getWidth(parentRef.current!)
            ) {
                setFontSize(prev => prev + 5)
            }
        }
    }

    useLayoutEffect(() => {
        if (!value) {
            setFontSize(50)
            return
        }

        if (
            !invisibleTypographyRef.current?.clientWidth ||
            !invisibleTypographyLargeRef.current?.clientWidth ||
            !invisibleTypographySmallRef.current?.clientWidth ||
            !parentRef.current!
        ) {
            return
        }

        changeFontSize()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <>
            <Typography
                data-testid='paragraph-value'
                fontSize={fontSize}
                fontWeight={500}
                alignSelf='flex-end'
                textOverflow='ellipsis'
                overflow='hidden'
                display='-webkit-box'
                maxWidth='100%'
            >
                {value || '\0'}
            </Typography>
            <Typography
                fontSize={fontSize - 5}
                ref={invisibleTypographySmallRef}
                position='absolute'
                sx={invisibleTypographySX}
            >
                1
            </Typography>
            <Typography
                fontSize={fontSize}
                ref={invisibleTypographyRef}
                position='absolute'
                sx={invisibleTypographySX}
            >
                1
            </Typography>
            <Typography
                fontSize={fontSize + 5}
                ref={invisibleTypographyLargeRef}
                position='absolute'
                sx={invisibleTypographySX}
            >
                1
            </Typography>
        </>
    )
}
