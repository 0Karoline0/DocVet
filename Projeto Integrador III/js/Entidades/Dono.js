const pool = require('../database');

class Dono {
  constructor(id, nome, cpf, telefone, email, senha, confsenha, fotodonopet) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.email = email;
    this.senha = senha;
    this.confsenha = confsenha;
    this.fotodonopet = fotodonopet;
  }

  static async findAll() {
    const {rows} = await pool.query('SELECT * FROM donopet');
    return rows.map((row) => new Dono(row.id, row.nome, row.cpf, row.telefone, row.email, row.senha, row.confsenha, row.fotodonopet));
  }

  static async findById(id) {
    const {rows} = await pool.query('SELECT * FROM donopet WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Dono(row.id, row.nome, row.cpf, row.telefone, row.email, row.senha, row.confsenha, row.fotodonopet);
  }

  // Método getById para buscar o dono pelo ID e exibir os dados
  static async getById(id) {
    const dono = await Dono.findById(id);
    if (dono === null) {
      return "id Dono não encontrado.";
    }

    const donoData = {
      ID: dono.id,
      Nome: dono.nome,
      CPF: dono.cpf,
      Telefone: dono.telefone,
      Email: dono.email,
      Senha: dono.senha,
      ConfirmacaoSenha: dono.confsenha,
      Fotodonopet: dono.fotodonopet

    };

    return donoData;
  }

  async save() {
    if (this.id) {
      await pool.query('UPDATE donopet SET nome = $1, cpf = $2, telefone = $3 ,email = $4, fotodonopet = $5 WHERE id = $6', [this.nome, this.cpf, this.telefone, this.email,this.fotodonopet, this.id]);
    } else {
      const { rows } = await pool.query('INSERT INTO donopet (nome, cpf, telefone, email, senha, confsenha, fotodonopet ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [this.nome, this.cpf, this.telefone, this.email, this.senha, this.confsenha, this.fotodonopet]);
      this.id = rows[0].id;
    }
  }

  async delete() {
    await pool.query('DELETE FROM donopet WHERE id = $1', [this.id]);
  }
}

module.exports = Dono;
