
import {RatesService} from "@/services/rates.service";

export async function PrintingListData(token) {

  var result = await RatesService().getPrintingList(token);
  return result;
}

