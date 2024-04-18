const selectByDesktopDb = async (search) => {

    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services/select-desktop-db');
    url.searchParams.append('search', search);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default selectByDesktopDb;