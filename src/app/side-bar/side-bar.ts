export const SideBar = [
    {
        text: 'Quản lý quảng cáo',
        link: 'advertise',
        subItems: [

            {
                text: 'Quản lý quảng cáo',
                link: 'advertise',
            },
            {
                text: 'Danh mục quảng cáo',
                link: 'advertise/category',
            },
        ]
    },
    {
        text: 'Quản lý Tour',
        link: 'tour',
        subItems: [
            {
                text: 'Quản lý Tour',
                link: 'tour',
            },
            {
                text: 'Danh mục tour',
                link: 'tour/category',
            },
        ]
    },
    {
        text: 'Quản lý Transfer',
        link: 'tour/transfer',
        subItems: [
            {
                text: 'Quản lý Transfer',
                link: 'tour/transfer',
            },
            {
                text: 'Danh mục transfer',
                link: 'tour/transfer/category',
            },
        ]
    },
    {
        text: 'Quản lý lịch trình',
        link: 'blog',
        subItems: [
            {
                text: 'Quản lý lịch trình',
                link: 'blog',
            }, {
                text: 'Danh mục lịch trình',
                link: 'blog/category',
            },
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
        subItems: [

            {
                text: 'Quản lý Entertain',
                link: 'entertain',
            },
            {
                text: 'Danh mục entertain',
                link: 'entertain/category',
            },
        ]
    },
    {
        text: 'Quản lý Nhà hàng',
        link: 'restaurant',
        subItems: [
            {
                text: 'Quản lý Nhà hàng',
                link: 'restaurant',
            }, {
                text: 'Danh mục nhà hàng',
                link: 'restaurant/category',
            },
        ]
    },
    {
        text: 'Quản lý reviews',
        link: 'review',
        subItems: [

            {
                text: 'Quản lý reviews',
                link: 'review',
            },
            {
                text: 'Danh mục review',
                link: 'review/category',
            }
        ],
        queryParams: { category: 'bannerTour' },
    },
    {
        text: 'Quản lý user',
        link: 'user',
        queryParams: { category: 'bannerTour' },
    }
];
