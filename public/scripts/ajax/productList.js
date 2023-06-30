//TODO: use session to control pageIndex!
let pageIndex = -1;

$(document).ready(() => {
    var list = $("#productList");
    var button = $.parseHTML("<button onclick='fetchProductList()' id='nextPage'>Next Page</button>")
    list.after(button);
    fetchProductList();
})

async function fetchProductList(){
    pageIndex++;

    $("#productList").html("");
    $.get(`/api/product/list?page=${pageIndex}`, (data) => {
        if(!data) return;
        //tmp bugfix
        if(data.length == 0){
            pageIndex = -1;
            fetchProductList();
            return;
        }
        console.log(data);
        data.forEach((product) => {
          $("#productList").append(
                `<li><a href="/product/${product._id}">${product.title}</a></li>`
            );
        });
    });
}