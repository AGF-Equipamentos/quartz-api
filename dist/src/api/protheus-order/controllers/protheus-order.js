"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async index(ctx, next) {
        const entity = await strapi.service('api::protheus-order.protheus-order').getProtheusOrders();
        return entity;
    },
    async update(ctx, next) {
        const { body } = ctx.request;
        const entity = await strapi.service('api::protheus-order.protheus-order').updatePurchaseOrder(body);
        return entity;
    }
};
