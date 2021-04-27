// Fetch Countries Data

// variable
let bulletContainer = document.querySelector(".pagination");

let countries = '';

let count = 10;

// Xml Http Request
let xml = new XMLHttpRequest();


xml.onreadystatechange = function()
{

	if( this.readyState === this.DONE ){
	    countries = JSON.parse( this.responseText );
		generatePagination( countries );
	}
}

xml.open("GET","https://restcountries.eu/rest/v2/all");
xml.send();


	

function generatePagination( countries, start, end)
{
	// Generate Bullet

	// Loop Through Countries
	for( let i = start ; i < end ; i++ ) {
		console.log( countries[i].name )
	}
}

function generateBullets( bulletCount )
{
	console.log( bulletCount );
	for( let i = 0; i < bulletCount; i++ ){
		bulletContainer.innerHTML += "<li data-current='"+i+"'  class='bullet'>"+i+"</li>"
		if( i === 10){
			break;
		}
	}
}
window.onload =  generateBullets( countries.length );


document.onclick = function(event)
{	 
	 // Get Li Bullet Clicked Element

	 if( event.target.classList.contains("bullet")	){

	 		// Check If The Request Success And Returen Data
	 		if( " " != countries ) {
	 			let currentBullet = event.target.getAttribute("data-current");
	 			let startLoop = parseInt( currentBullet * count );
	 			let endLoop   = parseInt( startLoop + count )
	 			generatePagination( countries, startLoop, endLoop )
	 		}
	 }	
}
