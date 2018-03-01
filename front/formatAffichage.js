const formatPseudoVS = function(joueurs)
{
  retour = "";

  for(let joueur of joueurs)
  {
    if(retour != "")
      retour += " VS "

    retour += joueur.pseudo
  }

  return retour;
}

const formatEtat = function(jeu)
{
  retour = "";

  switch (jeu.etat) {
  case '0':
    retour = 'Partie non commencée';
    break;
  case '1':
    retour = 'Partie en cours';
    break;
  case '2':
    retour = 'Partie terminée';
    break;
  case '3':
    if(jeu.joueurGagnant != null)
      retour = 'Victoire de '+jeu.joueurGagnant.pseudo;
    break;
  default:
    retour = etat;
}

  return retour;
}
