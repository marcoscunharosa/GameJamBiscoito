export default class ColisionController{

    colisionMainFloor(main, listOfFloors){
        /* const mainY = main.y + main.height;
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
            if(main.x + main.width >= floor.x
                 && main.x + main.width - 100 < floor.x + floor.customWidth &&
                 mainY == 278){ //Ele ta pisando quando
                return true;
            }
            return false;
        } */
        for(var i = 0; i < listOfFloors.length; i++){
            const floor = listOfFloors[i];
            var rect1 = {x: main.x, y: main.y, width: main.width, height: main.height};
            var rect2 = {x: floor.x, y: floor.y - 1, width: floor.customWidth, height: floor.height + 2}

            if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
                return true;
            }

        }
        return false;
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
    checkColisitionReporter(main, house_reporters){
        for(var i = 0; i < house_reporters.length; i++){
            const houseReporter = house_reporters[i];
            var rect1 = {x: main.x, y: main.y + 1, width: main.width, height: main.height};
            var rect2 = {x: houseReporter.x, y: houseReporter.y + 70, width: houseReporter.width, height: houseReporter.height - 70}

            if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
                return true;
            }

        }
        return false;
    }
    /* checkColisionWithHouseVertical(main, house_reporters){
        for(var i = 0; i < house_reporters.length; i++){
            if(this.colisionMainReportVertical(main, house_reporters[i])){
                return true;
            }
        }
        return false;
    }
    checkColisionWithHouseHorizontal(main, house_reporters){
        for(var i = 0; i < house_reporters.length; i++){
            if(this.colisionMainReportHorizontal(main, house_reporters[i])){
                return true;
            }
        }
        return false;
    } */

    colisionMainReportHorizontal(main, report){
        var rect1 = {x: main.x, width: main.width};
        var rect2 = {x: report.x, width: report.width};

        if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        this.colisionMainReportVertical(main, report)) {
            return true;
        }
        return false;
    }

    colisionMainReportVertical(main, report){
        var rect1 = {y: main.y, height: main.height - 60}
        var rect2 = {y: report.y + 60, height: report.height}

        if (
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
            return true;
        }
        return false;
    }
}