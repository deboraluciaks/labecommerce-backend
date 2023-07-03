import { products, users } from "./database";
import { TProducts, TUsers } from "./types";

export function createUser(){
    const newUser:TUsers =  {
        id: "u003",
        name: "Astrodev",
        email: "astrodev@email.com",
        password: "astrodev99",
        createdAt: new Date().toISOString()
    }

    users.push(newUser)      

    return (
        console.log("Cadastro realizado com sucesso")
    )
}

export function getAllUsers(){

    return (
        console.log(users)
    )
}

export function createProduct(){
    const newProduct:TProducts =  {
        id: "prod003",
        name: "SSD gamer",
        price: 349.99,
        description: "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
        imageUrl: "https://www.amazon.com.br/Samsung-S%C3%A9rie-970-EVO-Plus/dp/B07MFZXR1B"
    }

    products.push(newProduct)      

    return (
        console.log("Produto adicionado com sucesso")
    )
}

export function getAllProducts(){

    return (
        console.log(products)
    )
}

export const searchProductsByName = (name: string)  => {

    const result = products.filter((product => {
        return product.name.toLowerCase().includes(name)
    }))

    return(result)

}


console.table(searchProductsByName("monitor"))
