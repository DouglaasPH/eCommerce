
---

# 📌 Ecommerce

Este projeto tem o potencial de expandir e tornar mais acessíveis pequenas lojas de roupas femininas, proporcionando uma experiência de compra mais fluida e eficiente para os clientes. O objetivo é criar uma plataforma completa que inclua funcionalidades essenciais para a gestão de produtos, pedidos e pagamentos. Embora algumas funcionalidades ainda estejam pendentes, como autenticação e integração com gateways de pagamento, este projeto está em desenvolvimento contínuo.

## Funcionalidades Pendentes ❌
- [ ] Autenticação via Google/Gmail
- [ ] Envio de e-mail de confirmação para redefinição de senha
- [ ] Gestão de frete
- [ ] Integração com pagamentos via Pix e cartão
- [ ] Responsividade para tablets

A intenção é melhorar essas funcionalidades e garantir uma plataforma mais robusta e segura para lojas de roupas femininas de pequeno porte.

---

## 🚀 Tecnologias Utilizadas  
- [ ] Vite  
- [ ] TypeScript  
- [ ] Angular  
- [ ] Axios  
- [ ] SCSS  
- [ ] JavaScript  
- [ ] Node.js  
- [ ] Express  
- [ ] MySQL  
- [ ] CORS  
- [ ] JSON Web Token (JWT)  
- [ ] Cookie-Parser  
- [ ] dotenv  

---

## 📦 Instalação  

### 1. Clonar o repositório  
```bash
git clone https://github.com/DouglaasPH/eCommerce.git
```

### 2. Acessar a pasta do projeto  
```bash
cd eCommerce
```

### 3. Instalar as dependências  
```bash
npm install
```

---

## 🛠 Como Usar  

### 1. Iniciar o Frontend  
A partir da pasta `frontend`, execute o seguinte comando para iniciar o servidor do frontend:
```bash
cd frontend
npm run start
```

### 2. Iniciar o Backend  
A partir da pasta `backend`, execute o seguinte comando para iniciar o servidor do backend:
```bash
cd backend
npm run dev
```

---

## 🗂 Banco de Dados

### Criar Database
```sql
CREATE DATABASE eCommerce;
USE eCommerce;
```

### Estrutura do Banco de Dados

#### Tabela `users`:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(100),
    password VARCHAR(100),
    address JSON NOT NULL,
    gender ENUM('man','woman','others','do not specify'),
    cpf VARCHAR(14) NOT NULL,
    date_of_birth DATE,
    favorites JSON NOT NULL
);
```

#### Tabela `cart_items`:
```sql
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    size VARCHAR(2) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Tabela `coupons`:
```sql
CREATE TABLE coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coupon_code VARCHAR(50) NOT NULL,
    discount INT NOT NULL,
    quantity_available INT NOT NULL
);
```

#### Tabela `installment`:
```sql
CREATE TABLE installment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    min_value DECIMAL(10,2),
    max_value_without_fees DECIMAL(10,2),
    max_installments_without_fees INT,
    max_quantity_installments INT,
    fees DECIMAL(5,2) DEFAULT 0.00
);
```

#### Tabela `orders`:
```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('Pending','Order received','Sent to the carrier','Received by the carrier','Goods in transit','Order delivered','Delayed order','Canceled order') NOT NULL DEFAULT 'Pending',
    address JSON NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    shipping_price INT DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0.00,
    total DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    coupon_applied VARCHAR(50),
    status_history JSON NOT NULL DEFAULT '[]',
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Tabela `order_items`:
```sql
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    size VARCHAR(3) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

#### Tabela `payments`:
```sql
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method ENUM('card','ticket','pix') NOT NULL,
    status ENUM('pending','approved','refused') DEFAULT 'approved',
    transaction_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

#### Tabela `sale_items`:
```sql
CREATE TABLE sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(200) NOT NULL,
    mark VARCHAR(50) NOT NULL,
    size_by_quantity JSON NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    discount_percentage INT DEFAULT 0,
    number_of_interest_free_installments INT NOT NULL,
    images_path JSON,
    filters JSON NOT NULL
);
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias, como por exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=eCommerce

GOOGLE_CLIENT_ID=seu_client_id_google
PIX_KEY=chave_pix
JWT_SECRET=seu_segredo_jwt
```

---

## 💡 Contribuição

Sinta-se à vontade para contribuir com este projeto! Se você deseja melhorar alguma parte do código ou corrigir um bug, faça um fork do repositório, crie uma branch, e envie um pull request.

---