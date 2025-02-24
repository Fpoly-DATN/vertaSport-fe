import 'swiper/css';
import 'swiper/css/navigation';
import HomeNewBannerOne from '~/assets/home_new_banner_1_2048x2048.webp';
import HomeNewBannerTwo from '~/assets/home_new_banner_2_2048x2048.webp';
import BannerSlider from '~/components/BannerSlider/BannerSlider';
import ProductWrapper from '~/components/ProductWrapper/ProductWrapper';
import { useGetProductsBestSelling } from '~/hooks/queries/products/useGetProductsBestSelling';
import { useGetProductsNewest } from '~/hooks/queries/products/useGetProductsNewest';
import { IProductDetail } from '~/interfaces/product';
import '~/styles/customSwiper.css';

export default function HomePage() {
    const { data: bestSellingData, isPending: isPendingBestSelling } = useGetProductsBestSelling();
    const { data: newestData, isPending: isPendingNewest } = useGetProductsNewest();
    return (
        <>
            <BannerSlider />
            <div className='my-1 flex items-center justify-between gap-1'>
                <div className='basis-[50%] bg-[#f0eff3]'>
                    <img src={HomeNewBannerOne} alt='Bộ sưu tập mới' />
                    <div className='flex items-baseline justify-between px-4 py-3'>
                        <span className='text-primary text-lg font-medium uppercase'> new collection</span>
                        <span className='text-primary text-sm font-thin uppercase'> shop now</span>
                    </div>
                </div>
                <div className='basis-[50%] bg-[#f0eff3]'>
                    <img src={HomeNewBannerTwo} alt='Danh mục' />
                    <div className='flex items-baseline justify-between px-4 py-3'>
                        <span className='text-primary text-lg font-medium uppercase'> dress</span>
                        <span className='text-primary text-sm font-thin uppercase'> shop now</span>
                    </div>
                </div>
            </div>
            <div className='mx-6 max-w-7xl xl:mx-auto'>
                <div>
                    <ProductWrapper<IProductDetail[]>
                        title='SẢN PHẨM MỚI'
                        description='Những sản phẩm xu hướng thời trang mới'
                        data={bestSellingData?.data.data}
                        isPending={isPendingBestSelling}
                    />
                </div>
                <div className='mt-12'>
                    <ProductWrapper<IProductDetail[]>
                        title='SẢN PHẨM BÁN CHẠY'
                        description='Những sản phẩm được mua nhiều nhất ở trên hệ thống'
                        data={newestData?.data.data}
                        isPending={isPendingNewest}
                    />
                </div>
            </div>
        </>
    );
}
