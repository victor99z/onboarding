import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_ALUNOS, TABELA_TURMAS } from "../shared/config";
import { findById, update } from "../shared/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { idTurma, idAluno } = req.body

    if (idTurma && idAluno) {

        const turma = await findById(TABELA_TURMAS, idTurma)
        const aluno = await findById(TABELA_ALUNOS, idAluno)

        if (turma.resource && aluno.resource) {
            if (!turma.resource.alunos.includes(idAluno)) {
                const body = {
                    id: idTurma,
                    alunos: turma.resource.alunos.concat(idAluno),
                    disciplinas: turma.resource.disciplinas,
                    ano: turma.resource.ano,
                    periodoLetivo: turma.resource.periodoLetivo,
                    numVagas: turma.resource.numVagas
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
                    msg: "Aluno já matriculado"
                }
            };
            return
        }
        context.res = {
            body: {
                msg: "Turma ou Aluno inválidos"
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