import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '20px',
    textDecoration: 'none !important',
    color: theme.palette.secondary.main,
  },
  headButton: {
    marginRight: '10px'
  },
  userName: {
    marginLeft: 8,
  },
  divider: {
    margin: '8px 0'
  },
  links: {
    textDecoration: 'none !important' ,
    color: theme.palette.primary.main,
  }
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const [anchorUserMenu, setAnchorUserMenu] = useState(false)
  const [ session ] = useSession()

  const openUserMenu = Boolean(anchorUserMenu)

  return (
    <>
      
      <AppBar position="static" elevation={3}>
        <Container maxWidth="lg">
          <Toolbar>
            <Link href={'/'} className={classes.title} passHref>
              Anunx
            </Link>
            <Link href={session ? '/user/publish' : '/auth/signin'} className={classes.links} passHref>
              <Button color="secondary" variant="outlined" className={classes.headButton}>
                Anunciar e Vender
              </Button>
            </Link>
            {
              session
                ? (
                  <IconButton color="secondary" onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                    {
                      session.user.image
                      ? <Avatar src={session.user.image} />
                      : <AccountCircle />
                    }
                    <Typography variant="subtitle2" color="secondary" className={classes.userName}>
                      {session.user.name}
                    </Typography>
                  </IconButton>
                ) : null
            }
            
            
            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Link href="/user/dashboard" color="primary" className={classes.links} passHref >
                <MenuItem>Meus an??ncios</MenuItem>
              </Link>
              <Link href="/user/publish" className={classes.links} passHref>
                <MenuItem>Publicar novo an??ncio</MenuItem>
              </Link>
              <Divider className={classes.divider} />
              <MenuItem onClick={() => signOut({
                callbackUrl: '/'
              })}>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}