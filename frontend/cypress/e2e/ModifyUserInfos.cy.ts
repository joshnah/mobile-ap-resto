const email = 'test@test.test';
const userName = 'test';
const password = 'test';
const newPassword = 'mdp1234';
const phone = '0605040302';
const address = 'Boulevard Maréchal Leclerc 38000 Grenoble';
const addressButton = 'Choisir une nouvelle adresse';
const saveButton = 'Enregistrer les modifications';
const savePasswordButton = 'Modifier le mot de passe';

describe('UserInfos', () => {
  it('modify user infos scenario', () => {
    // Simulation de la connexion
    cy.intercept('POST', '/login', {
      status: true,
      message: 'Login/Password ok',
      user: { name: userName, email: email },
    });

    // Simulation de la modification des infos du user
    cy.intercept('PUT', '/api/users', {
      status: true,
      message: 'Informations mises à jour',
      user: { name: userName },
    });

    // On accède à l'appli
    cy.visit('/');
    // On renseigne email et password pour débloquer le bouton de connexion
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=connect-button]').click();
    // On vérifie que le store contienne le bon état
    cy.window()
      .its('store')
      .invoke('getState')
      .its('auth')
      .should('deep.equal', {
        isLoggedIn: true,
        user: { name: userName, email: email },
        hasChanged: false,
        pwdChanged: false,
        registered: false,
        newAddress: null
      });

    // On se rend sur la page UserInfos
    cy.get('a[href="/Home/Infos"]').should('be.visible').click();

    // On vérifie que le bouton d'enregistrement des modifications est disabled par défaut
    cy.contains(saveButton).parent().should('have.attr', 'aria-disabled');

    // On vérifie que le bouton d'enregistrement du mot de passe est disabled par défaut
    cy.contains(savePasswordButton).parent().should('have.attr', 'aria-disabled');
    
    // On vérifie que le nom est bien renseigné dans le champ Nom
    cy.get('input[placeholder="Nom"]').should('have.value', userName);

    // On vérifie que l'email est bien renseigné dans le champ Email
    cy.get('input[placeholder="Email"]').should('have.value', email);

    // On ajounte un numéro de téléphone
    cy.get('input[placeholder="Téléphone"]').type(phone);

    // On clique sur le bouton pour changer d'adresse
    cy.contains(addressButton).click();
    // On renseigne une nouvelle adresse
    cy.get('input[placeholder="Adresse"]').type(address);
    // On valide
    cy.contains('Valider').click();

    // On enregistre les modifications
    cy.contains(saveButton).click();

    // On vérifie que le bouton d'enregistrement est retourné dans un état disabled
    cy.contains(saveButton).parent().should('have.attr', 'aria-disabled');

    // On ajoute un nouveau mot de passe
    cy.get('input[placeholder="Nouveau Mot de Passe"]').type(password);
    // On confirme ce nouveau mot de passe
    cy.get('input[placeholder="Confirmer le nouveau Mot de Passe"]').type(password);

    // On enregistre la modification de mot de passe
    cy.contains(savePasswordButton).click();

    // On vérifie que le bouton de modification du mot de passe est retourné dans un état disabled
    cy.contains(savePasswordButton).parent().should('have.attr', 'aria-disabled');

    // On se déconnecte
    cy.contains('Se déconnecter').click();
  });
});
