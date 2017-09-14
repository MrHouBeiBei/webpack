<div class="layer">
    <div>this is <%= name %> layer</div>
    <% for (var i = 0; i < arr.length; i++) { %>
        <%= arr[i] %>
        <% } %>    
</div>

在app.js传入数据
layer.innerHtml = layer.tpl({
    name:'jone',
    arr:['apple','xiaomi','oppo']
})
