import React from 'react';
import IconLink from '../Shared/IconLink';
import { Box } from '@mui/material';

function truncateText(text, maxLength)
{
   if (text && text.length > maxLength)
   {
      return `${text.substring(0, maxLength)}...`;
   } else
   {
      return text;
   }
}

function BlogBlock(props)
{
   const { image, source, title, description, categories } = props;
   const truncatedTitle = truncateText(title, 50);
   const truncatedDescription = truncateText(description, 70);

   return (
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} marginTop={'2rem'}>
         <Box component={'img'} src={image} borderRadius={'25px'} />
         <h1 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{truncatedTitle}</h1>
         <p style={{ fontSize: '1rem', textAlign: 'center', margin: '0.5rem 0' }} dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
         <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'0.5rem'} mt={'1rem'}>
            {categories && categories.map((category, index) => (
               <Box key={index} p={1} border={'2px solid black'} borderRadius={'25px'}>
                  {category}
               </Box>
            ))}
         </Box>
         <Box className={'portfolio'} display={'flex'} flexDirection={'column'} gap={'0.5rem'} alignItems={'center'} fontSize={'1.5rem'} py={'2rem'}>
            <Box p={1} border={'2px solid black'} borderRadius={'25px'}>
               <IconLink link={source} title={'Blog Link'} icon={'fa fa-edit'} />
            </Box>
         </Box>
      </Box>
   );
}

export default BlogBlock;
