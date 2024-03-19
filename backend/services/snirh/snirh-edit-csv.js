
router.get('/atualizar', async (req, res) => {
  
    let url = "https://www.snirh.gov.br/cnarh40_treinamento/rest/api/atualizar?uf=DF";
  
    let SNIRH_TOKEN = process.env['SNIRH_TOKEN'];
    console.log(SNIRH_TOKEN)
  
    let file = './csv/insercao-chatgpt-null.csv';
    //let file = './csv/edicao.csv';
    // ler o arquivo csv
    let readStream = fs.createReadStream(file);
  
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': SNIRH_TOKEN,
      },
      body: readStream
    }).then((response) => {
      return response.json()
    }).then((response) => {
      res.send(response)
    });
  });
  
  module.exports = router;