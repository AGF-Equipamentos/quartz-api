export default {
  async index(ctx, next) {
    console.log(ctx.params)
    console.log(ctx.query)
    console.log(ctx.body)
    console.log(ctx.request.body)
    const entity = await strapi.service('api::protheus-order.protheus-order').getProtheusOrders()

    return entity
  },
  async update(ctx, next) {
   const { body } = ctx.request

   const entity = await strapi.service('api::protheus-order.protheus-order').updatePurchaseOrder(body)

    return entity
  }
};
