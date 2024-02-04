import React, { useState, useEffect } from 'react';
import PortfolioBlock from "./PortfolioBlock";
import { Box, Grid } from "@mui/material";
import api from "./../../Service/GlobalApi";
import porjects_image from "./../../img/projects_image.png";
export default function Portfolio()
{
    const [githubProjects, setGithubProjects] = useState([]);

    useEffect(() =>
    {
        const fetchDataGitHub = async () =>
        {
            try
            {
                const githubData = await api.fetchDataFromGitHub();
                setGithubProjects(githubData);
            } catch (error)
            {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataGitHub();
    }, []);

    return (
        <Box marginTop={'2rem'}>
            <Grid container display={'flex'} justifyContent={'center'}>
                {githubProjects.map((project, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <PortfolioBlock image={porjects_image} source={project.html_url} title={project.name} tags={project.language} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
