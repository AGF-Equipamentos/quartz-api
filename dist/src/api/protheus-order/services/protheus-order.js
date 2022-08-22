"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = {
    async getProtheusOrders(ctx, next) {
        // puxar os pc(pedido de compras) do protheus
        const protheus = await strapi.entityService.findMany((0, axios_1.default)(`${process.env.APP_PROTHEUS_API_UR}/purchases-grouped`));
        // puxar os purchase orders
        // juntar os pc do protheus com os purchase orders
        // retornar tudo junto
        return { service: true };
    },
};
