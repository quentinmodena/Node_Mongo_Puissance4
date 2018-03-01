const newGame = function()
{
  $('#newPartieJoueur').show();

  $('#buttonNouvellePartie').click(function(){
    jQuery.post('http://localhost:8080/jeu/new', {"pseudoJ1" : pseudo, "pseudoJ2" : jQuery('#pseudoJ2').val()}).done(function(retourJson){
      window.location.replace("jeu.html?id="+retourJson._id);

    });
  });

  /**/
}
