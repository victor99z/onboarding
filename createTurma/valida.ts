import { PERIODO, Turma } from "../@types/types"
import { TABELA_ALUNOS, TABELA_DISCIPLINAS } from "../shared/config"
import { findById } from "../shared/cosmos"

export const validaTurma = async (turma): Promise<Array<string>> => {
    let violations = []

    if (turma.alunos && turma.disciplinas && turma.ano && turma.numVagas && turma.periodoLetivo) {
        if (turma.alunos.length > 0 && turma.disciplinas.length > 0) {
            for (const aluno of turma.alunos) {
                const response = await findById(TABELA_ALUNOS, aluno)
                if (!response.resource) {
                    violations.push("Aluno não encontrado")
                    break
                }
            }
            for (const disciplina of turma.disciplinas) {
                const response = await findById(TABELA_DISCIPLINAS, disciplina)
                if (!response.resource) {
                    violations.push("Disciplina não encontrada")
                    break
                }
            }
        }
        if (!Object.values(PERIODO).includes(turma.periodoLetivo)) {
            violations.push("Periodo letivo informado não existe")
        }
    } else {
        violations.push("Campos não preenchidos")
    }

    return violations
}