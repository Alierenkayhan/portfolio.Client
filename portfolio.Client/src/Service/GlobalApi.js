import axios from "axios";

const fetchDataFromGitHub = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_GITHUB_API_URL + process.env.REACT_APP_GITHUB_USERNAME + "/repos");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};
const fetchDataFromBlogger = async () =>
{
    try
    {
        const response = await axios.get(`https://www.googleapis.com/blogger/v3/blogs/${process.env.REACT_APP_BLOGGER_BLOG_ID}/posts?key=${process.env.REACT_APP_BLOGGER_API_KEY}&maxResults=100`);
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};
const fetchDataFromMedium = async () =>
{
    try
    {
        const response = await axios.get("https://api.rss2json.com/v1/api.json?rss_url=" + process.env.REACT_APP_MEDIUM_URL);
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataFromServerAbout = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "About");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataFromServerMiniBio = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "MiniBio");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataFromServerHobbies = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "Hobbies");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataFromServerSkills = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "Skills");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataFromServerSocials = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "Socials");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};


const fetchDataFromServerEducation = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "Education");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataFromServerVoluntarily = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "Voluntarily");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataFromServerRecommendations = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "Recommendation");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataFromServerContent = async () =>
{
    try
    {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "ContentFile");
        return response.data;
    } catch (error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const github = fetchDataFromGitHub();
const blogger = fetchDataFromBlogger();
const medium = fetchDataFromMedium();

const api = {
    github,
    blogger,
    medium,
    fetchDataFromServerAbout,
    fetchDataFromServerMiniBio,
    fetchDataFromServerHobbies,
    fetchDataFromServerSkills,
    fetchDataFromServerSocials,
    fetchDataFromServerEducation,
    fetchDataFromServerVoluntarily,
    fetchDataFromServerRecommendations,
    fetchDataFromServerContent
};

export default api;
