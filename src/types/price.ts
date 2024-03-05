export interface PriceCalculation {
  shippingValue: string,
  itemValue: string,
  fabricValue: string,
  quantity: string,
  profit_margin:string,
  production_time:string
  usdRate: number,
  decoration: { 
    value: string,
    type: string,
    size: { 
      width: string,
      height: string
    }
  }
}