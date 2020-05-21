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
        text: 'Quản lý Blogs',
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
                text: 'Danh mục blog',
                link: 'blog/category',
            },
            {
                text: 'Danh mục advertise',
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
        text: 'Quản lý user',
        link: 'user',
        queryParams: { category: 'bannerTour' },
    }
];
