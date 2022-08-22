module.exports = {
    async index(ctx, next) {
        ctx.body = 'Hello World!'; // we could also send a JSON
    },
};
