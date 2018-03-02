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
    if(jeu.joueurGagnant == null)
      retour = 'Match nul';
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

const formatDate = function(id)
{
  console.log(id)

  if(id != null)
  {
    timestamp = id.toString().substring(0,8)

    date = new Date( parseInt( timestamp, 16 ) * 1000 )

    let mois = date.getMonth()+1

    return date.toLocaleDateString("fr-FR") + " à " + date.toLocaleTimeString("fr-FR", { hour: 'numeric', minute: 'numeric'});
  }

}
