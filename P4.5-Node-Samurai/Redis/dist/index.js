"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ioredis_1 = __importDefault(require("ioredis"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const redis = new ioredis_1.default({ host: 'localhost', port: 6379 });
// rate limiter using redis
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `rate-limiter`; //rate-limiter-userId
        const value = yield redis.get(key);
        if (value === null) {
            yield redis.set(key, 0);
            yield redis.expire(key, 60);
        }
        if (Number(value) > 10) {
            res.status(429).json({ message: "Too Many Requests" });
            return;
        }
        yield redis.incr(key);
        next();
        return;
    });
});
app.get('/', (req, res) => {
    res.send("Hello from TS + Redis backend");
    return;
});
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const responce = yield axios_1.default.get('https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=30');
    res.json({ products: responce.data.data.data });
    return;
}));
app.get('/totalPrice', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chchedValue = yield redis.get("totalProductPrice");
    if (chchedValue) {
        console.log(`cache hit`);
        res.json({ totalPrice: chchedValue });
        return;
    }
    const responce = yield axios_1.default.get('https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=30');
    const totalPrice = responce.data.data.data.reduce((acc, curr) => curr.price + acc, 0);
    yield redis.set("totalProductPrice", totalPrice);
    console.log(`cache miss`);
    res.json({ totalPrice });
    return;
}));
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});
