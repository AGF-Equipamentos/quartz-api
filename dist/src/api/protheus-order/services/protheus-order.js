"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = {
    async getProtheusOrders() {
        const { data: protheusOrders } = await axios_1.default.get(`${process.env.APP_PROTHEUS_API_URL}/purchases-grouped`, {
            params: {
                branch: '0101'
            }
        });
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
        const ordersUpdated = protheusOrders.map((protheusOrder) => {
            let status = 'Aguardando aprovação';
            const purchaseOrder = purchaseOrders.find((purchaseOrder) => purchaseOrder.protheusNumber === protheusOrder.number);
            const userOrder = users.find((userOrder) => userOrder.protheusCode === protheusOrder.buyer);
            if (userOrder) {
                protheusOrder.buyer = userOrder.name;
            }
            if (protheusOrder.approved === 'yes') {
                status = 'Aguardando envio ao fornecedor';
                if (purchaseOrder && protheusOrder.approved === 'yes') {
                    status = purchaseOrder.status;
                }
                const currentDate = new Date();
                const delivery = new Date(protheusOrder.delivery);
                if (delivery < currentDate && (purchaseOrder === null || purchaseOrder === void 0 ? void 0 : purchaseOrder.status) === 'Confirmado') {
                    status = 'Atrasado';
                }
            }
            if (purchaseOrder) {
                return {
                    id: purchaseOrder.id,
                    number: protheusOrder.number,
                    provider: protheusOrder.provider,
                    tags: purchaseOrder.tags,
                    observation: purchaseOrder.observation,
                    delivery: protheusOrder.delivery.slice(0, -1),
                    status: status,
                    buyer: protheusOrder.buyer,
                    approved: protheusOrder.approved
                };
            }
            return {
                id: null,
                number: protheusOrder.number,
                provider: protheusOrder.provider,
                tags: '',
                observation: '',
                delivery: protheusOrder.delivery.slice(0, -1),
                status: status,
                buyer: protheusOrder.buyer,
                approved: protheusOrder.approved
            };
        });
        return ordersUpdated;
    },
    async updatePurchaseOrder(data) {
        if (data.id) {
            const purchaseUpdate = await strapi.entityService.update('api::purchase-order.purchase-order', data.id, {
                data: {
                    tags: data.tags,
                    observation: data.observation,
                    status: data.status
                },
                fields: ['id', 'protheusNumber', 'tags', 'observation', 'status']
            });
            return purchaseUpdate;
        }
        else {
            const purchaseCreate = await strapi.entityService.create('api::purchase-order.purchase-order', {
                data: {
                    protheusNumber: data.protheusNumber,
                    tags: data.tags,
                    observation: data.observation,
                    status: data.status
                },
                fields: ['id', 'protheusNumber', 'tags', 'observation', 'status']
            });
            return purchaseCreate;
        }
    }
};
