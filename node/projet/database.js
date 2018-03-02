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

      col.find({joueurs: {$elemMatch: {pseudo}}}).sort({_id : -1}).toArray(callback);
      client.close();
    });
  },

  getJeuById: function(id, callback){
    MongoClient.connect(url, function(err, client) {

      const col = client.db(dbName).collection('jeu');

      col.findOne({"_id": ObjectId(id)},callback);
      client.close();
    });
  },

  setPseudos: function(id, request){
    traitementJeu.setPseudo("1", request.pseudoJ1);
    traitementJeu.setPseudo("2", request.pseudoJ2);
  },

  addChat: function(data, callback){
    MongoClient.connect(url, function(err, client) {
      const col = client.db(dbName).collection('chat');

      col.save(data, {w:1}, function(err, result) {
        callback(err, result);

        client.close();
      });
    });
  },

  getChat: function(idGame, callback){
    MongoClient.connect(url, function(err, client) {

      const col = client.db(dbName).collection('chat');

      col.findOne({"_id": idGame},callback);

      client.close();
    });
  },

  getAllChat: function(pseudo, callback){
    MongoClient.connect(url, function(err, client) {
      const col = client.db(dbName).collection('chat');

      col.find({}).toArray(callback);
      client.close();
    });
  },

}
