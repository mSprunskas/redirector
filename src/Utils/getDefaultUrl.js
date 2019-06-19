const getDefaultUrl = (entries) => {
    if (entries.length > 0) {
        return entries.slice(-1)[0].getAuthUrl();
    }

    return 'https://project.guru';
};

export default getDefaultUrl;
