import { ChallengeState } from "./ChallengeState.js";

export class Challenge {
    /**
     * @param {string} id 
     * @param {string} title 
     * @param {ChallengeState} state 
     */
    constructor(id, title, state) {
        this.id = id;
        this.title = title;
        this.state = state;
    }
}