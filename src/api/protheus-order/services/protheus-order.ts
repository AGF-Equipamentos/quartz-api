import axios from 'axios'
import purchaseOrder from '../../purchase-order/controllers/purchase-order'


export interface ProtheusOrderServiceProps {
  getProtheusOrders: () => {}
  updatePurchaseOrder: (data: UpdatePurchaseOrderProps) => {}
}

type UpdatePurchaseOrderProps = {
  protheusNumber: string
  tags: string
  observation: string
  status: string
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

type UserOrder = {
  id: number
  username: string 
  email: string
  provider: string
  password: string
  resetPasswordToken: null
  confirmationToken: null
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  name: string
  protheusCode: string
}

export default { 
  async getProtheusOrders() { 

    // puxar os pc(pedido de compras) do protheus
    const { data: protheusOrders } = await axios.get<ProtheusOrder[]>(`${process.env.APP_PROTHEUS_API_URL}/purchases-grouped`, {
      params: {
        branch: '0101'
      }
    })

      
    // puxar os purchase orders
    const purchaseOrders: PurchaseOrder[] = await strapi.entityService.findMany('api::purchase-order.purchase-order')
      

      const users: UserOrder[]  = await strapi.db
      .query('plugin::users-permissions.user')
      .findMany({
        where: {
          protheusCode: {
            $null: false 
          }
        }
      })


    // juntar os pc do protheus com os purchase orders
      const ordersUpdated = protheusOrders.map((protheusOrder) => {
      let status = 'Aguardando aprovação'
      const purchaseOrder = purchaseOrders.find(purchaseOrder => purchaseOrder.protheusNumber === protheusOrder.number)
      const userOrder = users.find( userOrder => userOrder.protheusCode === protheusOrder.buyer)
          // console.log(purchaseOrders)
      // console.log(users)
      if(userOrder) {
        protheusOrder.buyer = userOrder.name
      }
      
      if(protheusOrder.approved === 'yes'){
        status = 'Aguardando envio ao fornecedor'
      }

      if(purchaseOrder && protheusOrder.approved === 'yes'){
        status = purchaseOrder.status
      }

      const currentDate = new Date()

      const delivery = new Date(protheusOrder.delivery)
      
      //Atrasado
      if(delivery < currentDate && protheusOrder.approved === 'yes' ) {
        status = 'Atrasado'
      }

      if(purchaseOrder) {
       
        return {
          number: protheusOrder.number,
          provider: protheusOrder.provider,
          tags: purchaseOrder.tags,
          observation: purchaseOrder.observation,
          delivery: protheusOrder.delivery,
          status: status,
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
        status: status,
        buyer: protheusOrder.buyer,
        approved: protheusOrder.approved
      } 
       
    })
   
    return ordersUpdated
  },

  async updatePurchaseOrder(data: UpdatePurchaseOrderProps) {
  
   
    // chamar os purchase Orders
   
    const purchaseOrder: PurchaseOrder = await strapi.entityService.findOne('api::purchase-order.purchase-order', {
      fields: ['tags', 'observation', 'protheusNumber', 'status']
    }) 


   // console.log(purchaseOrder)
    // const purchaseOrder: PurchaseOrder[] = await strapi.entityService.findMany('api::purchase-order.purchase-order',{
    //   fields: ['tags', 'observation', 'protheusNumber', 'status']
    // }) 
    // const purchase = purchaseOrder.map((purchase) => {
    //   if(data.protheusNumber === purchase.protheusNumber){
    //     return {
    //       tags: data.tags,
    //       observation: data.observation,
    //       status:  data.status,
    //     }      
    //   }
    
    // })
      // data.protheusNumber => tentar achar um purchase
    // se vc achar, vc vai atualizar ele ()
    // se não achar, vc cria um

    //  return purchase
    
  }
};