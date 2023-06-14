// Thank you for little script from Box Hacker : http://boxhacker.com/blog/2011/05/23/a-little-spritesheet-script-for-photshop/
// And Laying out celled sprites & Photoshop automation article by Mark McCoy in GarageGames : http://www.garagegames.com/community/blogs/view/11527
// Modify by Nattaworn Tancharoen : 23/08/2012
// Version : 1.0.0.0

if( BridgeTalk.appName == "photoshop" )
{
	var dlg = new Window("dialog{text:'LayertoSpriteSheet v1.01 byZardokar',bounds:[200,200,410,300],\
	textCol:EditText  {bounds:[140,14,180,35]  , text:'5' ,properties:{multiline:false,noecho:false,readonly:false}},\
	cbox:Checkbox     {bounds:[15,40,160,75]  , text:'Read from top Layer' },\
	okbtn:Button     {bounds:[15,75,120,95]  , text:'OK' },\
	};");

	dlg.Text = dlg.add('statictext',[15,15,150,0],"Number of Columns : ");
	dlg.okbtn.onClick  = function()
	{
	  if(documents.length > 0){

		var docRef      = activeDocument;    
		
		var activeLayer = docRef.activeLayer;

		var numLayers   = docRef.artLayers.length; 
		
		//Initialize 
		var cols  = dlg.textCol.text;
		var rows  = Math.ceil(numLayers/cols);

		var SpriteX = docRef.width;
		var SpriteY = docRef.height;
		
		//Switch Read top to bottom or bottom to top
		var topbottom = dlg.cbox.value;
		
		//Count Rows or Column for move Layer
		var col_count = 0;
		var row_count = 0;

		var movX = 0;
		var movY = 0;
		
		app.preferences.rulerUnits = Units.PIXELS;
		
		app.displayDialogs = DialogModes.NO;
		
		// Resize Canvas
		docRef.resizeCanvas( SpriteX * cols, SpriteY * rows, AnchorPosition.TOPLEFT );
		
		//debug
		//alert(": "+dlg.cbox.value);

		if(topbottom){
			for (i=0;i < numLayers ;i++) 
			{ 	
	             		if (docRef.artLayers[i].kind == LayerKind.NORMAL && docRef.artLayers[i].bounds[2] == 0 && docRef.artLayers[i].bounds[3] == 0)
				{
					docRef.artLayers[i].remove();
					row_count++; col_count=0;
				}
				docRef.artLayers[i].visible = true;
				
				movX = SpriteX * col_count;
				movY = SpriteY * row_count;
				
				docRef.artLayers[i].translate(movX,movY);
				col_count++;
				if(col_count > (cols-1)){ row_count++; col_count=0; };
			}
		}else{
			for (i = (numLayers-1);i >= 0 ;i--) 
			{ 	
				if (docRef.artLayers[i].kind == LayerKind.NORMAL && docRef.artLayers[i].bounds[2] == 0 && docRef.artLayers[i].bounds[3] == 0)
				{
					docRef.artLayers[i].remove();
					row_count++; col_count=0;
				}
				docRef.artLayers[i].visible = true;
				
				movX = SpriteX * col_count;
				movY = SpriteY * row_count;
				
				docRef.artLayers[i].translate(movX,movY);
				col_count++;
				if(col_count > (cols-1)){ row_count++; col_count=0; };
			}
		}

		
	  }else{
		msg("Sorry must have more than 1 image open in photoshop to work!");
	  }
	  dlg.close();
       }
       //// End Douction okbtn
       dlg.show();
}
