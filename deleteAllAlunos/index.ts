import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { deleteAllItems } from '../shared/cosmos'
import { TABELA_ALUNOS } from '../shared/config'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    await deleteAllItems(TABELA_ALUNOS)

};

export default httpTrigger;