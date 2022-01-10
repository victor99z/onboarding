import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_ALUNOS, TABELA_TURMAS } from "../shared/config";
import { findById, update } from "../shared/cosmos";
import { validaMatricula } from "./valida";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { idTurma, idAluno } = req.body

    const valida = await validaMatricula(idTurma, idAluno)

    if (valida.violations.length == 0) {
        const body = {
            id: idTurma,
            alunos: valida.turma.resource.alunos.concat(idAluno),
            disciplinas: valida.turma.resource.disciplinas,
            ano: valida.turma.resource.ano,
            periodoLetivo: valida.turma.resource.periodoLetivo,
            numVagas: valida.turma.resource.numVagas
        }

        const idUpdate = await update(TABELA_TURMAS, idTurma, body)

        context.res = {
            body: {
                id: idUpdate
            }
        };
        return
    }

    context.res = {
        body: {
            msg: valida.violations
        }
    };

};

export default httpTrigger;