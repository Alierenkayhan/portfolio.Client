import React, { useState, useEffect } from 'react';
import BlogBlock from "./blogBlock";
import { Box, Grid } from "@mui/material";
import api from "../../Service/GlobalApi";
import bloggif from "./../../img/bloggif.gif";
import Style from './../../Css/About.module.scss';

export default function Article()
{
    const [combinedData, setCombinedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const mediumData = await api.medium;
                const bloggerData = await api.blogger;

                const combinedData = [
                    ...mediumData.items.map(item => ({ ...item, type: 'medium' })),
                    ...bloggerData.items.map(item => ({ ...item, type: 'blogger' })),
                ];

                setCombinedData(combinedData);
            } catch (error)
            {
                console.error("Error fetching data:", error);
            }
            finally
            {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading || !combinedData)
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
        <Box>
            <Grid container display={'flex'} justifyContent={'center'}>
                {combinedData.map((project, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <BlogBlock
                            image={bloggif}
                            source={project.type === 'medium' ? project.link : project.url}
                            title={project.title}
                            categories={project.type === 'medium' ? project.categories : null}
                            description={project.type === 'medium' ? project.description : null}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
