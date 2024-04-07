
import {OrderService} from "@/services/ordersManagement.service";

export async function OrderListData(token) {
  var result = await OrderService().getOrderList(token);
  return result;
}

