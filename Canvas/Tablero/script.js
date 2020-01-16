function init() {

    var canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        /* ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight; */

        let num = 1;
        let x = 0;
        let y = 0;

        for (let index = 0; index < 8; index++) {
            
            for (let index2 = 0; index2 < 8; index2++) {
                
                if (num%2 == 0) {
                    ctx.fillStyle = "black";
                }else{
                    ctx.fillStyle = "pink";
                }
                ctx.fillRect(x, y, 100, 50);
                x+=50;
                num++;

            }
            y+=50;
            x = 0;
            num++;
        }
        
    }

}

window.onload = init;