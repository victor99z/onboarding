export interface Professor {
    id?: string,
    nome: string,
    titulacao: TITULACAO
}

export interface Aluno {
    id?: string,
    nome: string,
    idade: number,
    matricula: string,
    formaIngresso: FORMA_INGRESSO
}

export interface Disciplina {
    id?: string,
    professorId: string,
    cargaHoraria: number
}

export interface Turma {
    id?: string,
    alunos: [Aluno],
    disciplinas: [Disciplina],
    ano: string,
    periodoLetivo: PERIODO,
    numVagas: number
}

export interface MatriculaAluno {
    id?: string,
    idAluno: string,
    idTurma: string
}

export enum TITULACAO {
    PHD = "PHD",
    MESTRE = "MESTRE",
    GRADUADO = "GRADUADO"
}

export enum FORMA_INGRESSO {
    VESTIBULAR = "VESTIBULAR",
    ENEM = "ENEM",
    ENADE = "ENADE",
    SISU = "SISU"
}

export enum PERIODO {
    MANHA = "MANHA",
    TARDE = "TARDE",
    NOITE = "NOITE"
}