# Documentation du projet
- Nom: FKH
- fonctionnalités de base
  - Client:
    - Gestion commandes -> Paiement simple
  - Restaurateur: 
    - Modifier les produits 


- Entités: user, produit, commande
- DB: modele relationnel
- backend frontend




User:
-  userId, firstName, lastName, email, phone, address, password, isAdmin
Product:
- productId, productName, type, price, description, image
Order:
- orderId, userId, status, date 
orderProduct:
- quantity
Restaurant:
- restaurantId, name, address, phone, email

