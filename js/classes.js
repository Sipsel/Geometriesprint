class Vector {
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    add([x,y])
    //x,y for vector to add
    {
        this.x+=Math.floor(x);
        this.y+=Math.floor(y);

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y); 
    }
    get_position()
    {
        return [this.x,this.y];
    }
}
module.exports = {Vector};