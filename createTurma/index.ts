import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_TURMAS } from "../shared/config";
import { create } from "../shared/cosmos";
import { validaTurma } from "./valida";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { disciplinas, alunos, ano, numVagas, periodoLetivo } = req.body

    const turma = {
        alunos,
        disciplinas,
        ano,
        numVagas,
        periodoLetivo
    }

    const msgValida = await validaTurma(turma)

    if (msgValida.length == 0) {
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
            msg: msgValida
        }
    };
};

export default httpTrigger;
