import React, { useEffect, useState } from 'react';
import Style from './../Css/BaseLayout.module.scss';
import Navbar from "./Navbar";
import Home from "./home/Home";
import About from "./about/About";
import Portfolio from "./portfolio/Portfolio";
import Blog from "./blog/blog";
import Error404 from "./Shared/404";
import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { useLocation } from 'react-router-dom';

export default function BaseLayout()
{
   const [darkMode, setDarkMode] = useState(false);
   const currentYear = new Date().getFullYear(); // Otomatik olarak yıl alınır.
   const location = useLocation();

   function handleToggleDarkMode()
   {
      let oppositeOfCurrentDarkMode = !darkMode;
      localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`);
      setDarkMode(oppositeOfCurrentDarkMode);
   }

   useEffect(() =>
   {
      const storedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
      setDarkMode(storedDarkMode);

      const script = document.createElement('script');
      script.text = `
      (function (d, t) {
        var BASE_URL = "https://app.chatwoot.com";
        var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
        g.src = BASE_URL + "/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);
        g.onload = function () {
          window.chatwootSDK.run({
            websiteToken: "${process.env.REACT_APP_CHATWOOT}",
            baseUrl: BASE_URL
          });
        };
      })(document, "script");
    `;
      document.head.appendChild(script);
   }, []);

   return (
      <Box className={darkMode ? Style.dark : Style.light}>
         <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'} justifyContent={'space-between'}>
            {location.pathname !== '/login' && (
               <Grid item>
                  <Navbar darkMode={darkMode} handleClick={handleToggleDarkMode} />
               </Grid>
            )}
            <Grid item flexGrow={1}>
               <Routes>
                  <Route exact path={'/'} element={<Home />} />
                  <Route exact path={'/about'} element={<About />} />
                  <Route exact path={'/portfolio'} element={<Portfolio />} />
                  <Route exact path={'/blog'} element={<Blog />} />
                  <Route path={'*'} element={<Error404 />} />
               </Routes>
            </Grid>
            <Grid item>
               <Box component={'footer'} display={'flex'} flexDirection={'column'} alignItems={'center'} py={'1.5rem'} sx={{ opacity: 0.7 }} width={'100%'}>
                  <p>Ali Eren Kayhan</p>
                  <p>&copy; {currentYear}</p>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
}
