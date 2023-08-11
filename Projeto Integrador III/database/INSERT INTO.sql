SELECT * FROM donopet;
SELECT * FROM pet;
SELECT * FROM vacina;

INSERT INTO donopet(nome, cpf, telefone, email, senha, confSenha, fotoDonoPet) VALUES('Jonathan', '00000000000', '9-0000-0000', 'jazz@gmail.com', '123', '123', 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=2000');
INSERT INTO donopet(nome, cpf, telefone, email, senha, confSenha, fotoDonoPet) VALUES('Amanda', '11111111111', '9-1111-1111', 'amanda@gmail.com', '456', '456', 'https://img.freepik.com/fotos-gratis/mulher-jovem-e-elegante-magnifica-com-grandes-olhos-castanhos-e-um-sorriso-incrivel_291049-2575.jpg?w=2000');
INSERT INTO donopet(nome, cpf, telefone, email, senha, confSenha, fotoDonoPet) VALUES('Mariana', '22222222222', '9-2222-2222', 'mariana@gmail.com', '789', '789', 'https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2018/03/formacao_1600x1200-como-a-presenca-da-mulher-pode-ser-harmonia-no-mundo.jpg');
INSERT INTO donopet(nome, cpf, telefone, email, senha, confSenha, fotoDonoPet) VALUES('Guilherme', '33333333333', '9-3333-3333', 'guilherme@gmail.com', '111', '111', 'https://imagem.natelinha.uol.com.br/original/globo-ee-lucas-gutierrez-reproducao-globo_3539.jpeg');

INSERT INTO pet(nome, tipo, dono_id) VALUES ('Totô', 'Cachorro', 1);
INSERT INTO pet(nome, tipo, dono_id) VALUES('Roberto', 'Gato', 1);
INSERT INTO pet(nome, tipo, dono_id) VALUES ('Loro', 'Pássaro', 2);
INSERT INTO pet(nome, tipo, dono_id) VALUES ('Nemo', 'Peixe', 3);
INSERT INTO pet(nome, tipo, dono_id) VALUES ('José', 'Gato', 4);

INSERT INTO vacina(id_pet, vac_v8_v10, vac_raiva, vac_tosse) VALUES (1, '2020-09-01', '2021-02-01', '2023-06-05');
INSERT INTO vacina(id_pet, vac_v8_v10, vac_raiva, vac_tosse) VALUES (2, '2020-06-05','2022-06-05', '2023-06-05');

INSERT INTO veterinario(nome, estadoAtendimento, cidadeAtendimento, especialidade, tipo_animal, porte, valor, convenio, foto) VALUES
('Lara da Silva', 'GO', 'Goiânia', 'Acunpuntura', 'Cachorro/Gato', 'Pequeno/Médio/Grande', 50, 'PetHealth/PetLove/Plamev', 'https://clinicaimed.com.br/wp-content/uploads/2021/07/Qual-medico-e-indicado-para-o-tratamento-da-covid-imed.jpg'),
('Pedro Henrique', 'TO', 'Arapoema', 'Homeopatia', 'Cachorro/Gato', 'Pequeno/Médio/Grande', 25, 'PetHealth/PetLove/Plamev', 'https://rafaelshama.com.br/wp-content/uploads/2020/05/Medico-Assistente-2-Dr.-Rafael-Shama.jpg'),
('João Santos', 'SP', 'São Paulo', 'Oftalmologia', 'Cachorro/Gato/Aves', 'Pequeno/Médio/Grande', 100, 'PetHealth', 'https://medicinadiaadia.com.br/wp-content/uploads/2020/08/shutterstock_1233048592.jpg'),
('Larissa Manolo', 'RJ', 'Rio de Janeiro', 'Cardiologia', 'Cachorro/Gato/Aves', 'Pequeno/Médio', 200, 'PetLove/Plamev', 'https://ceferp.com.br/wp-content/uploads/2017/09/125804-dia-do-medico-entenda-a-origem-da-comemoracao.jpg'),
('Warren', 'GO', 'Goiás', 'Dermatologia', 'Cachorro', 'Grande', 250, 'Plamev', 'https://www.medassistservicos.com.br/blog/wp-content/uploads/sites/2/2022/06/cnpj-medico.jpg'),
('Thomas', 'GO', 'Hidrolândia', 'Anestesiologia', 'Gato', 'Pequeno/Grande', 75, 'PetLove', 'https://ingracio.adv.br/wp-content/uploads/2020/09/aposentadoria-do-medico.jpg');