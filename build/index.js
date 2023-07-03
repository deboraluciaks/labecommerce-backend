"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = void 0;
const database_1 = require("./database");
function createUser() {
    const newUser = {
        id: "u003",
        name: "Astrodev",
        email: "astrodev@email.com",
        password: "astrodev99",
        createdAt: new Date().toISOString()
    };
    database_1.users.push(newUser);
    return (console.log("Cadastro realizado com sucesso"));
}
exports.createUser = createUser;
function getAllUsers() {
    return (console.log(database_1.users));
}
exports.getAllUsers = getAllUsers;
function createProduct() {
    const newProduct = {
        id: "prod003",
        name: "SSD gamer",
        price: 349.99,
        description: "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
        imageUrl: "https://www.amazon.com.br/Samsung-S%C3%A9rie-970-EVO-Plus/dp/B07MFZXR1B"
    };
    database_1.products.push(newProduct);
    return (console.log("Produto adicionado com sucesso"));
}
exports.createProduct = createProduct;
function getAllProducts() {
    return (console.log(database_1.products));
}
exports.getAllProducts = getAllProducts;
const searchProductsByName = (name) => {
    const result = database_1.products.filter((product => {
        return product.name.toLowerCase().includes(name);
    }));
    return (result);
};
exports.searchProductsByName = searchProductsByName;
console.table((0, exports.searchProductsByName)("monitor"));
//# sourceMappingURL=index.js.map