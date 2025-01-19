import { ChallengeState } from "./ChallengeState.js";

export class ChallengeSubscription {
    /**
     * @param {string} username 
     * @param {string} challengeId 
     * @param {ChallengeState} state 
     */
    constructor(username, challengeId, state) {
        this.username = username;
        this.challengeId = challengeId;
        this.state = state;
    }
}