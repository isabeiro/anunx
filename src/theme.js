import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#009FB7',
    },
    secondary: {
      main: '#272727',
    },
    background: {
     default: 'rgb(242, 244, 245)',
     white: '#EFF1F3' 
    }
  }
})

export default theme