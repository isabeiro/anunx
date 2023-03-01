import {
  Card as CardMUI,
  CardActions,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  cardMedia: {
    paddingTop: '56%',
  },
  cardContent: {
    height: '150px'
  },
}))

const Card = ({ image, title, subtitle, actions}) => {
  const classes = useStyles()
  
  return (
    <CardMUI>
      <CardMedia
        className={classes.cardMedia}
        image={image}
        title={title}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="h2" variant="h5">
          {title}
        </Typography>
        <br></br>
        <Typography>
          {subtitle}
        </Typography>
      </CardContent>
      {
        actions
        ? (
          <CardActions>
            {actions}
          </CardActions>
        ) : null
      }
    </CardMUI>
  )
}

export default Card