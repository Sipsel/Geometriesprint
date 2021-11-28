

//math funcs

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  
//array get funcs
function get_object_by_id(arr,id)
{   
    let result;
    arr.forEach(
        arr_elem => 
        {
            if(arr_elem.id == id)
            {
                result = arr_elem;
            }
        }
    );
    return result;
}
function get_object_by_name(arr,name)
{   
    let result;
    arr.forEach(
        arr_elem => 
        {
            if(arr_elem.name == name)
            {
                result = arr_elem;
            }
        }
    );
    return result;
}


//tile map to array func
function one_d_2_two_d_arr(arr, width)
{
    var nArr = [];
    console.log(arr.length)
    while(arr.length > 0) {
        nArr.push(arr.splice(0,width));
    }
    console.log(nArr);
    return nArr;
}


//graphical func
function drawTo(ctx,vec1,vec2)
{
    let temp_style = ctx.strokeStyle;
    let line_width = ctx.lineWidth
    ctx.lineWidth  = 5;
    ctx.strokeStyle = "green";
    ctx.beginPath();
    //console.log(vec1.x,vec2.x)
    ctx.moveTo(vec1.x*tile_size,vec1.y*tile_size);
    ctx.lineTo(vec2.x*tile_size,vec2.y*tile_size);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = temp_style;
    ctx.lineWidth  = line_width;
}
//collision detection 
function in_proximity(asset1,asset2)
    {
        //http://cgp.wikidot.com/circle-to-circle-collision-detection
        //check if assets are in proximity
        let a;
        let x;
        let y;

        p1x = asset1.x+asset1.width/2;
        p1y = asset1.y+asset1.height/2;
        r1 = sqrt(pow(asset1.height,2)+pow(asset1.width,2))/2;
        //console.log(asset2.width,asset2.height)
        
        p2x = asset2.x+asset2.width/2;
        p2y = asset2.y+asset2.height/2;
        //console.log(p2x*32,p2y*32);
        r2 = sqrt(pow(asset2.height,2)+pow(asset2.width,2))/2;
        
        
        a = r1+r2;

        x = p1x-p2x;
        y = p1y-p2y;

        //console.log(r1,r2,a)
        if (a > sqrt((x * x) + (y * y))) {
            return true;
          } else {
            return false;
          }
        

    }
function collision(player,asset)
{
    //check if collision exits
    //check for flickering
    
    //min max x-achse
    
   

    let player_x_min = player.position.x;
    let player_x_max = player.position.x+player.width;

    let player_y_min = player.position.y;
    let player_y_max = player.position.y+player.height;

    let asset_x_min = asset.position.x;
    let asset_x_max = asset.position.x+asset.width;

    //y min
    let asset_y_min = asset.position.y;
    let asset_y_max = asset.position.y+asset.height;


    

    let col_top, col_right,col_bottom;
    col_top  = col_right = col_bottom = false;



    //check for collision
    if(
        !(player_x_min<asset_x_max
        &&
        player_x_max>asset_x_min
        && player_y_min<asset_y_max
        &&
        player_y_max>asset_y_min)
    )
    {
        return false;
    }


    //handle collision

    let d_right = player_x_max-asset_x_min;

    let d_bottom = (player_y_max-asset_y_min)*.7;

    let  d_left = asset_x_max-player_x_min;

    let  d_top = asset_y_max-player_y_min*.8;


    let directions = [d_right,d_left,d_top,d_bottom];
    let lowest_value = Math.min(d_right,d_top,d_left,d_bottom);
    

    switch(directions.indexOf(lowest_value))
    {
        //fallthrough

        case 0:
            col_right = true;
        ; 
        
        case 2:
            col_top = true;    
        ;
        
        case 3:
            col_bottom = true;
    }


    //get obstacle id
    let obstacle_bottom = get_object_by_name(block_types,'normal_obstacle_bottom')

    //console.log(col_right)
    if(col_right || col_top || col_bottom && asset.type == obstacle_bottom.id)
    {
        console.log("Collision")
        player.on_map = false;
        player.alive = false;
        return true;
        
    }
    if(col_bottom)
    {
        
        player.on_ground = true;
        player.position.y = asset.position.y-player.height;
        player.velocity.y = 0;
        
        return true;
    }
   
    return false;   
}




// helper functions
function range_array(max) {
    let result = []
    for(let i = 0; i<max;i++)
    {
        result.push(i);
    }
    return result;
}