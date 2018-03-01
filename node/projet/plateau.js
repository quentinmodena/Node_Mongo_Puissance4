module.exports = {
  rl : readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  }),

  instancieJoueurs: function(functionJeu){
    this.rl.question('\nPseudo pour le joueur 1 ? ', (answer) => {
      traitementJeu.setPseudo(1, answer);
      this.rl.question('\nPseudo pour le joueur 2 ? ', (answer2) => {
        traitementJeu.setPseudo(2, answer2);
        functionJeu();
      });
    });
  },

  afficherJeu: function(){
    process.stdout.write('\nPlateau : \n');
    let i, j, cptColonnes, ligneTexte = "|", ligneEnTete = "";

    for (cptColonnes = 1; cptColonnes <= traitementJeu.jeu.plateau[0].length; cptColonnes++) {
      ligneEnTete += " " + cptColonnes;
    }

    process.stdout.write(ligneEnTete+'\n');

    for (i = 0; i < traitementJeu.jeu.plateau.length; i++) {
      for (j = 0; j < traitementJeu.jeu.plateau[i].length; j++) {
        if(traitementJeu.jeu.plateau[i][j] == "")
          ligneTexte += " ";
        else
          ligneTexte += chalk.hex(traitementJeu.getJoueurById(traitementJeu.jeu.plateau[i][j])['color']).bold(traitementJeu.getJoueurById(traitementJeu.jeu.plateau[i][j])['sigle']);
        ligneTexte += '|';
      }

      process.stdout.write(ligneTexte+'\n');
      ligneTexte = "|";
    }
  },

  proposerCoup : function(idJoueur){
    let nomJoueur = traitementJeu.getJoueurById(idJoueur)['pseudo']
    this.rl.question('\n'+nomJoueur+': Sur quelle colonne voulez-vous jouer? ', (answer) => {
      let retourTour = traitementJeu.jouer(answer - 1, idJoueur);

      this.afficherJeu();

      switch(retourTour) {
        case "erreur":
          this.proposerCoup(idJoueur);
          break;
        case "victoire 1":
          process.stdout.write('Victoire de ' + traitementJeu.getJoueurById(1)['pseudo'] + ' !\n');
          this.nouvellePartie();
          break;
        case "victoire 2":
          process.stdout.write('Victoire de ' + traitementJeu.getJoueurById(2)['pseudo'] + ' !\n');
          this.nouvellePartie();
          break;
        case "draw":
          process.stdout.write('Match nul !\n');
          this.nouvellePartie();
          break;
        default:
          traitementJeu.changerJoueur();
          this.proposerCoup(traitementJeu.jeu.prochainJoueur);
      }
    });
  },

  nouvellePartie : function(){
    this.rl.question('Recommencer ? (o/n) ', (answer) => {

      if(answer == 'o'){
        traitementJeu.buildJeu(6,7);

        this.afficherJeu();

        traitementJeu.changerJoueur();
        this.proposerCoup(traitementJeu.jeu.prochainJoueur);
      }
    });
  }
}
