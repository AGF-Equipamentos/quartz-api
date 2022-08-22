export default {
  routes: [
    {
      method: 'GET',
      path: '/protheus-order',
      handler: 'protheus-order.index',
      config: {
          policies: [],
          middlewares: [],
      }
    }
  ]
}
 