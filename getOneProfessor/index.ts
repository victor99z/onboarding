import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_PROFESSORES } from "../shared/config";
import { findByName } from "../shared/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { nome } = req.body

    const response = await findByName(TABELA_PROFESSORES, nome)

    context.res = {
        body: response
    };

};

export default httpTrigger;