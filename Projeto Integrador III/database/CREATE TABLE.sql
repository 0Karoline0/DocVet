CREATE TABLE donoPet
(
	id          serial          primary key,
	nome        varchar(255)    not null,
	cpf         varchar(11)     not null,
	telefone    varchar(11),
	email       varchar(255)    not null,
	senha       varchar(25)     not null,
	confSenha   varchar(25)     not null,
    fotoDonoPet text
);


CREATE TABLE pet(
    id          serial          primary key,
    nome	    varchar(60)     not null,
    raca        varchar(60),
    sexo        char(1),
    tipo        varchar(60)		not null,
    castracao   Boolean,
    peso        float,
    porte       varchar(10),
    idade       integer,
	foto		text,
    dono_id     integer         not null,

    constraint rel_pet_dono     foreign key(dono_id) references donoPet
);

CREATE TABLE vacina(
    id_pet          integer          primary key,
    vac_v8_v10      date,
    vac_raiva       date,
    vac_tosse       date,

    constraint rel_vacina_pet   foreign key(id_pet) references pet
);

CREATE TABLE veterinario(
	id                  serial              primary key,
	nome                varchar(150)        not null,
	estadoAtendimento   char(2),
	cidadeAtendimento   varchar(150),
	especialidade       varchar(300)        not null,
	tipo_animal         varchar(150)        not null,
	porte               varchar(100),
	foto                text,
	valor               float               not null,
	convenio            varchar(60)
);