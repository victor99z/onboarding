import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_DISCIPLINAS, TABELA_PROFESSORES } from "../shared/config";
import { create, findById } from "../shared/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { idProfessor, cargaHoraria } = req.body

    if (idProfessor && cargaHoraria) {

        try {
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
            return
        } catch (error) {
            context.res = {
                body: {
                    msg: "Professor não encontrado"
                }
            }
            return
        }
    }
    context.res = {
        body: {
            msg: "Campos não preenchidos"
        }
    }

};

export default httpTrigger;