"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = {
    async getProtheusOrders() {
        // puxar os pc(pedido de compras) do protheus
        const { data: protheusOrders } = await axios_1.default.get(`${process.env.APP_PROTHEUS_API_URL}/purchases-grouped`, {
            params: {
                branch: '0101'
            }
        });
        // puxar os purchase orders
        const purchaseOrders = await strapi.entityService.findMany('api::purchase-order.purchase-order');
        const users = await strapi.db
            .query('plugin::users-permissions.user')
            .findMany({
            where: {
                protheusCode: {
                    $null: false
                }
            }
        });
        // juntar os pc do protheus com os purchase orders
        const ordersUpdated = protheusOrders.map((protheusOrder) => {
            let status = 'Aguardando aprovação';
            const purchaseOrder = purchaseOrders.find(purchaseOrder => purchaseOrder.protheusNumber === protheusOrder.number);
            const userOrder = users.find(userOrder => userOrder.protheusCode === protheusOrder.buyer);
            if (userOrder) {
                protheusOrder.buyer = userOrder.name;
            }
            if (protheusOrder.approved === 'yes') {
                status = 'Aguardando envio ao fornecedor';
            }
            if (purchaseOrder && protheusOrder.approved === 'yes') {
                status = purchaseOrder.status;
            }
            const currentDate = new Date();
            const delivery = new Date(protheusOrder.delivery);
            //Atrasado
            if (delivery < currentDate && protheusOrder.approved === 'yes') {
                status = 'Atrasado';
            }
            if (purchaseOrder) {
                return {
                    id: purchaseOrder.id,
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
                id: '',
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
        return ordersUpdated;
    },
    async updatePurchaseOrder(data) {
        // chamar os purchase Orders 
        const purchaseOrder = await strapi.entityService.findOne('api::purchase-order.purchase-order', data.id, {
            fields: ['protheusNumber', 'tags', 'observation', 'status']
        });
        //  console.log(purchaseOrder)
        //  if(data.protheusNumber)
        // data.protheusNumber => tentar achar um purchase
        // se vc achar, vc vai atualizar ele ()
        // se não achar, vc cria um
        // return purchaseOrder
    }
};
