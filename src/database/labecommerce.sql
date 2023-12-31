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

--createUser

INSERT INTO users (id, name, email, password, created_at)
    VALUES
        ('u001','Fulano','fulano@email.com','fulano123', date ('now')),
        ('u002','Beltrana','beltrana@email.com','beltrana00', date ('now')),
        ('u003','Ciclano','ciclano@email.com','ciclo4321', date ('now')),
        ('u004','Dilano','didi@email.com','dii048', date ('now'));

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

--Adiciona-itens-tabela

INSERT INTO products (id, name, price, description, image_url)
    VALUES
        ('prod001','Mouse gamer',250,'Melhor mouse do mundo!', 'https://picsum.photos/seed/Mouse%20gamer/400'),
        ('prod002','Monitor',900,'Monitor LED Full HD 24 polegadas','https://picsum.photos/seed/Monitor/400'),
        ('prod003','Teclado',520,'Teclado mecânico', 'https://cdnx.jumpseller.com/centralgamer/image/9316710/thumb/610/610?1662230966'),
        ('prod004','Teclado gatinho',520,'Miau miau', 'https://ae01.alicdn.com/kf/H6c564e4b8f47413e9a91fe5619378dd9G.jpg_640x640Q90.jpg_.webp'),
        ('prod005','Gabinete',200,'Gabinete gamer', 'https://cdn.awsli.com.br/600x450/404/404053/produto/205902790/gabinete-furia-swpqdg.jpg'),
        ('prod006','Controle gamer',480,'Controle DualShock PS4','https://cdn.awsli.com.br/800x800/2394/2394811/produto/172073866fb2d6142d3.jpg');

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
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

INSERT INTO purchases (id, buyer, total_price, created_at)
    VALUES
        ('prc001', 'u001', 680, datetime('now')),
        ('prc002', 'u002', 700, datetime('now')),
        ('prc003', 'u001', 850, datetime('now'));

--GetPurchases  

SELECT * FROM purchases;

--Deleta-tabela-purchases

DROP TABLE purchases;


--createTable (relação purchases x products)

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

--GetPurchases  

SELECT * FROM purchases_products;

--relação purchases x products

INSERT INTO purchases_products (purchase_id, product_id, quantity)
    VALUES
        ('prc001', 'prod003', 2),
        ('prc002', 'prod002', 5),
        ('prc003', 'prod004', 1);


--Deleta-purchases_products

DROP TABLE purchases_products;