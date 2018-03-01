module.exports = {
  saveData: function(data, callback){
    MongoClient.connect(url, function(err, client) {
      const col = client.db(dbName).collection('jeu');

      col.save(data, {w:1}, function(err, result) {
        if (typeof(data['_id']) == 'undefined')
          traitementJeu.jeu = result.ops;

        callback(err, result);

        client.close();
      });
    });
  },

  getJeuPseudo: function(pseudo, callback){
    MongoClient.connect(url, function(err, client) {
      const col = client.db(dbName).collection('jeu');
 
      col.find({joueurs: {$elemMatch: {pseudo}}}).toArray(callback);
      client.close();
    });
  },

  getJeuById: function(id, callback){
    MongoClient.connect(url, function(err, client) {

      const col = client.db(dbName).collection('jeu');

      //col.findOne({_id: "5a9558a785a5d8019bfdfaa2"}, callback);
      col.findOne({"_id": ObjectId(id)},callback);
      client.close();
    });
  },

  setPseudos: function(id, request){
    traitementJeu.setPseudo("1", request.pseudoJ1);
    traitementJeu.setPseudo("2", request.pseudoJ2);
  }
}
