import React, { useState, useEffect } from 'react';
import Style from './../../Css/About.module.scss';
import Terminal from "./Terminal";
import { Box } from "@mui/material";
import api from "./../../Service/GlobalApi";
import { info } from '../../info/Info';

export default function About()
{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const aboutData = await api.fetchDataFromServerAbout();
                const skillsData = await api.fetchDataFromServerSkills();
                const hobbiesData = await api.fetchDataFromServerHobbies();
                const educationData = await api.fetchDataFromServerEducation();
                const voluntarilyData = await api.fetchDataFromServerEducation();

                const transformedData = {
                    firstName: aboutData[0].firstName,
                    lastName: aboutData[0].lastName,
                    position: aboutData[0].position,
                    selfPortrait: aboutData[0].selfPortrait,
                    bio: aboutData[0].bio,
                    skills: skillsData,
                    hobbies: hobbiesData,
                    education: educationData,
                    voluntarily: voluntarilyData
                };

                setData(transformedData);
            } catch (error)
            {
                console.error("Error fetching data:", error);
                console.error("Error details:", error.response || error.message || error);
            } finally
            {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading || !data)
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
    const firstName = data.firstName.toLowerCase()

    function aboutMeText()
    {
        return <>
            <p><span style={{ color: info.baseColor }}>{firstName} {data.lastName.toLowerCase()} $</span> cat
                about {firstName} </p>
            <p><span style={{ color: info.baseColor }}>about {firstName} <span
                className={Style.green}>(main)</span> $ </span>
                {data.bio}
            </p>
        </>;
    }

    function formatISODateToCustomFormat(isoDateString)
    {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const dateObject = new Date(isoDateString);
        return dateObject.toLocaleDateString(undefined, options);
    }

    function educationText()
    {
        return (
            <>
                <p>
                    <span style={{ color: info.baseColor }}>
                        {firstName} {data.lastName.toLowerCase()} $
                    </span>{' '}
                    cat education
                </p>
                <div>
                    <p>
                        <span style={{ color: info.baseColor }}>
                            education{' '}
                            <span className={Style.green}>(main)</span> $
                        </span>{' '}
                    </p>
                    <ul>
                        {data.education.map((item, index) => (
                            <li key={index}>
                                <Box component={'span'} mr={'1rem'}>
                                    {item.educationTitle} <br />
                                    {item.educationSubTitle} <br />
                                    {formatISODateToCustomFormat(item.educationStartDate)} -{' '}
                                    {formatISODateToCustomFormat(item.educationEndDate)} <br />
                                    {item.educationDetail}  <br />
                                </Box>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }


    function skillsText()
    {
        return <>
            <p><span style={{ color: info.baseColor }}>{firstName}{data.lastName.toLowerCase()} $</span> cd skills/tools
            </p>
            <p><span style={{ color: info.baseColor }}>skills/tools <span
                className={Style.green}>(main)</span> $</span> ls</p>
            <p style={{ color: info.baseColor }}> Proficient With</p>
            <ul className={Style.skills}>
                {data.skills.map((skill, index) => <li key={index}>{skill.proficientWith}</li>)}
            </ul>
            <p style={{ color: info.baseColor }}> Exposed To</p>
            <ul className={Style.skills}>
                {data.skills.map((skill, index) => <li key={index}>{skill.exposedTo}</li>)}
            </ul>
        </>;
    }

    function voluntarilyText()
    {
        return (
            <>
                <p>
                    <span style={{ color: info.baseColor }}>
                        {firstName} {data.lastName.toLowerCase()} $
                    </span>{' '}
                    cat voluntarily
                </p>
                <div>
                    <p>
                        <span style={{ color: info.baseColor }}>
                            voluntarily {' '}
                            <span className={Style.green}>(main)</span> $
                        </span>{' '}
                    </p>
                    <ul>
                        {data.education.map((item, index) => (
                            <li key={index}>
                                <Box component={'span'} mr={'1rem'}>
                                    {item.voluntarilyTitle} <br />
                                    {item.voluntarilySubTitle} <br />
                                    {formatISODateToCustomFormat(item.voluntarilyStartDate)} -{' '}
                                    {formatISODateToCustomFormat(item.voluntarilyEndDate)} <br />
                                    {item.voluntarilyDetail}   <br />
                                </Box>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
    
    function miscText()
    {
        return <>
            <p><span style={{ color: info.baseColor }}>{firstName}{data.lastName.toLowerCase()} $</span> cd
                hobbies/interests</p>
            <p><span style={{ color: info.baseColor }}>hobbies/interests <span
                className={Style.green}>(main)</span> $</span> ls</p>
            <ul>
                {data.hobbies.map((hobby, index) => (
                    <li key={index}><Box component={'span'} mr={'1rem'}>{hobby.emoji}</Box>{hobby.label}</li>
                ))}
            </ul>
        </>;
    }

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <Terminal text={aboutMeText()} />
            <Terminal text={educationText()} />
            <Terminal text={skillsText()} />
            <Terminal text={voluntarilyText()} />
            <Terminal text={miscText()} />
        </Box>
    );

}
