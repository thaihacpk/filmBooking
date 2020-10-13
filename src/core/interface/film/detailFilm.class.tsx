import { IntroMovie } from "./introFilm.class";

export class DetailMovie extends IntroMovie {
    systemCinema: string[];

    constructor(
        systemCinema: string[],
        _id: number,
        name: string,
        penName: string,
        trailerLink: string,
        image: string,
        description: string,
        groupID: string,
        dateRelease: string,
        rate: number,
        index: number,
    ) {
        super(_id, name, penName, trailerLink, image, description, dateRelease, rate, groupID, index);
        this.systemCinema = systemCinema;
    }
}