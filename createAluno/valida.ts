export const validaAluno = (aluno: Aluno): Array<string> => {
    let violations = []
    if (!(aluno.idade && aluno.formaIngresso && aluno.matricula && aluno.nome)) {
        violations.push("Campos não preenchidos")
    }
    if (typeof (aluno.idade) !== "number") {
        violations.push("Idade precisa ser um numero")
    }
    return violations
}
