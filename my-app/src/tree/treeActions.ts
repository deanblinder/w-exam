import {File, fileType} from "./types";
const Chance = require('chance');

const getRndInteger = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomChildren = async () => {
    const chance = new Chance()
    const arrLength = getRndInteger(0,6)
    const filesArr: File[] = [];

    for (let i = 0 ; i < arrLength ; i++){
        const randomFile: File = {
            id: chance.guid(),
            title:chance.animal(),
            dateCreated:chance.date({string: true}),
            type: chance.pickone([fileType.DIR,fileType.DOC,fileType.PNG])
        }
        filesArr.push(randomFile)
    }
    return filesArr
}

export const treeActions = {
    getRandomChildren,
}
