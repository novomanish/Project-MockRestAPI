/**
 * Created by mjaiswal on 12/08/16.
 */
(function(){
    $(document).ready(function(){
        $("#fetch").on("click", handleFetchButton);
        $("#save").on("click", handleSaveButton);
    })

    function handleFetchButton(){
        var uri = $("input[name=uri]").val(),
            form = $("#form");
        if(uri){
            $.ajax(uri).done(function(response){
                $("textarea[name=body]").val(response)
            }).fail(function(ajax){
                $("textarea[name=body]").val(ajax.responseText);
            });
        }else{
            alert("URI is empty")
        }
    }

    function handleSaveButton(){
        var uri = $("input[name=uri]").val(),
            body = $("textarea[name=body]").val(),
            form = $("#form");
        if(uri){
            $.post("/", {
                uri: uri,
                body: body
            }).done(function(response){
                var a = 1;
            })
        }else{
            alert("URI is empty")
        }

    }
})();
