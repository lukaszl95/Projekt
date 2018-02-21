$(function() {
    
	function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    for (var i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}
	function Column(name) {
	    var self = this; // useful for nested functions

	    this.id = randomString();
	    this.name = name;
	    this.$element = createColumn();

	    function createColumn() {
		    // CREATING COMPONENTS OF COLUMNS
		    var $column = $('<div>').addClass('column columns');
		    var $columnTitle = $('<h2>').addClass('column-title').text(self.name).attr('id','text');
		    var $columnDelete = $('<button>').addClass('btn-delete').text('x').attr({'title':'Delete'});

		    // ADDING EVENTS
		    $columnDelete.click(function() {
		        self.removeColumn();
		        var removeItem = self.name;
				console.log(removeItem);
				produktArray.splice( $.inArray(removeItem, produktArray), 1 );
				console.log(produktArray);
		    });	
		    // CONSTRUCTION COLUMN ELEMENT
		    $column.append($columnDelete)
		        .append($columnTitle);

		    // RETURN OF CREATED COLUMN
		    return $column;
		}
	}
	Column.prototype = {
	    removeColumn: function() {
	    	this.$element.remove();
	    }
	};
	var board = {
    	addColumn: function(column) {
      		this.$element.append(column.$element);
    	},
    	$element: $('#board .column-container')
	}
	$('.columnTitle').click(function(){
		$('.columnTitle').val('');
	});
	$('.create-column').click(function(){
		var name = $('.columnTitle').val();
		produktArray.push(name);
		console.log(produktArray)
		var column = new Column(name);
    	board.addColumn(column);
	});

	/////////////////// Lista produktow
	var newHTML = $.map(bazaSkladnikow, function(value) {
	    return('<li>' + value + '</li>');
	});
	$("#myid").html(newHTML.join(""));

	/////////////////// Dodawanie id do <li>
	var i=0;
		$('li').each(function(){
		    i++;
		    var newID=i;
		    $(this).attr('data-produkt',newID);
		    //$(this).val(i);
		});

	/////////////////// Dodawanie produktu do Array i tworzenie nowej kolumny
	var produktArray = [];
	$('ul[id*=myid] li').click(function(){
		var produkt = $(this).text();
		produktArray.push(produkt);
		console.log(produktArray);
		var column = new Column(produkt);
    	board.addColumn(column);
	});
	/////////////////// Szukanie przepisu
	$('.btn-search').click(function(){
		$("#lista-przepisow").empty();
	    new search();
	});
	function search() {
		for (var i = 0; i < produktArray.length; i++) {
			var skladnik = produktArray[i]; 
			console.log(skladnik);
			for (var i = 0; i < bazaPrzepisow.length; i++) {
			  	var czyZawiera = bazaPrzepisow[i].skladniki.includes(skladnik);
			  	if (czyZawiera) {
			    	document.getElementById("lista-przepisow").innerHTML += "<div class='col-4'>" + "<div class='przepis-kontener'>" +"<h2 class='tytul'>" + bazaPrzepisow[i].tytul + "</h2>" + "<p class='kategoria'>" + bazaPrzepisow[i].kategoria + "</p>" + "<p class='skladniki'>" + bazaPrzepisow[i].skladniki + "</p>" + "<p class='przepis'>" + bazaPrzepisow[i].przepis + "</p>" + "</div>" + "</div>";
			  	} 
			}	
			if (czyZawiera == 0){
			  	document.getElementById("lista-przepisow").innerHTML += "<h2 class='brak-przepisu'>" + "Brak przepisu" + "</h2>"
			}
		}
	};
})

$('.textInput').on("input", function () {
    $("#myid li").hide().filter(function () {
    	return $(this).text().toLowerCase().indexOf($(".textInput").val().toLowerCase()) >= 0;
    })
    .show();
});

