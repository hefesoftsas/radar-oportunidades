import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createPortal,flushSync} from 'react-dom';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SvgIcon from '@mui/material/SvgIcon';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {renderReport,extractHighlights} from './report.js';
import {deriveProgress} from './progress.js';
window.RadarReport = {render: renderReport, highlights: extractHighlights};
window.RadarProgress = {derive: deriveProgress};
const theme=createTheme({palette:{primary:{main:'#2968c8'}},shape:{borderRadius:8},typography:{fontFamily:'system-ui, -apple-system, sans-serif',button:{fontWeight:650,textTransform:'none'}}});
const controls=[
  {slot:'slot-stepBack',id:'stepBack',label:'Atrás',className:'secondary-button',variant:'outlined',hidden:true},
  {slot:'slot-stepNext',id:'stepNext',label:'Continuar',className:'primary-button',variant:'contained'},
  {slot:'slot-startTask',id:'startTask',label:'Iniciar búsqueda',className:'primary-button',variant:'contained',type:'submit',hidden:true},
  {slot:'slot-browserClose',id:'browserClose',label:'Terminé de conectar',className:'secondary-button',variant:'outlined'}
];
const portals=controls.map(({slot,label,...props})=>createPortal(<Button {...props} size="large" disableElevation>{label}</Button>,document.getElementById(slot),slot));
flushSync(()=>createRoot(document.getElementById('mui-root')).render(<ThemeProvider theme={theme}>{portals}</ThemeProvider>));
const paths={search:'M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 14 15.5l.27.28v.79l5 4.99L20.49 20zm-5 0A4.5 4.5 0 1 1 15 9.5a4.5 4.5 0 0 1-4.5 4.5',mercado:'M4 4h16v3H4zm1 4h14l1 4v2h-1v7h-5v-5h-4v5H5v-7H4v-2zm2 5v6h1v-5h8v5h1v-6z',history:'M13 3a9 9 0 0 0-9 9H1l3.9 3.9.1.2L9 12H6a7 7 0 1 1 2.05 4.95l-1.42 1.42A9 9 0 1 0 13 3zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z',facebook:'M13.5 22v-9h3l.5-3h-3.5V8c0-.9.3-1.5 1.6-1.5H17V3.8c-.4-.1-1.3-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v9z'};
function Navigation(){const [value,setValue]=useState('search');return <BottomNavigation showLabels value={value} onChange={(_e,next)=>{setValue(next);window.dispatchEvent(new CustomEvent('radar:navigate',{detail:next}));}} aria-label="Navegación principal"><BottomNavigationAction label="Buscar" value="search" icon={<SvgIcon><path d={paths.search}/></SvgIcon>}/><BottomNavigationAction label="Historial" value="history" icon={<SvgIcon><path d={paths.history}/></SvgIcon>}/><BottomNavigationAction label="Facebook" value="facebook" icon={<SvgIcon><path d={paths.facebook}/></SvgIcon>}/><BottomNavigationAction label="Mercado" aria-label="Mercado Libre" value="mercadolibre" icon={<SvgIcon><path d={paths.mercado}/></SvgIcon>}/></BottomNavigation>}
flushSync(()=>createRoot(document.getElementById('mobileNav')).render(<ThemeProvider theme={theme}><Navigation/></ThemeProvider>));
