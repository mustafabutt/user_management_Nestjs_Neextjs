import {RatesService} from "@/services/rates.service";

export async function FabricListData() {
  let finalData, localFabricData, fabricData;
  localFabricData = await RatesService().getLocalFabricList();
  if(!localFabricData)
  {
    fabricData = await RatesService().getFabricList();
    finalData = fabricData
  } else finalData = localFabricData
  return finalData;
}

