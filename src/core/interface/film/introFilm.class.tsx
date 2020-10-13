export class IntroMovie {
    _id: number; // maPhim
    name: string; // tenPhim
    penName: string; // biDanh
    trailerLink: string; //trailer
    image: string; // hinhAnh
    description: string; // moTa
    dateRelease: string; // Ngay khoi chieu
    rate: number; // danhGia
    groupID: string; //maNhom
    //bonus
    index: number; // viTri
    types: string[]; // the loai
    timeTickets: string[]; // Gio khoi chieu

    constructor(
        _id: number,
        name: string,
        penName: string,
        trailerLink: string,
        image: string,
        description: string,
        dateRelease: string,
        rate: number,
        groupID: string,
        //bonus
        index: number,
        // types: ["Fantasy", "Adventure", "Thriller"],
        // timeTickets: ["12:30", "13:30", "14:30", "15:30"],
    ) {

        this._id = _id;
        this.name = name;
        this.penName = penName;
        this.trailerLink = trailerLink;
        this.image = image;
        this.description = description;
        this.dateRelease = dateRelease;
        this.rate = rate;
        this.groupID = groupID;
        //bonus
        this.index = index;
        this.types = ["Fantasy", "Adventure", "Thriller"];
        this.timeTickets =  ["12:30", "13:30", "14:30", "15:30"];
    }
}
