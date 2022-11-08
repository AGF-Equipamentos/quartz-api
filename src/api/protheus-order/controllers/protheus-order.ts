export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async index(ctx, next) {
    const entity = await strapi
      .service('api::protheus-order.protheus-order')
      .getProtheusOrders()

    return entity
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(ctx, next) {
    const { body } = ctx.request

    const entity = await strapi
      .service('api::protheus-order.protheus-order')
      .updatePurchaseOrder(body)

    return entity
  }
}
