const displayConnexion = function(){

  if(localStorage.getItem('login') != null){
    $('.user').show();
  }
  else {
    $('.user').hide();
  }

  $('.user').html(localStorage.getItem('login')+" <a class='disconnect'>X</a>");
};

if(localStorage.getItem('login') == null){
  $('#myModal').show();
}
else {
  displayConnexion();
}

$('#buttonPseudo').click(function(){
  localStorage.setItem('login', $('#pseudo').val());
  $('#myModal').hide();
  displayConnexion();
});

jQuery('.user').on("click", ".disconnect", function(){
  localStorage.removeItem('login');
  $('#myModal').show();
  displayConnexion();
});
