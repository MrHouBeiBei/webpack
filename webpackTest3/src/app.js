import './css/comman.css'

import layer from './components/layer/layer.js'

const App =  function () {
    var dom  = document.getElementById('app')
    var layer = new layer();

    layer.innerHtml = layer.tpl
}

// function App(){
    
// }

new App();