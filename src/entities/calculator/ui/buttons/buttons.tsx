import { Button, Grid2 } from '@mui/material'
import { FC, memo, MouseEvent } from 'react'

type Props = {
    onClick: (event: MouseEvent, value: string) => void
    characters: string[]
}

const buttonSX = { width: '100%', margin: '0 auto', fontWeight: 400 }

export const Buttons: FC<Props> = memo(({ onClick, characters }) => {
    const onButtonClick = (event: MouseEvent) => {
        const button = event.target as HTMLElement

        onClick(event, button.textContent || '')
    }

    return (
        <Grid2 container columns={4} onClick={onButtonClick}>
            {characters.map(char => (
                <Grid2 key={char} size={1}>
                    <Button
                        data-testid={`calculator-buttons-${char}`}
                        sx={buttonSX}
                    >
                        {char}
                    </Button>
                </Grid2>
            ))}
        </Grid2>
    )
})
