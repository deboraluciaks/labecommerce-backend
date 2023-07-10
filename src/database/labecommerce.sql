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

--Retorna-itens-tabela

SELECT * FROM users;

--Retorna-estrutura-tabela

PRAGMA table_info('users');

--Adiciona-itens-tabela

INSERT INTO users (id, name, email, password, created_at)
    VALUES
        ('u001','Fulano','fulano@email.com','fulano123', date ('now')),
        ('u002','Beltrana','beltrana@email.com','beltrana00', date ('now')),
        ('u003','Ciclano','ciclano@email.com','ciclo4321', date ('now'));

--Edit-user

UPDATE users
SET email = 'fulano1990@email.com'
WHERE id = 'u001';

--Deleta-user-tabela

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

--Retorna-itens-tabela

SELECT * FROM products;

--Retorna-estrutura-tabela

PRAGMA table_info('products');

--Adiciona-itens-tabela

INSERT INTO products (id, name, price, description, image_url)
    VALUES
        ('prod001','Mouse gamer',250,'Melhor mouse do mundo!', 'https://picsum.photos/seed/Mouse%20gamer/400'),
        ('prod002','Monitor',900,'Monitor LED Full HD 24 polegadas','https://picsum.photos/seed/Monitor/400'),
        ('prod003','Teclado',520,'Teclado mecânico', 'https://cdnx.jumpseller.com/centralgamer/image/9316710/thumb/610/610?1662230966'),
        ('prod004','Gabinete',200,'Gabinete gamer', 'https://cdn.awsli.com.br/600x450/404/404053/produto/205902790/gabinete-furia-swpqdg.jpg'),
        ('prod005','Controle',480,'Controle DualShock PS4','https://cdn.awsli.com.br/800x800/2394/2394811/produto/172073866fb2d6142d3.jpg');

--Edit-product

UPDATE products
SET price = 300
WHERE id = 'prod001';

--Deleta-product-tabela

DELETE FROM products
WHERE id = 'prod001';

--Deleta-tabela

DROP TABLE products;
