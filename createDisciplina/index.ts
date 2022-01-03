import { ItemResponse } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_DISCIPLINAS, TABELA_PROFESSORES } from "../shared/config";
import { create, findById, findByName } from "../shared/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { idProfessor, cargaHoraria } = req.body
    const getProfessor = await findById(TABELA_PROFESSORES, idProfessor)

    const disciplina: Disciplina = {
        professorId: getProfessor.resource.id,
        cargaHoraria
    }

    const idCriacao = await create(TABELA_DISCIPLINAS, disciplina)

    context.res = {
        body: {
            id: idCriacao
        }
    }

};

export default httpTrigger;