export interface PriceCalculation {
  shipping: string,
  item: string,
  fabric: string,
  qty: string,
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