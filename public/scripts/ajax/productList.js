//TODO: use session to control pageIndex!
let pageIndex = 0;

$(document).ready(() => {
    var list = $("#productList");
    var button = $.parseHTML("<button onclick='nextPageButton()' id='nextPage'>Next Page</button>")
    //list.after(button);
    fetchProductList();
})

async function nextPageButton(){
    pageIndex++;
    await fetchProductList();
}

async function fetchProductList(){
    const filterContainer = $("#filterContainer");

    const searchText = $("#search").val();
    let categories = [];
    for (const child of filterContainer.children()) {
        categories.push(child.id.toString());
    }
    

    $("#productList").html("");
    let fetchString =`/api/product/list?page=${pageIndex}`
    fetchString += searchText !== "" ? `&search=${searchText}` : "";
    //fetchString += "&cat=Kleidung";
    
    categories.forEach((value) => {
        fetchString = fetchString.concat(`&cat=${value}`);
    })
    //history.pushState(state, "");
    $.ajax({
        url: fetchString,
        type: 'GET',
        success: function (data) {
            if(!data) return;
            //console.log(data);
            data.forEach((product) => {
                $("#productList").append(`<li><a href="/product/${product._id}">${product.title}</a></li>`);
            });
        }
    });
    return;
}


function setFilter(filter){
    const filterContainer = $("#filterContainer");
    const filterButton = $.parseHTML(`<button id="${filter}" onclick="removeSelf()">${filter}</button>`);

    for (const child of filterContainer.children()) {
        if(child.id == filter) {
            child.remove();
            return;
        }
    }
    filterContainer.append(filterButton);
}

function removeSelf(){
    event.target.remove();
    event.preventDefault();
}


const targetNode = document.getElementById("filterContainer");
const config = { attributes: false, childList: true, subtree: false };


const observer = new MutationObserver(async(mutationList, observer) => {
    console.log(mutationList);
    console.log("A child node has been added or removed.");
    await fetchProductList();
});
observer.observe(targetNode, config);