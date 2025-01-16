export class Playlist {
    /**
     * @param {string} id 
     * @param {string} title 
     * @param {string} author
     * @param {string[]} trainingsIds
     */
    constructor(id, title, author, trainingsIds) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.trainingsIds = trainingsIds;
    }
}