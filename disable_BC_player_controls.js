<script language="JavaScript" type="text/javascript">
function onTemplateLoaded(expID){
            var _player,
                _exMod,
                _modVP;        
	   // get reference to the player itself
	   _player = brightcove.getExperience(expID);
           // get reference to experience module
           _exMod = _player.getModule(APIModules.EXPERIENCE);
           _modVP = _player.getModule(APIModules.VIDEO_PLAYER);
	  // hide media controls
          _exMod.getElementByID("videoPlayer").getControls().setIncludeInLayout(false);
          // in case users want to replay video listen for click event
          _exMod.getElementByID("videoPlayer").addEventListener("click", function(){
              _modVP.play();
          }); 
 }
</script>