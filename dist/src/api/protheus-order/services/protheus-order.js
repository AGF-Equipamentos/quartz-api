"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = {
    async getProtheusOrders(ctx, next) {
        // puxar os pc(pedido de compras) do protheus
        const { data: protheusOrders } = await axios_1.default.get(`${process.env.APP_PROTHEUS_API_URL}/purchases-grouped`, {
            params: {
                branch: '0101'
            }
        });
        // puxar os purchase orders
        const purchaseOrders = await strapi.entityService.findMany('api::purchase-order.purchase-order');
        // juntar os pc do protheus com os purchase orders
        const ordersUpdated = protheusOrders.map((protheusOrder) => {
            let status = 'Aguardando aprovação';
            const purchaseOrder = purchaseOrders.find(purchaseOrder => purchaseOrder.protheusNumber === protheusOrder.number);
            if (protheusOrder.approved === 'yes') {
                status = 'Aguardando envio ao fornecedor';
            }
            if (purchaseOrder && protheusOrder.approved === 'yes') {
                status = purchaseOrder.status;
            }
            //Atrasado
            // if(protheusOrder.delivery > Date.now() && protheusOrder.approved === 'yes') {
            //   status = 'Atrasado'
            // }
            if (purchaseOrder) {
                return {
                    number: protheusOrder.number,
                    provider: protheusOrder.provider,
                    tags: purchaseOrder.tags,
                    observation: purchaseOrder.observation,
                    delivery: protheusOrder.delivery,
                    status: status,
                    buyer: protheusOrder.buyer,
                    approved: protheusOrder.approved
                };
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
            };
        });
        //  console.log(ordersUpdated)
        return ordersUpdated;
    },
};
