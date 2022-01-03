interface Professor {
    nome: string,
    titulacao: string
}

interface Aluno {
    nome: string,
    idade: number,
    matricula: string,
    formaIngresso: string
}

interface Disciplina {
    professorId: string,
    cargaHoraria: number
}

interface Turma {
    alunos: [Aluno],
    disciplinas: [Disciplina],
    ano: string,
    periodoLetivo: string,
    numVagas: number
}