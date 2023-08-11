const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Pet = require('./Entidades/pet');
const Dono = require('./Entidades/Dono');
const Vacina = require('./Entidades/vacina');
const Veterinario = require('./Entidades/veterinario')

const app = express();

app.use(cors());
app.use(bodyParser.json());

//===========================================> VETERINARIO

app.get('/veterinario/pesquisa', async(request, response)=>{
  const {especialidade, estadoatendimento, cidadeatendimento, tipo_animal, porte, convenio, valor} = request.query;
  const veterinarios = await Veterinario.findFiltro(especialidade, estadoatendimento, cidadeatendimento, tipo_animal, porte, convenio, valor);
  response.json(veterinarios);
})

app.get('/veterinario/', async (req, res) => {
  const veterinarios = await Veterinario.findAll();
  res.json(veterinarios);
});

app.get('/veterinario/:id', async (req, res) => {
  const veterinario = await Veterinario.findById(req.params.id);
  if (!veterinario) {
    res.status(404).send('Veterinario não encontrado');
  } else {
    res.json(veterinario);
  }
});

app.get('/veterinario/nome/:nome', async(request, response)=>{
  const {nome} = request.params;
  const veterinario = await Veterinario.findNome(nome);
  response.json(veterinario);
});

app.post('/veterinario', async (req, res) => {
  const { nome, estadoatendimento, cidadeatendimento, especialidade, tipo_animal, porte, foto, valor, convenio  } = req.body;
  const veterinario = new Veterinario(null, nome, estadoatendimento, cidadeatendimento, especialidade, tipo_animal, porte, foto, valor, convenio);
  //console.log(veterinario);
  await veterinario.save();
  res.status(201).json(veterinario);
});

app.put('/veterinario/:id', async (req, res) => {
  const veterinario = await Veterinario.findById(req.params.id);
  if (!veterinario) {
    res.status(404).send('Veterinario não encontrado');
  } else {
    const { nome, endereco, especialidade, tipo_animal, porte } = req.body;
    veterinario.nome = nome;
    veterinario.endereco = endereco;
	  veterinario.especialidade = especialidade;
	  veterinario.tipo_animal = tipo_animal;
	  veterinario.porte = porte;
    await veterinario.save();
    res.json(veterinario);
  }
});

app.delete('/veterinario/:id', async (req, res) => {
  const veterinario = await Veterinario.findById(req.params.id);
  if (!veterinario) {
    res.status(404).send('Veterinario não encontrado');
  } else {
    await veterinario.delete();
    res.status(204).send('Veterinario removido com sucesso');
  }
});

//===========================================> DONO PET

app.get('/donopet', async (req, res) => {
    const donoPet = await Dono.findAll();
    res.json(donoPet);
  });

  app.get('/donopet/:id', async (req, res) => {
    const donoData = await Dono.getById(req.params.id);
    if (donoData === "id Dono não encontrado.") {
      res.status(404).send('id Dono não encontrado');
    } else {
      res.json(donoData);
    }
  });


  app.post('/donopet', async (req, res) => {
    const { nome, cpf, telefone, email, senha, confsenha, fotodonopet} = req.body;
    const donoPet = new Dono(null, nome, cpf, telefone, email, senha, confsenha, fotodonopet);
    await donoPet.save();
    res.status(201).json(donoPet);
  });

  app.put('/donopet/:id', async (req, res) => {
    const donoPet = await Dono.findById(req.params.id);
    if (!donoPet) {
      res.status(404).send('Dono de pet não encontrado');
    } else {
      const { nome, cpf, telefone, email, fotodonopet} = req.body;
      donoPet.nome = nome;
      donoPet.cpf = cpf;
      donoPet.telefone = telefone;
      donoPet.email = email;
      donoPet.fotodonopet = fotodonopet;


      await donoPet.save();
      res.json(donoPet);
    }
  });

  app.delete('/donopet/:id', async (req, res) => {
    const donoPet = await Dono.findById(req.params.id);
    if (!donoPet) {
      res.status(404).send('Dono de pet não encontrado');
    } else {
      await donoPet.delete();
      res.status(204).send('Dono de pet removido com sucesso');
    }
  });

//===========================================> LOGIN DONO PET

  app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Aqui você pode chamar o método `findAll` do seu modelo `Usuario`
    const donos = await Dono.findAll();

    // Verifica se o email e a senha correspondem a algum usuário
    const usuarioEncontrado = donos.find(dono => dono.email === email && dono.senha === senha);

    if (usuarioEncontrado) {
      res.json({ userId: usuarioEncontrado.id }); // Retorna o ID do usuário como resposta
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  });

//===========================================> PET

app.get('/pet/pesquisa/:id', async(request, response) => {
  const pet = await Pet.getAllPetDono(request.params.id);
  response.json(pet);
});

app.get('/pet', async(request, response) =>{
    const pet = await Pet.findAll();
    response.json(pet);
});

app.get('/pet/:id', async(request, response)=>{
    const pet = await Pet.findById(request.params.id);
    if (!pet){
        response.status(404).send('Pet não encontrado');
    }else{
        response.json(pet);
    }
});

app.post('/pet', async(request, response) => {
    const {dono_id} = request.body;
    if (dono_id === undefined){
        response.status(400).send('Impossível cadastrar: Dono de pet não informado')
    }else{
        const donoPet = await Dono.findById(dono_id);
        if (!donoPet){
            response.status(404).send('Ação impedida: Dono de Pet não encontrado')
        }else{
            const {nome, raca, sexo, tipo, castracao, peso, porte, idade, foto, dono_id} = request.body;
            const pet = new Pet(null, nome, raca, sexo, tipo, castracao, peso, porte, idade, foto, dono_id);
            await pet.save();
            response.status(201).json(pet);
        }
    }
});

app.put('/pet/:id', async(request, response)=>{
    const pet = await Pet.findById(request.params.id);
    if (!pet){
        response.status(404).send('Pet não encontrado')
    }else{
        const {nome, raca, sexo, tipo, castracao, peso, porte, idade, foto} = request.body;
        pet.nome = nome;
        pet.raca = raca;
        pet.sexo = sexo;
        pet.tipo = tipo;
        pet.castracao = castracao;
        pet.peso = peso;
        pet.porte = porte;
        pet.idade = idade;
        pet.foto = foto;
        await pet.put();
        response.status(201).json(pet);
    }
});

app.delete('/pet/:id', async(request, response)=>{
    const pet = await Pet.findById(request.params.id);
    if (!pet){
        response.status(404).send('Pet não encontrado');
    }else{
        await pet.delete();
        response.status(204).send('Pet deletado com sucesso');
    }
});


//===========================================> VACINA

app.get('/vacina', async(request, response)=>{
  const vacina = await Vacina.findAll();
  response.json(vacina);
});

app.get('/vacina/:id', async(request, response)=>{
  const vacina = await Vacina.findById(request.params.id);
  if (!vacina){
      response.status(404).send('Registro de Vacina não encontrado');
  }else{
      response.status(200).json(vacina);
  }
});


app.post('/vacina', async(request, response)=>{
  const {id_pet} = request.body;
  if (id_pet === undefined || id_pet === null){
      response.status(400).send('Impossível cadastrar: Pet não informado');
  }else{
      const exists = await Pet.findById(request.body.id_pet);
      if (!exists){
              response.status(404).send('Ação Impedida: Pet não foi encontrado')
      }else{
          const vacinaExists = await Vacina.findById(request.body.id_pet);
          if (vacinaExists){
              response.status(400).send('Impossível cadastrar: Registro já existe');
          }else{
              const {id_pet, vac_v8_v10, vac_raiva, vac_tosse} = request.body;
              const vacina = new Vacina(id_pet, vac_v8_v10, vac_raiva, vac_tosse);
              await vacina.save();
              response.status(201).json(vacina);
          }
      }
  }
});


app.put('/vacina/:id', async(request, response)=>{
  const vacina = await Vacina.findById(request.params.id);
  if (!vacina){
      response.status(404).send('Registro de Vacina não encontrado');
  }else{
      const {vac_v8_v10, vac_raiva, vac_tosse} = request.body;
      vacina.vac_v8_v10 = vac_v8_v10;
      vacina.vac_raiva = vac_raiva;
      vacina.vac_tosse = vac_tosse;
      await vacina.put();
      response.json(vacina);
  }
});

app.delete('/vacina/:id', async(request, response)=>{
  const vacina = await Vacina.findById(request.params.id);
  if (!vacina){
      response.status(404).send('Registro de Vacina não encontrado');
  }else{
      await vacina.delete();
      response.status(204).send('Registro de Vacina deletado');
  }
});

//TODO tentar entender o que é esse process.env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}}`);
});