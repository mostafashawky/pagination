// Fetch Countries Data

// variable
let bulletContainer = document.querySelector(".pagination");

// Tabl Container
let table = document.querySelector(".table-countries table tbody");

// Pagination Count
let count = 20;

// Input Search
let search = document.body.querySelector("input[type='search']");

// Xml Http Request
let xml = new XMLHttpRequest();

// CoutriesData
let countries = '';



// Run When There Is Change With Connection With Server
xml.onreadystatechange = function()
{
	// Request To Server Is Done And Response Is Ready
	if( this.readyState == this.DONE ){

	    countries = JSON.parse( this.responseText );

	    // If There Is Error With Fetching Data From That Server Then It Will Sent Error And Execute Script
	    if( " " == countries || null == countries  ){
	    	alert( "Error With Fetching Data " );
	    	return false;
	    }
	    generatePagination( countries, 0, count )

	    generateBullets( countries, count )
	}
}

xml.open("GET","https://restcountries.eu/rest/v2/all");
xml.send( );


// All Script Function
/*
** GeneratePagination Function
** @@ Accept 3Param
** First Param Is The Contries Object
** Second Param Is Start Loop We Get It From Data Set Bullet Multipling It From Pagination Count 
** Third Param Is End Loop Sum With Pagination Count 
*/
function generatePagination( countries, start, end)
{

	// Loop Through Countries
	for( let i = start ; i < end ; i++ ) {

		// Create Table Row
		let tableRow = document.createElement("tr");
		tableRow.className = "tr";

		// Append Table Row To Table Body
		table.appendChild( tableRow );

		// Loop To Create Table Cells
		for( let x = 0; x < 2; x++ ) {

			// Create Table Cell
			let tableCell = document.createElement("td");
				tableCell.setAttribute("data-current", i );

			// Append Table Cell To Table Row
			tableRow.appendChild( tableCell );

			// Create TextNode For Countries Name And Number
			let tableNum    = document.createTextNode( i + 1 );
			let countryName = document.createTextNode( countries[i].name )

			// Append TextNode To Table Cell
			if( x == 0 ) { // If We In First Table Cell ( Number ) 
				tableCell.appendChild( tableNum ) 
			} else if( x == 1 ){ // We In Second Table Cell ( Country Name ) 
				tableCell.appendChild( countryName )
			}
		}
	

	}
}

/* GenerateBullets Function
** To Make Bullet By Country Number Name
** @ Accept One Param
** First Param Countries To Make Bullet By Number
** Second Param Pagination Count For Example If We Have 10 Countries In One Pagination Then We Divide All Coutnries 40 / 10 
*/ 
function generateBullets( countries, paginationCount )
{
	// Loop Through Countries
	let bulletCount = Math.ceil( (countries.length / paginationCount));

	// Loop Through Bullet Count
	// We Make Maximal To Bullets Because Country Is Too Much
	for( let i = 0; i < bulletCount; i++ ){
		
		// Check If Loop Variable Equal 15 Then Stop Looping ( Stop Generating Bullets )
		if( i === 15 ) {
			break;
		}
		bulletContainer.innerHTML += "<li data-current='"+i+"'  class='bullet'>"+(i+1)+"</li>"
	}
}

document.onclick = function(event)
{	 
	 // Get Li Bullet Clicked Element
	 if( event.target.classList.contains("bullet")	){

	 		// Check If The Request Success And Returen Data
	 			let currentBullet = event.target.getAttribute("data-current");
	 			let startLoop = parseInt( currentBullet * count );
	 			let endLoop   = parseInt( startLoop + count )
	 			table.innerHTML = "";
	 			generatePagination( countries, startLoop, endLoop )	
	 }	
}

/*
** Search With Input Function


*/

search.onkeyup = function( event )
{	
	table.innerHTML = '';

	// When User Type In Search Text Then We Assign This Text To User Serch Varaible
	let userSearch = this.value.toLowerCase();

	if( "" == this.value  ){
		generatePagination( countries, 0, count )		
	} else {
		// Loop Through The Countries To Search The Countries
		countries.forEach( ( element, index )=>{
			// Check If Name Contain The User Search
			if( element.name.toLowerCase().indexOf( userSearch ) > -1 ) {
				
				table.innerHTML += `<tr>
					<td>${ index + 1 }</td>
					<td>${ element.name }</td>
				</tr>`				
			}
		})
	}

}

