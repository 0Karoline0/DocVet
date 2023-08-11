const pool = require('../database');

class VacinaService{
    constructor (id_pet, vac_v8_v10, vac_raiva, vac_tosse){
        this.id_pet = id_pet;
        this.vac_v8_v10 = vac_v8_v10;
        this.vac_raiva = vac_raiva;
        this.vac_tosse = vac_tosse;
    }

    static async findAll(){
        const {rows} = await pool.query(`SELECT *,
            to_char(vac_v8_v10, 'YYYY-MM-DD') AS v8_v10_format,
            to_char(vac_raiva, 'YYYY-MM-DD') AS raiva_format,
            to_char(vac_tosse, 'YYYY-MM-DD') AS tosse_format
        FROM vacina ORDER BY id_pet`);
        return rows.map((row) => new VacinaService(
            row.id_pet,
            row.v8_v10_format,
            row.raiva_format,
            row.tosse_format
        ))
    }

    static async findById(id){
        const {rows} = await pool.query(`SELECT *,
            to_char(vac_v8_v10, 'YYYY-MM-DD') AS v8_v10_format,
            to_char(vac_raiva, 'YYYY-MM-DD') AS raiva_format,
            to_char(vac_tosse, 'YYYY-MM-DD') AS tosse_format
        FROM vacina WHERE id_pet = $1`, [id])
        if (rows.length === 0){
            return null;
        }
        const row = rows[0];
        return new VacinaService(
            row.id_pet,
            row.v8_v10_format,
            row.raiva_format,
            row.tosse_format,
        );
    }

    async save(){
        const {rows} = await pool.query('INSERT INTO vacina(id_pet, vac_v8_v10, vac_raiva, vac_tosse) VALUES ($1, $2, $3, $4) RETURNING id_pet',
        [this.id_pet, this.vac_v8_v10, this.vac_raiva, this.vac_tosse]);
        this.id = rows[0].id;
    }

    async put(){
        await pool.query('UPDATE vacina SET vac_v8_v10 = $1, vac_raiva = $2, vac_tosse = $3 WHERE id_pet = $4',
        [this.vac_v8_v10, this.vac_raiva, this.vac_tosse, this.id_pet]);
    }

    async delete(){
        await pool.query('DELETE FROM vacina WHERE id_pet = $1', [this.id_pet])
    }
}

module.exports = VacinaService;