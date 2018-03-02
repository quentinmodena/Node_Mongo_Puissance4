module.exports = function (req, res, next) {
  res.sseSetup = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })

  }

  res.sseSend = function(data) {
    res.write("event: plateauChange\n");
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }

  res.sseSendChat = function(data) {
    res.write("event: chatChange\n");
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }

  next()
}
