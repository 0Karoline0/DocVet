const { response } = require('express');
const pool = require('../database');

class Veterinario {
  constructor(id, nome, estadoatendimento, cidadeatendimento, especialidade, tipo_animal, porte, foto, valor, convenio) {
    this.id = id;
    this.nome = nome;
    this.estadoatendimento = estadoatendimento;
    this.cidadeatendimento = cidadeatendimento;
    this.especialidade = especialidade;
    this.tipo_animal = tipo_animal;
	  this.porte = porte;
    this.foto = foto;
    this.valor = valor;
    this.convenio = convenio
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM veterinario ORDER BY id');
    return rows.map((row) => new Veterinario(row.id, row.nome, row.estadoatendimento, row.cidadeatendimento, row.especialidade, row.tipo_animal, row.porte, row.foto, row.valor, row.convenio));
  }

  static async findNome(nome){
    const {rows} = await pool.query(`SELECT id, estadoatendimento, cidadeatendimento, nome, especialidade, tipo_animal, porte, foto, valor, convenio FROM veterinario WHERE nome LIKE $1`, [`%${nome}%`]);
    if (rows.length === 0){
      return null;
    }
    return rows.map((row)=> new Veterinario(row.id, row.nome, row.estadoatendimento, row.cidadeatendimento, row.especialidade, row.tipo_animal, row.porte, row.foto, row.valor, row.convenio));
  }

  static async findFiltro(especialidade, estadoatendimento, cidadeatendimento, tipo_animal, porte, convenio, valor){
    const filtros = [];
    let valorTratado, valor1, valor2;

    //[ condição a testar ] ? [ resposta se verdadeiro ] : [ resposta se não verdadeiro ]
    if (especialidade){
      for (let item of especialidade){
        filtros.push(` especialidade LIKE '%${item}%'`);
      }
    }

    if (estadoatendimento){
      filtros.push(` estadoatendimento='${estadoatendimento}'`);
    }

    if (cidadeatendimento){
      filtros.push(` cidadeatendimento='${cidadeatendimento}'`);
    }

    if (tipo_animal){
      for (let item of tipo_animal){
        filtros.push(` tipo_animal LIKE '%${item}%'`);
      }
    }

    if (porte){
      for (let item of porte){
        filtros.push(` porte LIKE '%${item}%'`);
      }
    }

    if (convenio){
      for (let item of convenio){
        filtros.push(` convenio LIKE '%${item}%'`);
      }
    }

    if (valor){
      valorTratado = valor.split('/');
      if (valorTratado.length>1){
        valor1 = valorTratado[0];
        valor2 = valorTratado[1];
      }else{
        valor1 = valor
      }
    }

    if (valor){
      if (valorTratado.length>1){
        filtros.push(` valor BETWEEN ${valor1} AND ${valor2}`)
      }else{
        filtros.push(` valor > ${valor1} `);
      }
    }


    //console.log(valor1);
    //console.log(valor2);
    //console.log(filtros);

    let query =
    `
      SELECT * FROM veterinario
      ${filtros.length>0 ? ' WHERE ' + filtros.join(' AND '):''}
    `;

    const {rows} = await pool.query(query);

    if (rows.length === 0){
      return null;
    }
    return rows.map((row)=>new Veterinario(row.id, row.nome, row.estadoatendimento, row.cidadeatendimento, row.especialidade, row.tipo_animal, row.porte, row.foto, row.valor, row.convenio));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM veterinario WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Veterinario(row.id, row.nome, row.estadoatendimento, row.cidadeatendimento, row.especialidade, row.tipo_animal, row.porte, row.foto, row.valor, row.convenio);
  }

  async save() {
    if (this.id) {
      await pool.query('UPDATE veterinario SET nome = $1, estadoatendimento = $2, cidadeatendimento = $3, especialidade = $4, tipo_animal = $5, porte = $6 WHERE id = $7', [this.nome, this.estadoatendimento, this.cidadeatendimento, this.especialidade, this.tipo_animal, this.porte, this.id]);
    } else {
      const { rows } = await pool.query('INSERT INTO veterinario (nome, estadoatendimento, cidadeatendimento, especialidade, tipo_animal, porte, foto, valor, convenio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [this.nome, this.estadoatendimento, this.cidadeatendimento, this.especialidade, this.tipo_animal, this.porte, this.foto, this.valor, this.convenio]);
      this.id = rows[0].id;
    }
  }

  async delete() {
    await pool.query('DELETE FROM veterinario WHERE id = $1', [this.id]);
  }
}

module.exports = Veterinario;