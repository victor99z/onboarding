import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { create } from "domain";
import { TABELA_ALUNOS, TABELA_TURMAS } from "../shared/config";
import { findById, update } from "../shared/cosmos";

// TODO: finalizar validacoes

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { idTurma, idAluno, body } = req.body

    if (idTurma && idAluno && body) {
        try {


            const turma = await findById(TABELA_TURMAS, idTurma)
            await findById(TABELA_ALUNOS, idAluno)



            const idUpdate = await update(TABELA_TURMAS, idTurma, body)

            context.res = {
                body: {
                    id: idUpdate
                }
            };
            return
        } catch (err) {
            context.res = {
                body: {
                    msg: "Turma ou Aluno inválidos"
                }
            };
            return
        }
    }
    context.res = {
        body: {
            msg: "Campos não preenchidos"
        }
    };
};

export default httpTrigger;