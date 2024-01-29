import React, { useEffect, useState } from 'react';
import Style from './../Css/BaseLayout.module.scss'
import Navbar from "./Navbar";
import Home from "./home/Home";
import About from "./about/About";
import Portfolio from "./portfolio/Portfolio";
import Blog from "./blog/blog";
import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";

export default function BaseLayout()
{
   let [darkMode, setDarkMode] = useState(false);
   const currentYear = new Date().getFullYear(); // Otomatik olarak yıl alınır.

   function handleToggleDarkMode()
   {
      let oppositeOfCurrentDarkMode = !darkMode
      localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`)
      setDarkMode(oppositeOfCurrentDarkMode)
   }

   useEffect(() =>
   {
      let detectedDarkMode = eval(localStorage.getItem('darkMode'));

      if (detectedDarkMode)
      {
         setDarkMode(detectedDarkMode)
      } else
      {
         localStorage.setItem('darkMode', 'false')
      }
   }, [])

   return (
      <Box className={darkMode ? Style.dark : Style.light}>
         <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'}
            justifyContent={'space-between'}>
            <Grid item>
               <Navbar darkMode={darkMode} handleClick={handleToggleDarkMode} />
            </Grid>
            <Grid item flexGrow={1}>
               <Routes>
                  <Route exact path={'/'} element={<Home />} />
                  <Route exact path={'/about'} element={<About />} />
                  <Route exact path={'/portfolio'} element={<Portfolio />} />
                  <Route exact path={'/blog'} element={<Blog />} />

               </Routes>
            </Grid>
            <Grid item>
               <Box component={'footer'} display={'flex'} flexDirection={'column'} alignItems={'center'}
                  py={'1.5rem'} sx={{ opacity: 0.7 }} width={'100%'}>
                  <p>Ali Eren Kayhan</p>
                  <p>&copy; {currentYear}</p>
               </Box>
            </Grid>
         </Grid>
      </Box >
   )
}
