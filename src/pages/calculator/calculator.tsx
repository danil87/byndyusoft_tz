import { Box } from '@mui/material'
import { FC } from 'react'
import { Calculator } from 'widgets/calculator'

const boxPinkSX = {
    backgroundColor: '#faa8a8',
    width: { sm: 605, xs: '100%' },
    height: { sm: '95%', xs: '100%' },
}

export const CalculatorPage: FC = () => (
    <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        borderRadius={10}
        margin='0 auto'
        sx={boxPinkSX}
    >
        <Calculator />
    </Box>
)
