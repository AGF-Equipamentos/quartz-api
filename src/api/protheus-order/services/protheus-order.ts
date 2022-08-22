import axios from 'axios'

export interface ProtheusOrderServiceProps {
  getProtheusOrders: () => {}

}

export default { 
  async getProtheusOrders(ctx, next ) { 

    // puxar os pc(pedido de compras) do protheus

 

    // puxar os purchase orders
    // Fazer igula está no exemplo
    const protheus = await strapi.entityService.findMany()

    // juntar os pc do protheus com os purchase orders

    // retornar tudo junto

    return { service: true}
  },
};