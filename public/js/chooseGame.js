var showAllGames = function() {
  d3.json('/getGames', function(games) {
    var all_games = d3.select('.all_games').selectAll('div')
      .data(games)
      .enter()
      .append('div')
      .attr('class', 'game')
      .attr('id', function(d) {
        return d.id;
      });
    all_games.append('div')
      .attr('class', 'size circle')
      .text(function(d) {
        return d.no_of_players;
      });
    all_games.append('div')
      .attr('class', 'available circle')
      .text(function(d) {
        return d.no_of_players - d.joined;
      });
    all_games.append('button')
      .attr('class', 'join')
      .attr('onClick', 'onJoinClick(this)')
      .text('join');

  });
};

var redirectWhenGameIsReady = function() {
  var gameId = document.cookie.split(/[=;]/)[3];
  setInterval(function() {
    $.post('/isGameReady', {
      gameId: gameId
    }, function(data) {
      if (data.ready) {
        console.log('in redirectWhenGameIsReady');
        window.location = '/board.html'
      }
      //show players joined
    }, 'json');
  }, 1000);
}

var onCreateClick = function() {
  var gameSize = $('#game-list').val();
  $.post('/addGame', {
    gameSize: gameSize
  }, function(res) {
    res.success && $('#waitingModal').show();
    redirectWhenGameIsReady();
  }, 'json');
};

var onJoinClick = function(button) {
  var gameId = button.parentElement.id;
  var name = document.cookie.split('=')[1];
  $.post('/joinGame', {
    gameId: gameId,
    name: name
  }, function(res) {
    res.success && $('#waitingModal').show();
    redirectWhenGameIsReady();
  }, 'json');
};

var onload = function() {
  document.cookie = "name=jhon";
  $('#create-btn').click(onCreateClick);
  setInterval(function() {
    showAllGames();
  }, 1000);
};

$.ready(onload);
