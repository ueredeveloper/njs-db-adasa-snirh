const selectClosestPoints = async (latitude, longitude) => {

    console.log(latitude,longitude)
    
    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services/select-closest-points');
    url.searchParams.append('latitude', latitude);
    url.searchParams.append('longitude', longitude);

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

export default selectClosestPoints;