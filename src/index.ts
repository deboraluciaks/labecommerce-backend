import { products, users } from "./database";
import { TProducts, TUsers } from "./types";
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//teste

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});


export const getAllUsers = () => {
    
    return (users)
}


export function getAllProducts(){

    return (products)
}


export const createUser = (id: string, name: string, email: string, password: string) => {
    const newUser:TUsers =  {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    }

    users.push(newUser)      

    return ("Cadastro realizado com sucesso!")
}


export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string) => {
    const newProduct:TProducts =  {
        id,
        name,
        price,
        description,
        imageUrl
    }
    

    products.push(newProduct)      

    return ("Produto adicionado com sucesso!")
}



export const searchProductsByName = (name: string)  => {

    const result = products.filter((product => {
        return product.name.toLowerCase().includes(name.toLowerCase())
    }))

    return(result)

}


//API


app.get("/users", (req: Request, res: Response) => {
    try {

        res.status(200).send(users);
        
    } catch (error) {

        res.status(404).send(error);
        console.log(error)
        
    }

});



app.get("/products", (req: Request, res: Response) => {

    try {
        const findName = req.query.name as string

        if (findName) {
            
            if (findName.length < 2){
                res.status(404)
                throw new Error ("Digite mais de uma letra!")
            }
            
            const result = searchProductsByName(findName)

            if(result.length === 0){
                res.status(404)
                throw new Error ("Produto não encontrado.")
            }

            res.status(200).send(result);
            
        } else{
            res.status(200).send(products);
        }
    
    } catch (error) {
        res.send(error.message);
        console.log(error)
    } 
    
});


app.post("/users", (req: Request, res: Response) => {

    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if(!id || !name || !email || !password){
            res.status(404)
            throw new Error ("Digite todos os campos.")
        }

        const newId = users.find((user) => user.id === id)

        if(newId){
            res.status(404)
            throw new Error ("Esse usuário ja existe!")
        }

        const newEmail = users.find((user) => user.email === email)

        if(newEmail){
            res.status(404)
            throw new Error ("Esse email ja existe!")
        }

        const result = createUser(id, name, email, password)
    
        res.status(201).send(result);

    } catch (error) {
        res.send(error.message);
        console.log(error)
    }


});

app.post("/product", (req: Request, res: Response) => {
    const id = req.body.id as string
	const name = req.body.name as string
	const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string


    const result = createProduct(id, name, price, description, imageUrl)

    res.status(201).send(result);

});


app.delete("/users/:id", (req: Request, res: Response) => {

    try {
        const userDelete = req.params.id
        const userIndex = users.findIndex((user) => user.id === userDelete)

        if(userIndex < 0) {
            res.status(404)
            throw new Error ("Usuário não encontrado.")
        } 

        users.splice(userIndex, 1)

        res.status(200).send("Usuário apagado com sucesso.")
        
    } catch (error) {
        res.send(error.message);
        console.log(error)        
    }
    
})

app.delete("/products/:id", (req: Request, res: Response) => {

    try {
        const prodDelete = req.params.id
        const prodIndex = products.findIndex((product) => product.id === prodDelete)

        if(prodIndex < 0) {
            res.status(404)
            throw new Error ("Produto não encontrado")
        }

        products.splice(prodIndex, 1)

        res.status(200).send("Produto apagado com sucesso")

    } catch (error) {
        res.send(error.message);
        console.log(error)        
    }

})

app.put("/products/:id", (req: Request, res: Response) => {

    try {
        const idProd = req.params.id
        const productFind = products.find((product) => product.id === idProd)

        if(!productFind){
            res.status(404)
            throw new Error ("Produto não encontrado")
        }

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDesc = req.body.description as string | undefined
        const newImage = req.body.imageUrl as string | undefined


        if(isNaN(newPrice)){
            res.status(400)
            throw new Error ("Digite um valor valido para preço!")
        }


        if(newId || newName || newPrice || newDesc || newImage){
            productFind.id = newId || productFind.id
            productFind.name = newName || productFind.name
            productFind.price = newPrice || productFind.price
            productFind.description = newDesc || productFind.description
            productFind.imageUrl = newImage || productFind.imageUrl
        
            res.status(200).send("Produto atualizado com sucesso.")
        }

        
    } catch (error) {
        res.send(error.message);
        console.log(error)
    }

})