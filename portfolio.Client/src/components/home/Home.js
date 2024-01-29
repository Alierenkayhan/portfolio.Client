import Style from './../../Css/Home.module.scss';
import classNames from 'classnames';
import EmojiBullet from "./EmojiBullet";
import SocialIcon from "./SocialIcon";
import { Box } from "@mui/material";
import { info } from '../../info/Info';
import React, { useState, useEffect } from 'react';
import api from "./../../Service/GlobalApi";

export default function Home()
{
   const [about, setAboutData] = useState(null);
   const [loading, setLoading] = useState(true);
   useEffect(() =>
   {
      const fetchData = async () =>
      {
         try
         {
            const aboutData = await api.fetchDataFromServerAbout();
            const miniBioData = await api.fetchDataFromServerMiniBio();
            const socialsData = await api.fetchDataFromServerSocials();

            const transformedData = {
               firstName: aboutData[0].firstName,
               lastName: aboutData[0].lastName,
               position: aboutData[0].position,
               selfPortrait: aboutData[0].selfPortrait,
               bio: aboutData[0].bio,
               miniBio: miniBioData,
               socials: socialsData
            };

            setAboutData(transformedData);
         } catch (error)
         {
            console.error("Error fetching data:", error);
         } finally
         {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   if (loading || !about)
   {
      return (
         <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'100vh'}
            fontSize={'2rem'}
         >
            <div className={Style.loadingAnimation}>
               <span role="img" aria-label="loading">
                  ⌛️
               </span>
               Loading...
            </div>
         </Box>
      );
   }
   return (
      <Box component={'main'} display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'}
         justifyContent={'center'} minHeight={'calc(100vh - 175px)'}>
         <Box className={classNames(Style.avatar, Style.shadowed)} alt={'image of developer'} style={{ background: info.gradient }} component={'img'} src={about.selfPortrait} width={{ xs: '35vh', md: '40vh' }}
            height={{ xs: '35vh', md: '40vh' }}
            borderRadius={'50%'} p={'0.75rem'} mb={{ xs: '1rem', sm: 0 }} mr={{ xs: 0, md: '2rem' }} />
         <Box>
            <h1>Hi, I'm <span style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{about.firstName}</span><span className={Style.hand}>🤚</span>
            </h1>
            <h2>I'm {about.position}.</h2>
            <Box component={'ul'} p={'0.8rem'}>
               {about.miniBio.map((bio, index) => (
                  <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} />
               ))}
            </Box>
            <Box display={'flex'} gap={'1.5rem'} justifyContent={'center'} fontSize={{ xs: '2rem', md: '2.5rem' }}>
               {about.socials.map((social, index) => (
                  <SocialIcon key={index} link={social.link} icon={social.icon} label={social.label} />
               ))}
            </Box>
         </Box>
      </Box>
   )
}