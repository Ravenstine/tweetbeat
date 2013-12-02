var Layout = {
  init: function(){
    $('#toggle_synth').on('click', this.toggleSynth)
    $('#toggle_visual').on('click', this.toggleVisual)
    $('.topic').draggable({ revert: "invalid" })
    this.setDropArea()
  },

  toggleSynth: function(){
    $('.synth').show()
    $('body').css('background-color', '#fff')
    Visualizer.stop()
  },

  toggleVisual: function(){
    $('.synth').hide()
    $('body').css('background-color', '#222')
    Visualizer.start()
  },

  setDropArea: function(){
    $('#synth_pads li').droppable({
      hoverClass: "drop_hover",
      drop: function( event, ui ) {

        var keyword = ui.helper
        $(keyword).effect( "transfer", { to: this, className: "ui-effects-transfer" }, 100 ).fadeOut(100)

        $(this).find('div').html(keyword.text())
        $(this).find('div').addClass('keyword_dropped').hide().fadeIn()

        var soundID = event.target.id
        var keywordID = keyword[0].id
        Stream.bindKeywordToSound(keywordID, soundID)
      }
    })
  },

  setPadSize: function(){
    var width = $('#synth_pads').find('li').width()
    $('#synth_pads').find('li').height(width)
  },

  flashColor: function(soundID) {
    $('#synth_pads #' + soundID).animate({
      backgroundColor: 'yellow'
    }, 20, function() {
      $('#synth_pads #' + soundID).animate({
        backgroundColor: '#e74c3c'
      }, 20)
    })
  }
}