//classes
class Vector {
    constructor(x=0,y=0)
    {
        this.matrix = [x,y];
    }
    add(_vector)
    //x,y for vector to add
    {
        return new Vector(this.matrix[0]+_vector.x,this.matrix[1]+_vector.y);
    }
    subtract(_vector)
    {
        return new Vector(this.matrix[0]-_vector.x,this.matrix[1]-_vector.y);
    }
    mult(_factor)
    {
        return new Vector(this.matrix[0]*_factor,this.matrix[1]*_factor);
    }
    set x(_x)
    {
        this.matrix = [_x,this.y];
    }
    set y(_y)
    {
        this.matrix = [this.x,_y];
    }
    get x(){
        return this.matrix[0];
    }
    get y()
    {
        return this.matrix[1];
    }
}
class Game
{
    constructor()
    {
        this.running = false;
    }
}
class Camera 
{
    constructor(map, width, height)
    {
        this.x = 0;
        this.y = 0;
        this.width = width
        this.height = height;
        this.maxX = map.cols * map.tsize - width;
        this.maxY = map.rows * map.tsize - height;
    }
    follow(asset)
    {
        map.ctx.translate(this.width/2*tile_size,this.height/2*tile_size);       
        map.ctx.translate(-asset.middlepoint.x*tile_size,-asset.middlepoint.y*tile_size);  
        
    }
}

class Map
{
    constructor(ctx,_tile_map)
    {
        this.ctx = ctx;
        this.tile_map = _tile_map;
        this.tiles =  _tile_map.tiles;
        this.assets = [];
        this.particles = [];
        this.loaded = false;
        this.gameover = false;
    }
    add_asset(asset)
    {
        this.assets.push(asset);
    }
    stroke_assets(dt)
    {
        this.assets.forEach(asset => {
            if(asset.on_map == false && !(this.loaded == false))
            {
                this.assets.splice([this.assets.indexOf(asset)],1)
            }else
            {
                asset.draw(dt)
            }
        }
        );
        //console.log(this.assets[0].on_map);
    }
    stroke_particles(dt)
    {
        this.particles.forEach(particle => {
            if(particle.on_map)
            {
                particle.draw(dt)
            }else
            {
                this.particles.splice([this.particles.indexOf(particle)],1);
            }    
        }
        
        );
    }
    stroke_lines()
    {

       // console.log(this.width,this.height);
        for(let x = 0;x < this.width;x++){
            //console.log(x);
            for(let y = 0; y <this.height;y++){
                //console.log(x,y,y*tile_size,tile_size,tile_size);
                this.tiles.push[x,y];
                ctx.rect(x*tile_size,y*tile_size,tile_size,tile_size);
                ctx.font = "10px bold arial";
                ctx.strokeText(`${x},${y-1}`,x*tile_size+8,y*tile_size-8);
                ctx.stroke();
            }
        }
    }
    get width()
    {
        return this.tile_map.cols;
    }
    get height()
    {
        return this.tile_map.rows;
    }
    preload()
    {
        //set player as first object
        this.add_asset(new Player('player',0-5,this.height-2,1,1));
        this.player = this.assets[0];

        let player_image = document.getElementById('player_image');
        this.player.set_Image(player_image);
          
        for(let y = 0;y<this.tiles.length;y++)
        {
            
            for(let x = 0; x<this.tiles[y].length-1;x++)
            {
                if(this.tiles[y][x] !=0)
                {
                    let block = get_object_by_id(block_types,this.tiles[y][x]);
                    let block_above = get_object_by_id(block_types,this.tiles[y-1][x]);

                    let width = (block.width) ? block.width:1; 
                    let height = (block.height) ? block.height:1;
                    let xShift = (block.xShift) ? block.xShift:0;
                    let yShift = (block.yShift) ? block.yShift:0;
                    let degree = (block.degree) ? block.degree:0;

                    if(block.name == 'normal_obstacle_bottom' || block.name == 'normal_obstacle_top')
                    {
                        if(block_above.name == 'half_block')
                        {
                            yShift-=1-block_above.height;
                        }
                        this.add_asset(new Triangle(`${[x,y]}`,x+xShift,y+yShift,width,height,this.tiles[y][x],degree));
                        this.assets.at(-1).set_color(secondary_color);
                    }else
                    {
                        this.add_asset(new Rectangle(`${[x,y]}`,x+xShift,y+yShift,width,height,this.tiles[y][x],degree));
                        this.assets.at(-1).set_color(primary_color);
                    }

                   //this.assets.at(-1).set_color(block.color? block.color:primary_color);
                }
                if(this.tiles[y][x] == 2 || this.tiles[y][x] == 6)
                {
                    //this.assets[this.assets.length-1].set_color("red");
                }

            }

        }
        this.add_asset(new Rectangle("spawn-plattform",0-30,this.height-2,30,1,1,180));
        this.assets.at(-1).set_color(primary_color);


        this.add_asset(new Rectangle("floor",-30,this.height-1.01,this.width+30-1,this.height));

        
        this.player.set_color('red');
        this.player.velocity = new Vector(player_speed,0);
        this.player.alive = true;

        this.stroke_assets(0);
        this.loaded = true;

       
    }
    play(dt)
    {
        this.particles.forEach(particle => particle.move(dt));
       if(this.player.alive)
       {
            this.player.move(dt);
            this.particles.forEach(particle => particle.move(dt));
            let collision_any_asset = false;

            this.assets.forEach(asset => {
                if(this.player != asset)
                {
                    if(in_proximity(this.player,asset))
                    {   
                    
                        let collision_with_asset = collision(this.player,asset);

                        if(collision_with_asset)
                        {

                            this.player.set_color("blue")
                            collision_any_asset = true;

                        }
                    }
                }

            })
            if(!collision_any_asset)
            {
                this.player.set_color("red")
                this.player.on_ground = false;
                //console.log(this.player.x);
            }

            //add particles
            if(this.player.on_ground)
            {
                for(let i = 0;i<1;i++)
                {
                    let particle_width=0.2;
                    let particle_height=0.2;
                    let particle_time = 20;
                    let player_x = this.player.x-particle_width;
                    let player_y = this.player.y+this.player.width-particle_height+randomIntFromInterval(0,5)/100;
                    
                    this.particles.push(new Particle(i,player_x,player_y,0.2,0.2,99,0,randomIntFromInterval(0,30)));
                 
                    this.particles.at(-1).velocity.y = -randomIntFromInterval(0,10)/10;
                    this.particles.at(-1).gravity = randomIntFromInterval(0,10)/50;
                    this.particles.at(-1).on_ground = false;
                    this.particles.at(-1).loaded = true;
                   

                    this.particles.at(-1).set_color(secondary_color)
                }
            }
            

            
            
     

            
            document.getElementById('score').innerHTML = `Score:${Math.floor(this.player.x)}`;


            if(this.player.x > 0 && this.audio == undefined)
            {
         
            var promise = document.getElementById('Song').play();
            document.getElementById('Song').volume = 0.5;
            if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
            }
            
        }
        
       }
       else
       {
       
        var promise1 = document.getElementById('Song').pause();

        var promise2 = (this.over) ? undefined : document.getElementById('game-over-sound').play();
        if (promise1 !== undefined) {
        promise1.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
        } 
        if (promise2 !== undefined) {
            promise2.then(_ => {
               
                this.over = true; 
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
            } 

          
        if(this.gameover == false)
        {
            let x = this.player.middlepoint.x;
            let y = this.player.middlepoint.y;

            for(let i = 0;i<20;i++)
            {
                
                let xShift = randomIntFromInterval(0,2)/100;
                let yShift = randomIntFromInterval(0,2)/100;
                let dx = 20;
                let dy = 20;


                this.particles.push(new Particle(i,x+xShift,y+yShift,0.2,0.2,99,0,randomIntFromInterval(1,60)));
                let curr_part = this.particles.at(-1);
                curr_part.gravity = 0;
                curr_part.velocity.x = randomIntFromInterval(-dx,dx)/10;
                curr_part.velocity.y = randomIntFromInterval(-dy,dy)/10;
                curr_part.on_ground = false;
                curr_part.loaded = true;
                curr_part.set_color(secondary_color)
            }
            this.gameover = true;
        }
        }

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);


       //camera move function -> pass camera as object

        camera.follow(this.player)
        //camera.scale();
        //draw assets

        this.stroke_assets(dt);
        this.stroke_particles(dt);
        ctx.restore();
    }
}
       

class Asset {
    constructor(name, x, y, width, height,_type,_degree=0)
    {
        this.name   =   name;
        this.position = new Vector(x,y);
        this.velocity = new Vector(0,0);
        this.width  =   width;
        this.height =   height;
        this.on_map =   true;
        this.color  =   'black';
        this.type = _type;
        this.gravity =  gravity;
        this.on_ground = true;
        this.degree = _degree;
        this.alive = true;
        this.opacity = 1;
    }
    set_color(color)
    {
        this.color = color;
    }
    set_opacity(_opactiy)
    {
        this.opacity = _opactiy;
    }
    get x()
    {
        return this.position.x;
    }
    get y()
    {
        return this.position.y;
    }
    get middlepoint()
    {
        return new Vector(this.x+this.width/2,this.y+this.height/2);
    }
}
class Rectangle extends Asset {
    draw(dt)
    {
        let degree = Math.PI/180;
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        let x = -this.width*tile_size/2;
        let y = this.height*tile_size/2;

        ctx.globalAlpha = this.opacity;
        var grd = ctx.createLinearGradient(x+this.width/2*tile_size*4,y-this.height*tile_size,x+this.width/2*tile_size*4,y+30);
    
        //if particle change color stop
        if(this.type == 99)
        {
            grd.addColorStop(0,this.color);
            grd.addColorStop(1,background_color);
        }else
        {
            grd.addColorStop(0.3,background_color);
            grd.addColorStop(0.9,this.color);
        }
        
        
        
        ctx.fillStyle = grd;

        ctx.translate(this.position.x*tile_size,this.position.y*tile_size);

        ctx.translate(this.width*tile_size/2,this.height*tile_size/2);        
        
        if(this.on_ground == false && this.alive)
        {
            
            this.degree += (dt) ? dt*180*1.76470588235 : 0;
        }else
        {
            
            this.degree = Math.round(this.degree/90)*90;
        }

        ctx.rotate(this.degree*degree);

        ctx.fillRect(-this.width*tile_size/2,-this.height*tile_size/2,(this.width*tile_size)+1,(this.height*tile_size));
        
        ctx.stroke();

        ctx.restore();
        
        //check if object has lifetime

        return this.on_map;
    }
    
}
class Triangle extends Asset
{
    draw()
    {
        let degree = Math.PI/180;

        let x = -this.width*tile_size/2*4;
        let y = this.height*tile_size/2;
        
        ctx.save();
        
        var grd = ctx.createLinearGradient(x+this.width/2*tile_size*4,y-this.height*tile_size,x+this.width/2*tile_size*4,y+30);
        
        grd.addColorStop(0.5,background_color);
   
        grd.addColorStop(0.0,this.color);
        
        ctx.fillStyle = grd;
        
        ctx.translate(this.position.x*tile_size,this.position.y*tile_size);
        ctx.translate(this.width*tile_size/2,this.height*tile_size/2);        
        ctx.rotate(this.degree*degree);

        
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+this.width/2*tile_size*4,y-this.height*tile_size);
        ctx.lineTo(x+this.width*4*tile_size,y);
        
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        //check if object has lifetime
        return this.on_map;

    }
}
class Player extends Asset
{
    set_Image(_img)
    {
        this.image = (_img != null)? _img:undefined; 
    }
    draw(dt)
    {
        let degree = Math.PI/180;
        ctx.save();
        
     
        ctx.fillStyle = this.color;


        ctx.translate(this.position.x*tile_size,this.position.y*tile_size);

        ctx.translate(this.width*tile_size/2,this.height*tile_size/2);        
        
        if(this.on_ground == false && this.alive)
        {
            
            this.degree += (dt) ? dt*180*1.76470588235 : 0;
        }else
        {
            
            this.degree = Math.round(this.degree/90)*90;
        }

        ctx.rotate(this.degree*degree);
        if(this.image)
        {
            ctx.drawImage(this.image,-this.width*tile_size/2,-this.height*tile_size/2,this.width*tile_size,this.height*tile_size)
            ctx.strokeRect(-this.width*tile_size/2,-this.height*tile_size/2,this.width*tile_size,this.height*tile_size)
        }else
        {
            ctx.fillRect(-this.width*tile_size/2,-this.height*tile_size/2,this.width*tile_size,this.height*tile_size);
        }
        
        
        ctx.stroke();

        ctx.restore();
        
        //check if object has lifetime
        this.on_map = true;

        return this.on_map;
    }
    move(dt)
    {
        
        this.velocity = this.velocity.add(new Vector(0,(gravity*dt)));
   
        this.position = this.position.add(
            new Vector(this.velocity.x * dt*drag,
            this.velocity.y *dt*drag)
        );
    }
    jump()
    {
        if(this.on_ground == true)
        {
            this.jump_velocity = player_jump_height;
            this.velocity.y = -this.jump_velocity;
        }
    }
}
class Particle extends Rectangle
{
    constructor(name, x, y, width, height,_type,_degree=0, _life_time)
    {
        super(name, x, y, width, height,_type,_degree=0);
        this.max_lifetime = _life_time;
        this.life_time = _life_time;

    }

    draw(dt)
    {
        super.draw();


        if(this.life_time >= 0)
        {
            this.life_time--;
            this.opacity = this.life_time/this.max_lifetime;
        }
        if(this.life_time <= 0)
        {
            this.on_map = false;
        }
    }
    move(dt)
    {
        this.velocity = this.velocity.add(new Vector(0,(this.gravity*dt)));
   
        this.position = this.position.add(
            new Vector(this.velocity.x * dt,
            this.velocity.y *dt)
        );
    }
}