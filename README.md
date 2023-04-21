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


Token admin : eyJhbGciOiJIUzI1NiJ9.U2ViYXN0aWVuLlZpYXJkb3RAZ3Jlbm9ibGUtaW5wLmZy.HyL1rkJZ9HAK9EHga37067JcjKHNcfr5h0xwCB6n08I