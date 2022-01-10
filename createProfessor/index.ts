import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { create, IQuery } from "../shared/cosmos"
import { TABELA_PROFESSORES } from "../shared/config"
import { Professor, TITULACAO } from "../@types/types";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { nome, titulacao } = req.body;

    if (nome && titulacao) {

        if (!Object.values(TITULACAO).includes(titulacao)) {
            context.res = {
                body: {
                    msg: "Titulação inválida"
                }
            };
            return
        }

        const professor: Professor = {
            nome,
            titulacao
        }

        const idCriacao = await create(TABELA_PROFESSORES, professor)

        context.res = {
            body: {
                idCriacao
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