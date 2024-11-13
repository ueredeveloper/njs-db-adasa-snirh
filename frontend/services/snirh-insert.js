const snirhInsert = async (uf, body) => {
   
    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services/inserir');
    url.searchParams.append('uf', uf);

    console.log(body)

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(body)
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default snirhInsert;