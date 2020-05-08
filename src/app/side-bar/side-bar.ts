export const SideBar = [
    {
        text: 'Quản lý quảng cáo',
        link: 'advertise'
    },
    {
        text: 'Quản lý Tour',
        link: 'tour',
        //   subItems: [
        //     {
        //       text: 'Lịch Trình',
        //       link: 'reviews/lich-trinh',
        //     },
        //     {
        //       text: 'Ăn Gì',
        //       link: 'reviews/an-gi',
        //     }
        //   ]
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
        text: 'Quản lý user',
        link: 'user',
        queryParams: { category: 'bannerTour' },
    }
];
