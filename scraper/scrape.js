var casper = require('casper').create();
var fs = require('fs'); // for writing to files
var data = [];
casper.start('http://www.data.gov.bn/pages/datalist.aspx');


// extract data from a row listing
function getData(){
	var items = document.querySelectorAll(".cbs-Detail");
	return Array.prototype.map.call(items, function(item){
		var link = item.querySelector("a.cbs-Line1Link");
		var title = link.textContent;
		var detailsPage = link.getAttribute("href");
		var subinfo = item.querySelectorAll(".cbs-Line2");
		var category = subinfo[0];
		var publisher = subinfo[1];
		var udpatedDate = subinfo[2];
		var datasets = item.querySelectorAll("ul.dwnld a");
		return {
			'title': title,
			'details': detailsPage,
			'category': category.lastChild.textContent.trim(),
			'publisher': publisher.lastChild.textContent.trim(),
			'updated': udpatedDate.lastChild.textContent.trim(),
			'datasets' : Array.prototype.map.call(datasets, function(dataset){
				return {
					'title': dataset.textContent,
					'link': dataset.getAttribute("href")
				};
			})
		};
	});
}

// currently 342 results on 35 pages
// old code used initially for downloading and saving
// for(var i = 2; i < 36; i++){
// 	(function(i){
// 		casper.then(function() {
// 		    console.log('Page ' + this.getCurrentUrl());
// 			data = data.concat(this.evaluate(getData));
// 		    var fname = 'page' +  (i-1) + '.txt';
// 		    var save = fs.pathJoin(fs.workingDirectory, 'data', fname);
//         	fs.write(save, JSON.stringify(data), 'a');
// 		    console.log('clicking....');
// 			this.click("#PageLink_" + i);
// 			this.waitForSelector("#PageLink_" + (i+1),
// 			    function pass () {
// 			        console.log("found");
// 			    },
// 			    function fail () {
// 			        console.log("not found");
// 			    }
// 			);			
// 		});
// 	})(i);
// }
savePageAndDownloadNext = function(page,casper){
	casper.then(function() {
		savePage(page, casper);
		console.log('clicking....' + (page+1));
		casper.click("#PageLink_" + (page+1));
		casper.waitForSelector("#PageLink_" + (page+2),
			function pass () {
				console.log("found");
				savePageAndDownloadNext(page+1, casper);
			},
			function fail () {
				savePage(page+1, casper);
				console.log("not found");
			}
		);
	});
}
savePage = function(page, casper){
	console.log('Saving page ' + casper.getCurrentUrl() + ' as ');
	data = data.concat(casper.evaluate(getData));
	var fname = 'page' +  (page) + '.txt';
	var save = fs.pathJoin(fs.workingDirectory, 'data', fname);
	fs.write(save, JSON.stringify(data), 'a');
}

createDownloadPage = function(data){
	var save = fs.pathJoin(fs.workingDirectory, '../download-attachments/', 'download-attachments.htm');
	var i = 1; 
	fs.write(save, "<!-- raw data");
	fs.write(save, JSON.stringify(data), 'a');
	fs.write(save, "-->", 'a');
	data.forEach(function(item){ 
		item.datasets.forEach(function(dataset){
			fs.write(save, "<li><a href='"+ dataset.link.replace(":0/","/")+"'>"  + i++ + " dld</a>", 'a');
		})
	});
}
casper.then(function(){
	savePageAndDownloadNext(1,this);
});

casper.on('error', function(msg,backtrace) {
	console.log('error: ', data.length);
	createDownloadPage(data);
});
casper.run(function(){
	console.log('run: ', data.length);	
	createDownloadPage(data);
});