import {useEffect, useState} from "react";
import {List} from "@/components/general/index";
import { ShippingList } from "@/utils/shippingUtils";
import useSWR from "swr";

export const getServerSideProps = async (context)=>{
  useSWR("shippingListssss", await ShippingList(context.req.cookies.access_token), {
    onSuccess(list) {
      // localStorage.setItem("shippingListssss", JSON.stringify(list));
      console.log("in swr");
      console.log(list)
    },
  });
  
  // const data = await ShippingList(context.req.cookies.access_token); 
  return { props: { data } }

}
const Shipping = (props) => {

    const [shipping, setShipping] = useState(null);

    useEffect(()=>{
      setShipping(props.data)
    },[])

    async function ListData(makery){
      props.invokeTopParent(makery.trim().split("\t")[0]);
    }
    
    return (
      <div> 
          {
              <List view = {"shipping"} invokeUpper={ListData} data = {shipping} />
          }
      </div>

    )
}
export default Shipping

