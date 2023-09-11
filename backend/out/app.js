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
const promises_1 = __importDefault(require("fs/promises"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('data'));
const port = 3000;
app.get('/api/pizzas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pizzasData = yield promises_1.default.readFile("./data/pizzascript.json", "utf-8");
    res.send(JSON.parse(pizzasData));
}));
app.post('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer, customername, zipcode, city, street, house, email, phone, date, pizza, pizzaname, piece, price, totalprice } = req.body;
    let newOrder = [];
    newOrder.push({ customer, customername, zipcode, city, street, house, email, phone, pizza, date, pizzaname, piece, price, totalprice });
    yield promises_1.default.writeFile(`./orders/order_${customer.customername}_${date}.json`, JSON.stringify(newOrder), "utf-8");
    res.status(200).json("OK");
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
