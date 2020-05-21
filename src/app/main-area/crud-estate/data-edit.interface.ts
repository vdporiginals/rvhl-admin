export interface DataEdit {
    data: {
        name: string;
        phone: string;
        roomNum: number;
        description: string;
        images: [];
        views: string;
        content: string;
        price: number;
        address: string;
        category: string;
        facilities: {
            square?: number,
            other?: string,
            kitchen?: boolean,
            oceanViews?: boolean,
            pool?: boolean,
            restaurant?: boolean,
            meetingRoom: boolean,
            bbqArea?: boolean
        };
        keywords: string,
        isPopular: boolean,
        status: boolean
    }
}