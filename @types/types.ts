export interface Professor {
    nome: string,
    titulacao: string
}

export interface Aluno {
    nome: string,
    idade: number,
    matricula: string,
    formaIngresso: string
}

export interface Disciplina {
    professorId: string,
    cargaHoraria: number
}

export interface Turma {
    alunos: [Aluno],
    disciplinas: [Disciplina],
    ano: string,
    periodoLetivo: string,
    numVagas: number
}

export interface MatriculaAluno {
    idAluno: string,
    idTurma: string
}