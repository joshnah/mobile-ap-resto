# Documentation du projet

## Objectifs du projet et présentation de l'application

Le but du projet était de développer une application en Node/Express (backend) et ReactNative (frontend), comprenant la gestion de rôles avec des utilisateurs différents ayant des droits différenciés, et l'utilisation d'une API externe. Le tout accompagné de la mise en place de jeux de tests côté backend et de tests fonctionnels avec la technologie Cypress côté frontend.

Pour mener à bien ce projet, nous avons décidé de développer une application de commandes en ligne pour le restaurant FKH (La Fabrik de l'Hambourgeois). L'application comprend 4 pages et est inspirée de ce que peuvent proposer des applications telles que Uber Eats ou Deliveroo. On retrouve une page d'accueil listant l'ensemble des produits regroupés par catégorie (Burgers, Boissons, Frites), une page Panier où l'on peut passer commande, une page commande regroupant toutes les commandes terminées et en cours, et une page regroupant les informations modifiables de l'utilisateur.

## Modèle de données

![Diagramme de base de données](Pictures/DB.png)

La base de données est composée des tables User, Order, Product, OrderProduct et Restaurant.

**User :** un utilisateur est identifié par un *id* unique. Son email doit également être unique à la création. Et seuls les champs *name*, *email*, *passhash* et *isAdmin* sont requis.

**Order :** la table Order contient l'ensemble des commandes. Une commande est identifiée par un *id* unique. L'ensemble des champs sont obligatoires. Le champs *status* est un booléen qui permet de savoir si la commande a été livrée (true) ou non (false).

**Product :** la table Product contient l'ensemble des produits. Un produit est identifié par un *id* unique. Seuls les champs description et image ne sont pas obligatoires. A noter que l'image est stockée comme une chaîne de caractères. Il faut donc renseigner une url d'une image en ligne.

**OrderProduct :** cette table permet de faire l'association entre une commande et les produits qui la composent. Elle permet de maintenir la quantité de chaque produit dans la commande.

**Restaurant :** cette table contient l'ensemble des points de vente de la chaîne de restaurants FKH. Pour le moment, nous n'avons qu'un unique restaurant dans la base. Ainsi toutes les commandes passées sont automatiquement liées à ce restaurant.

## Webservice

Nous avions prévu d'utiliser une API externe permettant de calculer le nombre de calories dans les différents produits proposés. L'API en question : https://api-ninjas.com/api/nutrition

Par manque de temps, nous avons décidé d'opter pour une API d'autocomplétion des adresses postales, utilisée lorsque l'utilisateur modifie son adresse depuis la page des informations utilisateurs. Nous avions deux options :

- L'API Google Places. Le problème : l'API nécessite une clé payante.

- L'API du gouvernement Français https://adresse.data.gouv.fr/api-doc/adresse. Cette dernière ne nécessite pas de clé et le nombre de requêtes est illimité. Cette donc celle-ci que nous avons utilisé.

L'appel à l'API se fait depuis la fonction *autocompleteAddress* du fichier **frontend/src/services/data.service.ts**. Cette fonction est appelée dans le composant **frontend/src/components/UserInfos.tsx** dès lors que l'utilisateur a entré plus de 3 caractères dans le champ Adresse. Le retour de l'appel est parsé dans le composant pour former une liste d'adresses affichées et cliquables pour remplir le champ.

![Diagramme de base de données](Pictures/Autocomplete.png)

## Documentation de l'API côté backend

La documentation est disponible ici : https://fkh-resto.osc-fr1.scalingo.io/doc.