import { Carousel } from 'antd';
import { useCallback, useRef } from 'react';

import { CarouselRef } from 'antd/es/carousel';
import bannerOne from '~/assets/ms_banner_img1_master.webp';
import bannerTwo from '~/assets/ms_banner_img2_master.webp';
import NavigatonSlider from '../elements/NavigationSlider';

export default function BannerSlider() {
    const slider = [bannerOne, bannerTwo];
    const slideRef = useRef<CarouselRef>(null);

    const nextSlide = useCallback(() => {
        slideRef.current?.prev();
    }, []);

    const prevSlide = useCallback(() => {
        slideRef.current?.next();
    }, []);

    return (
        <div className='relative'>
            <Carousel ref={slideRef} autoplay autoplaySpeed={3000} className='w-full'>
                {slider.map((slide, index) => (
                    <div key={index}>
                        <img src={slide} alt='banner' className='w-full' />
                    </div>
                ))}
            </Carousel>
            <NavigatonSlider prev handleAction={prevSlide} />
            <NavigatonSlider next handleAction={nextSlide} />
        </div>
    );
}
