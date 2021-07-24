export default class ColisionController{

    colisionMainFloor(main, listOfFloors){
        const mainY = main.y + main.height;
        var copyFloors = [... listOfFloors];
        var goneFloors = [];

        for(var i = 0; i < copyFloors.length; i++){
            if(mainY > copyFloors[i].y || copyFloors[i].x + copyFloors[i].customWidth <= main.x){
                goneFloors.push(copyFloors[i]);
            }
        }
        copyFloors = copyFloors.filter((el) => !goneFloors.includes(el));

        for(var i = 0; i < copyFloors.length; i++){
            const floor = copyFloors[i];
            const floorY = floor.y;

            if(mainY < floorY){
                return false;
            }
            if(main.x + main.width >= floor.x && main.x + main.width - 100 < floor.x + floor.customWidth){ //Ele ta pisando quando
                return true;
            }
            return false;
        }
    }

    colideForeheadFloor(main, listOfFloors){
        var copyFloors = [... listOfFloors];
        var goneFloors = [];
        for(var i = 0; i < listOfFloors.length; i++){
            if(main.x + main.width - copyFloors[i].x  < -2 && main.x + main.width - copyFloors[i].x  > -10 && main.y + main.height > copyFloors[i].y){
                console.log("bateu")
                return true;
            }
        }
        return false;
    }

    colisionMainFollower(main, follower){
        if(main.x + main.width >= follower.x
             && main.y + main.height >= follower.y
             && main.y < follower.y + follower.height
             && main.x + 20 < follower.x + follower.width){
            return true;
        }
        return false;
    }
}