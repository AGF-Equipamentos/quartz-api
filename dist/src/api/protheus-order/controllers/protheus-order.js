"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async index(ctx, next) {
        console.log(ctx.params);
        console.log(ctx.query);
        console.log(ctx.body);
        console.log(ctx.request.body);
        // ctx.body = 'Hello World!'; // we could also send a JSON
        const entity = await strapi.service('api::protheus-order.protheus-order').getProtheusOrders();
        return entity;
    },
    async update(ctx, next) {
        //  const purchaseOrder = await strapi.entityService.findMany('api::purchase-order.purchase-order', {
        //   fields: ['protheusNumber', 'tags', 'observation', 'status']
        //  })
        return { ok: true };
    }
};
