readline = require('readline');
chalk = require('chalk');

const modulePlateau = require('./plateau.js');
traitementJeu = require('./traitementJeu.js');




process.stdout.write('---------------------------\n       PUISSANCE 4\n---------------------------');

const partie = function(){
  modulePlateau.afficherJeu();

  modulePlateau.proposerCoup(traitementJeu.jeu.prochainJoueur);
}

traitementJeu.buildJeu(6,7);

modulePlateau.instancieJoueurs(partie);
