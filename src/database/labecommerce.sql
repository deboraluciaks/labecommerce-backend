-- Active: 1689010251379@@127.0.0.1@3306

--USERS

--Cria tabela

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

--GetAllUsers

SELECT * FROM users;

--Retorna-estrutura-tabela

PRAGMA table_info('users');

--createUser

INSERT INTO users (id, name, email, password, created_at)
    VALUES
        ('u001','Fulano','fulano@email.com','fulano123', date ('now')),
        ('u002','Beltrana','beltrana@email.com','beltrana00', date ('now')),
        ('u003','Ciclano','ciclano@email.com','ciclo4321', date ('now'));

--E

--editUserById

UPDATE users
SET email = 'fulano1990@email.com'
WHERE id = 'u001';

--deleteUserById

DELETE FROM users
WHERE id = 'u001';

--Deleta-tabela

DROP TABLE users;



--PRODUCTS

--Cria tabela
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

--getAllProducts

SELECT * FROM products;

--getProductsById

SELECT * FROM products
WHERE id = 'prod003';


--getProductsByName

SELECT * FROM products
WHERE name LIKE '%gamer%';

--Retorna-estrutura-tabela

PRAGMA table_info('products');

--Adiciona-itens-tabela

INSERT INTO products (id, name, price, description, image_url)
    VALUES
        ('prod001','Mouse gamer',250,'Melhor mouse do mundo!', 'https://picsum.photos/seed/Mouse%20gamer/400'),
        ('prod002','Monitor',900,'Monitor LED Full HD 24 polegadas','https://picsum.photos/seed/Monitor/400'),
        ('prod003','Teclado',520,'Teclado mecânico', 'https://cdnx.jumpseller.com/centralgamer/image/9316710/thumb/610/610?1662230966'),
        ('prod004','Gabinete',200,'Gabinete gamer', 'https://cdn.awsli.com.br/600x450/404/404053/produto/205902790/gabinete-furia-swpqdg.jpg'),
        ('prod005','Controle gamer',480,'Controle DualShock PS4','https://cdn.awsli.com.br/800x800/2394/2394811/produto/172073866fb2d6142d3.jpg');

--editProductById

UPDATE products
SET price = 300
WHERE id = 'prod002';

UPDATE products
SET 
    id = 'prodteste',
    name = 'teste',
    price = 300,
    description = 'testando edição do produto',
    image_url = 'https://cdn.awsli.com.br/600x450/404/404053/produto/205902790/gabinete-furia-swpqdg.jpg'
WHERE id = 'prod001';

--deleteProductById

DELETE FROM products
WHERE id = 'prod001';

--Deleta-tabela-products

DROP TABLE products;


--PEDIDOS

--Cria tabela
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

INSERT INTO purchases (id, buyer, total_price, created_at)
    VALUES
        ('prc001', 'u001', 680, datetime('now')),
        ('prc002', 'u002', 700, datetime('now')),
        ('prc003', 'u003', 850, datetime('now'));

--GetPurchases  

SELECT * FROM purchases;

--JOIN purchases X users

SELECT
    purchases.id,
    purchases.buyer,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at
FROM users
INNER JOIN purchases
ON purchases.buyer = users.id;

--edit-purchase

UPDATE purchases
SET 
    total_price = 780
WHERE id = 'prc001';

--Deleta-tabela-purchases

DROP TABLE purchases;