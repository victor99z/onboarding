import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_TURMAS } from "../shared/config";
import { create } from "../shared/cosmos";

// TODO: Validar Alunos, Disciplinas etc...

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { disciplinas, alunos, ano, numVagas, periodoLetivo } = req.body

    const turma: Turma = {
        alunos,
        disciplinas,
        ano,
        numVagas,
        periodoLetivo
    }

    const idCriacao = await create(TABELA_TURMAS, turma)

    context.res = {
        body: {
            id: idCriacao
        }
    };

};

export default httpTrigger;