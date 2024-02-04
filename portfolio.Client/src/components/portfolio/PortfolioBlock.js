import React from 'react';
import IconLink from "./../Shared/IconLink";
import { Box, Chip } from "@mui/material";

function PortfolioBlock(props)
{
   const { image, source, title, tags } = props;
   return (
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
         <Box component={'img'} src={image} />
         <h1 style={{ fontSize: '1.5rem' }}>{title}</h1>
         <Box className={'portfolio'} display={'flex'} flexDirection={'column'} gap={'0.5rem'}
            alignItems={'center'} fontSize={'1.5rem'} py={'2rem'}>
            <Box className={'portfolio'} display={'flex'} flexDirection={'column'} gap={'0.5rem'} alignItems={'center'} fontSize={'1.5rem'}
               py={'1srem'}>
               <Box p={1} border={'2px solid black'} borderRadius={'25px'}>
                  <IconLink link={source} title={'Source Code'} icon={'fa fa-code'} />
               </Box>
               {tags && (
                  <Box display="flex" gap={1} mt={2}>
                     <Chip label={tags} color="primary" variant="outlined" />
                  </Box>
               )}
            </Box>
         </Box>
      </Box>
   );
}

export default PortfolioBlock;