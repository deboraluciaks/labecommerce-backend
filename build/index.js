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
exports.searchProductsByName = exports.createProduct = exports.createUser = exports.getAllProd = exports.getAllUsers = void 0;
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
const getAllUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        const [result] = yield (0, knex_1.db)('users')
            .select()
            .where({ id: id });
        return (result);
    }
    const result = yield knex_1.db.select("*").from("users");
    return (result);
});
exports.getAllUsers = getAllUsers;
const getAllProd = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield knex_1.db.select("*").from("products");
    return (result);
});
exports.getAllProd = getAllProd;
const createUser = (id, name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex_1.db.insert({
        id: id,
        name: name,
        email: email,
        password: password
    }).into("users");
    return ("Cadastro realizado com sucesso!");
});
exports.createUser = createUser;
const createProduct = (id, name, price, description, image_url) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex_1.db.insert({
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: image_url
    }).into("products");
    return ("Produto adicionado com sucesso!");
});
exports.createProduct = createProduct;
const searchProductsByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, knex_1.db)('products')
        .select()
        .where("name", "LIKE", `%${name}%`);
    return (result);
});
exports.searchProductsByName = searchProductsByName;
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, exports.getAllUsers)();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(404).send(error);
        console.log(error);
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findName = req.query.name;
        if (findName) {
            if (findName.length < 2) {
                res.status(404);
                throw new Error("Digite mais de uma letra!");
            }
            const result = yield (0, exports.searchProductsByName)(findName);
            if (result.length === 0) {
                res.status(404);
                throw new Error("Produto não existe na lista!");
            }
            if (!result) {
                res.status(500);
                throw new Error("Erro do servidor.");
            }
            res.status(200).send(result);
        }
        else {
            const result = (0, exports.getAllProd)();
            res.status(200).send(result);
        }
    }
    catch (error) {
        res.send(error.message);
        console.log(error);
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (!id || !name || !email || !password) {
            res.status(404);
            throw new Error("Digite todos os campos.");
        }
        const newId = yield (0, exports.getAllUsers)();
        console.log(newId);
        if (newId) {
            res.status(404);
            throw new Error("Esse usuário ja existe!");
        }
        const newEmail = database_1.users.find((user) => user.email === email);
        if (newEmail) {
            res.status(404);
            throw new Error("Esse email ja existe!");
        }
        const result = (0, exports.createUser)(id, name, email, password);
        res.status(201).send(result);
    }
    catch (error) {
        res.send(error.message);
        console.log(error);
    }
}));
app.post("/product", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const result = (0, exports.createProduct)(id, name, price, description, imageUrl);
    res.status(201).send(result);
});
app.delete("/users/:id", (req, res) => {
    try {
        const userDelete = req.params.id;
        const userIndex = database_1.users.findIndex((user) => user.id === userDelete);
        if (userIndex < 0) {
            res.status(404);
            throw new Error("Usuário não encontrado.");
        }
        database_1.users.splice(userIndex, 1);
        res.status(200).send("Usuário apagado com sucesso.");
    }
    catch (error) {
        res.send(error.message);
        console.log(error);
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const prodDelete = req.params.id;
        const prodIndex = database_1.products.findIndex((product) => product.id === prodDelete);
        if (prodIndex < 0) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        database_1.products.splice(prodIndex, 1);
        res.status(200).send("Produto apagado com sucesso");
    }
    catch (error) {
        res.send(error.message);
        console.log(error);
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const idProd = req.params.id;
        const productFind = database_1.products.find((product) => product.id === idProd);
        if (!productFind) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDesc = req.body.description;
        const newImage = req.body.imageUrl;
        if (isNaN(newPrice)) {
            res.status(400);
            throw new Error("Digite um valor valido para preço!");
        }
        if (newId || newName || newPrice || newDesc || newImage) {
            productFind.id = newId || productFind.id;
            productFind.name = newName || productFind.name;
            productFind.price = newPrice || productFind.price;
            productFind.description = newDesc || productFind.description;
            productFind.imageUrl = newImage || productFind.imageUrl;
            res.status(200).send("Produto atualizado com sucesso.");
        }
    }
    catch (error) {
        res.send(error.message);
        console.log(error);
    }
});
//# sourceMappingURL=index.js.map