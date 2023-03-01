
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    padding: theme.spacing(3),
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  inputLabel: {
    fontWeigth: 400,
    color: theme.palette.primary.main,
  },
}))

export default useStyles