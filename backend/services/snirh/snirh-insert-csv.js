router.get('/inserir', async (req, res) => {
    let url = "https://www.snirh.gov.br/cnarh40_treinamento/rest/api/inserir?uf=DF";
    let SNIRH_TOKEN = process.env['SNIRH_TOKEN'];
    let file = './csv/teste-1-superficial-welber.csv';
  
    const readStream = fs.createReadStream(file);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/csv',
          'Authorization': 'Bearer ' + SNIRH_TOKEN,
        },
        body: readStream,
        redirect: 'manual', // Disable automatic redirect following
      });
  
      // Handle redirect
      if (response.status === 301 || response.status === 302) {
        const redirectUrl = response.headers.get('Location');
        if (!redirectUrl) {
          throw new Error('Redirect location not found');
        }
  
        // Make a new request to the redirected URL
        const redirectedResponse = await fetch(redirectUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/csv',
            'Authorization': 'Bearer ' + SNIRH_TOKEN,
          },
          body: readStream,
        });
  
        const data = await redirectedResponse.json();
        res.send(data);
      } else if (!response.ok) {
        console.log('Request failed with status:', response.status);
        // Handle the error response here
      } else {
        const data = await response.json();
        res.send(data);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  module.exports = router;