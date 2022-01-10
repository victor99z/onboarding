import { TABELA_ALUNOS, TABELA_TURMAS } from "../shared/config"
import { findById } from "../shared/cosmos"

export const validaMatricula = async (idTurma, idAluno): Promise<any> => {
    let violations = []
    let turma

    if (idTurma && idAluno) {
        turma = await findById(TABELA_TURMAS, idTurma)
        const aluno = await findById(TABELA_ALUNOS, idAluno)

        if (turma.resource && aluno.resource) {
            if (turma.resource.alunos.includes(idAluno)) {
                violations.push("Aluno já matriculado")
            }
        } else {
            violations.push("Turma ou Aluno inválidos")
        }
    } else {
        violations.push("Campos não preenchidos")
    }

    return { violations, turma }
}