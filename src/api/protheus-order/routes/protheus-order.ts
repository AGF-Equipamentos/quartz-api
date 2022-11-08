export default {
  routes: [
    {
      method: 'GET',
      path: '/protheus-order',
      handler: 'protheus-order.index',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'PUT',
      path: '/protheus-order',
      handler: 'protheus-order.update',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
}
