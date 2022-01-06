import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Turma } from "../@types/types";
import { TABELA_ALUNOS, TABELA_DISCIPLINAS, TABELA_TURMAS } from "../shared/config";
import { create, findById } from "../shared/cosmos";

const getAluno = async (alunos: [any]): Promise<boolean> => {
    try {
        for (const aluno of alunos) {
            const response = await findById(TABELA_ALUNOS, aluno)
            if (!response.resource) {
                return false
            }
        }
        return true
    } catch {
        return false
    }
}

const getDisciplina = async (disciplinas: [any]): Promise<boolean> => {
    try {
        for (const aluno of disciplinas) {
            const response = await findById(TABELA_DISCIPLINAS, aluno)
            if (!response.resource) {
                return false
            }
        }
        return true
    } catch {
        return false
    }
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { disciplinas, alunos, ano, numVagas, periodoLetivo } = req.body

    const turma: Turma = {
        alunos,
        disciplinas,
        ano,
        numVagas,
        periodoLetivo
    }

    if (alunos && disciplinas && ano && numVagas && periodoLetivo) {

        if (await getDisciplina(disciplinas) && await getAluno(alunos)) {
            const idCriacao = await create(TABELA_TURMAS, turma)

            context.res = {
                body: {
                    id: idCriacao
                }
            };
            return
        }
        context.res = {
            body: {
                msg: "Erro: Aluno ou Disciplina não existe"
            }
        };
        return
    }
    context.res = {
        body: {
            msg: "Campos não preenchidos"
        }
    };
};

export default httpTrigger;
