export default {
  async index(ctx, next) { // called by GET /hello
    console.log(ctx.params)
    console.log(ctx.query)
    console.log(ctx.body)
    console.log(ctx.request.body)
    // ctx.body = 'Hello World!'; // we could also send a JSON
    const entity = await strapi.service('api::protheus-order.protheus-order').getProtheusOrders()

    return entity
  },
  async update(ctx, next) {
   const { body } = ctx.request

   const entity = await strapi.service('api::protheus-order.protheus-order').updatePurchaseOrder(body)

    return entity
  }
};
