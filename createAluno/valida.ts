import { Aluno, FORMA_INGRESSO } from "../@types/types"

export const validaAluno = (aluno: Aluno): Array<string> => {
    let violations = []
    if (!(aluno.idade && aluno.formaIngresso && aluno.matricula && aluno.nome)) {
        violations.push("Campos não preenchidos")
    }
    if (typeof (aluno.idade) !== "number") {
        violations.push("Idade precisa ser um numero")
    }
    if (!(Object.values(FORMA_INGRESSO).includes(aluno.formaIngresso))) {
        violations.push("Campo formaIngresso com tipo incorreto")
    }
    return violations
}
