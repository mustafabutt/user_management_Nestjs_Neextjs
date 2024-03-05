
import {RatesService} from "@/services/rates.service";

export async function EmbroideryListData(token) {

  var result = await RatesService().getEmbroideryList(token);
  return result;
}

