import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems, SecondaryListItems } from '../data/listItems';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react"
import axios from 'axios';
import Copyright from './shared/Copyright';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [isManager, setIsManager] = React.useState(false);
  const [userName, setUserName] = useState("")
  const [fullName, setFullName] = useState("")
  const [color, setColor] = useState("primary")
  const navigate = useNavigate();
  const cookies = new Cookies();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    cookies.remove('jwt_authorization', { path: '/' });
    navigate("/");
  }

  useEffect(()=> {
    const username = cookies.get('jwt_authorization').sub
    const accToken = cookies.get('acc_token')

    const config = {
        headers: { Authorization: `Bearer ${accToken}`}
    };

    axios.get(`http://localhost:8080/employee/${username}`, config)
    .then(res => {
        setUserName(res.data.data.userName)
        setFullName(res.data.data.fullName)
        setIsManager(res.data.data.isManager === 1 ? true : false)
    })
    .catch(error => {
        console.log(error)
    })
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color={isManager? "primary" : "secondary"}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            {isManager && <SecondaryListItems />}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                <h1>Welcome, {fullName}</h1>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  Logged in as: {userName}
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <p>Lorem ipsum dolor sit amet, in his quando cetero deleniti. Eu enim paulo imperdiet pro. Ea propriae theophrastus eos. Probo eloquentiam vel et.

Sit saepe officiis id. Movet intellegam eu vix, mel eu erant graece complectitur. Facete graecis delicatissimi sit no, cu patrioque contentiones vim, unum vituperata sea in. No dicit adipisci vim, maiorum convenire vis in, porro dicunt salutandi et mel. Vim ne quot ullum laoreet. His audiam omittantur ut.

Quem natum his no, altera aeterno salutatus no nam, sed et quaeque voluptaria dissentias. Ad homero equidem perpetua eum, eos cu fugit euripidis dissentiet. Qui altera gloriatur repudiandae ne, et illum delenit assueverit sit. Eam ei eirmod gubergren evertitur, primis percipitur concludaturque ea mel, an libris persecuti eum. Pri cu porro inimicus prodesset, no regione suscipit cum.

Sonet bonorum molestie et pro, eos efficiendi constituam an. Ad vim diam persius, error legendos per cu. Tation evertitur his at, nec ubique adversarium et, sea errem tation accommodare an. Nam alia verterem at. Repudiare persecuti mel te.

Consul fuisset ea qui, at quo suscipit ponderum, eu option platonem sed. Graeco cotidieque et cum, sed recteque tincidunt ei. Ea vel facer partem constituto, est eripuit scribentur definitiones an. Voluptatibus concludaturque mea an. Ad pri utamur vidisse, explicari scripserit ad est. Mei in populo tacimates inimicus.</p>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}