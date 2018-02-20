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

	var newHTML2 = $.map(przepisyBaza, function(value) {
	    return('<div>' + value + '</div>');
	});
	$("#przepisy-kontener").html(newHTML2.join(""));
	console.log(przepisyBaza);
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

	$('.search').click(function(){
		
    	var find = produktArray;
		var przepisy = $.map(dayArr, function(value, key) {
		     if (value.tytul == find)
		     {
		        return value.skladniki;
		     }
		});
		console.log(przepisy);
		/*
		var find = produktArray;
		var przepisy = $.map(dayArr, function(value, key) {
		     if (value.skladniki == find)
		     {
		        return value.przepis;
		     }
		});
		console.log(przepisy);
		*/
	});
		
})

$('.textInput').on("input", function () {
    $("#myid li").hide().filter(function () {
    	return $(this).text().toLowerCase().indexOf($(".textInput").val().toLowerCase()) >= 0;
    })
    .show();
});

