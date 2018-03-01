module.exports = {
  jeu: {
    joueurs: [
        {'id': '1', 'sigle': 'x', 'color': "#FF0000", 'pseudo': ''},
        {'id': '2', 'sigle': 'o', 'color': "#0078ff", 'pseudo': ''}
    ],
    plateau : [],
    prochainJoueur: '1',
    etat: '0'
  },

  buildJeu: function(nbLigne, nbColonne){
    let i,j;
    for (i = 0; i < nbLigne; i++) {
      this.jeu.plateau[i] = [];
      for (j = 0; j < nbColonne; j++) {
        this.jeu.plateau[i][j] = "";
      }
    }

    this.jeu.joueurGagnant = null;
    this.jeu.etat = "0";
  },

  getJoueurById: function(id)
  {
    let retour = null;

    for(let joueur in this.jeu.joueurs)
    {
      if(this.jeu.joueurs[joueur]['id'] == id)
      {
        retour = this.jeu.joueurs[joueur];
      }
    }

    return retour;
  },

  changerJoueur: function(){
    if(this.jeu.prochainJoueur == '1')
      this.jeu.prochainJoueur = "2"
    else
      this.jeu.prochainJoueur = "1"
  },


  setPseudo: function(idJoueur, pseudo){
    let isPseudosDefinis = true;

    for(let joueur in this.jeu.joueurs)
    {
      if(this.jeu.joueurs[joueur]['id'] == idJoueur)
        this.jeu.joueurs[joueur]['pseudo'] = pseudo;

      if(this.jeu.joueurs[joueur]['pseudo'] == ''){
        isPseudosDefinis = false;
      }
    }

    if(isPseudosDefinis)
      this.jeu.etat = '1';
  },

  jouer: function(colonne, idJoueur)
  {
    let i, retour = "erreur";

    if(colonne <= this.jeu.plateau.length)
    {

      if(this.jeu.etat != "3")
      {
        for (i = this.jeu.plateau.length - 1; i >= 0; i--) {
          if(this.jeu.plateau[i][colonne] == ""){
            this.jeu.plateau[i][colonne] = idJoueur;
            retour = "ok";
            break;
          }
        }
      }

      let victoire = this.scannerPlateau();

      switch(victoire) {
        case "1":
            retour = "victoire "+victoire;
            this.jeu.etat = '2';
            break;
        case "2":
            retour = "victoire "+victoire
            this.jeu.etat = '2';
            break;
        case "draw":
            retour = "draw"
            this.jeu.etat = '2';
            break;
      }
    }

    return retour;
  },

  scannerPlateau : function(){
    let victoire = 0;
    let draw = true;

    for (i = 0; i < this.jeu.plateau.length; i++) {
      for (j = 0; j < this.jeu.plateau[i].length; j++) {
        if(this.testVictoireHorizontale(i,j)
          || this.testVictoireVerticale(i,j)
          || this.testVictoireDiagonaleDroiteBas(i,j)
          || this.testVictoireDiagonaleGaucheBas(i,j)
        )
          victoire = this.jeu.plateau[i][j];

        if(this.jeu.plateau[i][j] == "")
          draw = false;
      }
    }

    if(draw == true && victoire == 0)
      victoire = "draw";

    return victoire;
  },

  testVictoireHorizontale: function(i, j){
    let retour = false;

    if(this.jeu.plateau[i][j + 3] != undefined &&
      this.jeu.plateau[i][j] != "" &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i][j + 1] &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i][j + 2] &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i][j + 3])
      retour = true;

    return retour;
  },

  testVictoireVerticale: function(i, j){
    let retour = false;

    if(this.jeu.plateau[i + 3] != undefined &&
      this.jeu.plateau[i][j] != "" &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 1][j] &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 2][j] &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 3][j])
      retour = true;

    return retour;
  },

  testVictoireDiagonaleDroiteBas: function(i, j){
    let retour = false;

    if(this.jeu.plateau[i + 3] != undefined &&
      this.jeu.plateau[i + 3][j + 3] != undefined &&
      this.jeu.plateau[i][j] != "" &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 1][j + 1] &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 2][j + 2] &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 3][j + 3])
      retour = true;

    return retour;
  },

  testVictoireDiagonaleGaucheBas: function(i, j){
    let retour = false;

    if(this.jeu.plateau[i + 3] != undefined &&
      this.jeu.plateau[i + 3][j - 3] != undefined &&
      this.jeu.plateau[i][j] != "" &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 1][j - 1] &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 2][j - 2] &&
      this.jeu.plateau[i][j] == this.jeu.plateau[i + 3][j - 3])
      retour = true;

    return retour;
  }
}
