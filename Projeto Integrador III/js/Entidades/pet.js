//LEMBRAR QUE PARA CADASTRAR UM PET, É PRECISO EXISTIR UM DONO DE PET
const pool = require('../database');

//TODO 1 - Verificar a questão das Vacinas Aplicadas
class PetService{

    constructor(id, nome, raca, sexo, tipo, castracao, peso, porte, idade, foto, dono_id){
        this.id = id;
        this.nome = nome;
        this.raca = raca;
        this.sexo = sexo;
        this.tipo = tipo;
        this.castracao = castracao;
        this.peso = peso;
        this.porte = porte;
        this.idade = idade;
        this.foto = foto;
        this.dono_id = dono_id;
    }

    static async findAll(){
        const {rows} = await pool.query('SELECT * FROM pet ORDER BY id');
        return rows.map((row) => new PetService(
            row.id,
            row.nome,
            row.raca,
            row.sexo,
            row.tipo,
            row.castracao,
            row.peso,
            row.porte,
            row.idade,
            row.foto,
            row.dono_id
        ));
    }

    static async findById(id){
        const {rows} = await pool.query('SELECT * FROM pet WHERE id = $1', [id]);
        if (rows.length === 0){
            return null;
        }
        const row = rows[0];
        return new PetService(
            row.id,
            row.nome,
            row.raca,
            row.sexo,
            row.tipo,
            row.castracao,
            row.peso,
            row.porte,
            row.idade,
            row.foto,
            row.dono_id
        );
    }

    static async getAllPetDono(dono_id){
        const {rows} = await pool.query('SELECT id, nome FROM pet WHERE dono_id = $1 ORDER BY nome', [dono_id]);
        if (rows.length === 0){
            return null;
        }
        return rows.map((row) => new PetService(
            row.id,
            row.nome
        ));
    }

    async save(){
        const {rows} = await pool.query('INSERT INTO pet (nome, raca, sexo, tipo, castracao, peso, porte, idade, foto, dono_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
        [this.nome, this.raca, this.sexo, this.tipo, this.castracao, this.peso, this.porte, this.idade, this.foto, this.dono_id])
        this.id = rows[0].id;
    }


    async put(){
        await pool.query('UPDATE pet SET nome = $1, raca = $2, sexo = $3, tipo = $4, castracao = $5, peso = $6, porte = $7, idade = $8, foto = $9 WHERE id = $10',
        [this.nome, this.raca, this.sexo, this.tipo, this.castracao, this.peso, this.porte, this.idade, this.foto, this.id])
    }


    async delete(){
        await pool.query('DELETE FROM pet WHERE id = $1', [this.id]);
    }
}

module.exports = PetService;