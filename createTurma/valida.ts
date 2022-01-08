import { Turma } from "../@types/types"
import { TABELA_ALUNOS, TABELA_DISCIPLINAS } from "../shared/config"
import { findById } from "../shared/cosmos"

const validaTurma = async (turma: Turma): Promise<any> => {
    let violations = []

    if (turma.alunos.length > 0 && turma.disciplinas.length > 0) {
        for (const aluno of turma.alunos) {
            const response = await findById(TABELA_ALUNOS, aluno.id)
            if (!response.resource) {
                violations.push("Aluno não encontrado")
            }
        }
        for (const disciplina of turma.disciplinas) {
            const response = await findById(TABELA_DISCIPLINAS, disciplina.id)
            if (!response.resource) {
                violations.push("Disciplina não encontrada")
            }
        }
    } else {
        violations.push("Formato de entrada inválido")
    }
    return violations
}