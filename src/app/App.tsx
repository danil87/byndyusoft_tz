import './App.css'

import { createTheme, ThemeProvider } from '@mui/material'
import { CalculatorPage } from 'pages/calculator'
import { FC } from 'react'

const theme = createTheme({
    palette: {
        primary: { main: '#fff' },
    },
})

export const App: FC = () => (
    <ThemeProvider theme={theme}>
        <CalculatorPage />
    </ThemeProvider>
)
