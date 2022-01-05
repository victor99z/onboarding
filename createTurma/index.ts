import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_ALUNOS, TABELA_DISCIPLINAS, TABELA_TURMAS } from "../shared/config";
import { create, findById } from "../shared/cosmos";

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
        try {
            await Promise.all(alunos.forEach(async (item) => {
                await findById(TABELA_ALUNOS, item)
            }))
            await Promise.all(disciplinas.forEach(async (item) => {
                await findById(TABELA_DISCIPLINAS, item)
            }))

            const idCriacao = await create(TABELA_TURMAS, turma)

            context.res = {
                body: {
                    id: idCriacao
                }
            };

        } catch (err) {
            context.res = {
                body: {
                    msg: "Erro: Aluno ou Disciplina não existe"
                }
            };
        }
        return
    }

    context.res = {
        body: {
            msg: "Campos não preenchidos"
        }
    };
};

export default httpTrigger;