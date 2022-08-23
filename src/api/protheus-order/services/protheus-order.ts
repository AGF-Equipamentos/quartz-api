import axios from 'axios'

export interface ProtheusOrderServiceProps {
  getProtheusOrders: () => {}

}

export default { 
  async getProtheusOrders(ctx, next ) { 

    // puxar os pc(pedido de compras) do protheus

    //const protheus = strapi.entityService.findMany('api::protheus-order.protheus-order')
    const { data: protheusOrders } = await axios.get(`${process.env.APP_PROTHEUS_API_URL}/purchases-grouped`, {
      params: {
        branch: '0101'
      }
    })
      
    // puxar os purchase orders
    const purchaseOrders = await strapi.entityService.findMany('api::purchase-order.purchase-order')

    // juntar os pc do protheus com os purchase orders

    // protheusOrders.forEach((purchaseOrder) => {
    //   // console.log(purchaseOrder.number)
    // })
   

    // retornar tudo junto

    return protheusOrders

 
  },
};