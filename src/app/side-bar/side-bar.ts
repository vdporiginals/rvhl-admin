export const SideBar = [
    {
        text: 'Quản lý quảng cáo',
        link: 'advertise'
    },
    {
        text: 'Quản lý Tour',
        link: 'tour',
    },
    {
        text: 'Quản lý Transfer',
        link: 'tour/transfer',
    },
    {
        text: 'Quản lý lịch trình',
        link: 'blog',
    },
    {
        text: 'Quản lý danh mục',
        link: null,
        subItems: [
            {
                text: 'Danh mục tour',
                link: 'tour/category',
            },
            {
                text: 'Danh mục transfer',
                link: 'tour/transfer/category',
            },
            {
                text: 'Danh mục entertain',
                link: 'entertain/category',
            },
            {
                text: 'Danh mục lịch trình',
                link: 'blog/category',
            },
            {
                text: 'Danh mục nhà hàng',
                link: 'restaurant/category',
            },
            {
                text: 'Danh mục quảng cáo',
                link: 'advertise/category',
            }
        ]
    },
    {
        text: 'Quản lý Chỗ ở',
        link: 'cho-o',
        subItems: [
            {
                text: 'Danh mục',
                link: 'cho-o/category',
            },
            {
                text: 'Khách sạn',
                link: 'cho-o/hotel',
            },
            {
                text: 'Villa',
                link: 'cho-o/villa',
            },
            {
                text: 'Homestay',
                link: 'cho-o/homestay',
            }
        ]
    },
    {
        text: 'Quản lý yêu cầu khách hàng',
        link: 'customer-request',
        subItems: [
            {
                text: 'Quản lý bình luận',
                link: 'customer-request/comment',
            },
            {
                text: 'Quản lý yêu cầu xem phòng',
                link: 'customer-request/check-room',
            }
        ]
    },
    {
        text: 'Quản lý Entertain',
        link: 'entertain',
        queryParams: { category: 'bannerTour' },
    },
    {
        text: 'Quản lý Nhà hàng',
        link: 'restaurant',
        queryParams: { category: 'bannerTour' },
    },
    {
        text: 'Quản lý user',
        link: 'user',
        queryParams: { category: 'bannerTour' },
    }
];
