
const fetchSubterraneo = async () => {
    

    let url = 'http://localhost:3000/services/select'
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
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {fetchSubterraneo}