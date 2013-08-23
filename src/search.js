function getAvailabelSEs(){
    return ["baidu", "baidu zhidao", "baidu baike", "google hongkong", "google taiwan", "wikipedia", ];
}

function getSearchQueries(se){
    var queries = {
        "baidu" : "http://www.baidu.com/s?wd=[KEYWORD]",
        "baidu baike" : "http://baike.baidu.com/search/word?word=[KEYWORD]",
        "baidu zhidao" : "http://zhidao.baidu.com/search?word=[KEYWORD]",

        "google hongkong" : "http://www.google.com.hk/search?q=[KEYWORD]",
        "google taiwan" : "http://www.baidu.com/s?wd=[KEYWORD]",

        "wikipedia" : "http://en.wikipedia.org/w/index.php?title=Special:Search&search=[KEYWORD]"
    };
    return queries[se];
}

chrome.runtime.onInstalled.addListener(function(){
    var context = "selection";
    var title = "Search With";
    var id = chrome.contextMenus.create({"title" : title, "contexts" : [context],
                            "id" : "context"+context});

	var urls = get_urls();

    for (var i=0; i<urls.length; i++){
        var url = urls[i];
        chrome.contextMenus.create({"title" : url.se, "parentId" : id, "contexts" : [context],
                            "id" : "se" + i});
    }
});

function onClickHandler(info, tab){
	var selection = info.selectionText;
	var clickedSEId = info.menuItemId.substr(2);
	var urls = get_urls();
	var query = urls[clickedSEId].query;
	query = query.replace("[KEYWORD]", selection);
	window.open(query);
}

chrome.contextMenus.onClicked.addListener(onClickHandler);
