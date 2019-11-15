export class SpecialHashtg {
    static concatedHashtag = '';

    static concat(type, username) {
        this.concatedHashtag = type + username;
        return this.concatedHashtag;
    }
}
