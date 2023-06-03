export class Email {
    id: string;
    name: string;
    data: Array<any>;
    
    date: string;
    
    senderName: string | null;
    senderEmail: string | null;
    

    constructor(
        id: string,
        name: string,
        data: Array<any>,
       
        date: string,
       
        senderName: string | null,
        senderEmail: string | null,
       
    ) {
        this.id = id;
        this.name = name;
        this.data = data;
       
        this.date = date;
       
        this.senderName = senderName;
        this.senderEmail = senderEmail;
       
    }


}
