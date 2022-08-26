import axios from 'axios'

export interface ProtheusOrderServiceProps {
  getProtheusOrders: () => {}

}

type ProtheusOrder = {
  branch: string
  number: string
  buyer: string
  provider_code: string
  provider: string
  approved: string
  delivery: string
}

type PurchaseOrder = {
  id: number
  tags: string 
  observation: string
  protheusNumber: string
  status: string
  createdAt: string
  updatedAt: string
}

export default { 
  async getProtheusOrders(ctx, next ) { 

    // puxar os pc(pedido de compras) do protheus
    const { data: protheusOrders } = await axios.get<ProtheusOrder[]>(`${process.env.APP_PROTHEUS_API_URL}/purchases-grouped`, {
      params: {
        branch: '0101'
      }
    })
      
    // puxar os purchase orders
    const purchaseOrders: PurchaseOrder[] = await strapi.entityService.findMany('api::purchase-order.purchase-order')

    // juntar os pc do protheus com os purchase orders
    
    const ordersUpdated = protheusOrders.map((protheusOrder) => {
      const purchaseOrder = purchaseOrders.find(purchaseOrder => purchaseOrder.protheusNumber === protheusOrder.number)

              
    

        const status = purchaseOrders.map((status) => {
          if(protheusOrder.approved === 'yes' && status.status === '') {
            status.status = 'Aguardando envio ao fornecedor'
          }
        })
        console.log(status)
      // if(protheusOrder.approved === 'yes' && purchaseOrder.status === ''  ) {

      //   purchaseOrder.status = 'Aguardando envio ao fornecedor'
                    
      // }
     

      if(purchaseOrder) {
       
        return {
          number: protheusOrder.number,
          provider: protheusOrder.provider,
          tags: purchaseOrder.tags,
          observation: purchaseOrder.observation,
          delivery: protheusOrder.delivery,
          status: purchaseOrder.status,
          buyer: protheusOrder.buyer,
          approved: protheusOrder.approved
        }
        
      }
      
        

      return {
        number: protheusOrder.number,
        provider: protheusOrder.provider,
        tags: '',
        observation: '',
        delivery: protheusOrder.delivery,
        status: '',
        buyer: protheusOrder.buyer,
        approved: protheusOrder.approved
      } 
       
    })
   
  //  console.log(ordersUpdated)
    return ordersUpdated
  },
 
};