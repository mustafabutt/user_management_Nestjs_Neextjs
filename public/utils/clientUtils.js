
import {OrderService} from "@/services/ordersManagement.service";

export async function ClientListData(token) {
  var result = await OrderService().getClientList(token);
  return result;
}

