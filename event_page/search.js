function getAvailabelSEs(){
    return ["baidu", "baidu zhidao", "baidu baike", "google hongkong", "wikipedia", ];
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
    var SEs = getAvailabelSEs();
    for (var i=0; i<SEs.length; i++){
        var se = SEs[i];
        chrome.contextMenus.create({"title" : se, "parentId" : id, "contexts" : [context],
                            "id" : se});
    }
});

function onClickHandler(info, tab){
    var selection = info.selectionText;
    console.log(selection);
    var SEs = getAvailabelSEs();
    var clickedSEId = info.menuItemId;
    if (SEs.indexOf(clickedSEId) >= 0){
       var query = getSearchQueries(clickedSEId);
       query = query.replace("[KEYWORD]", selection);
        console.log(query);
       window.open(query);
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);
