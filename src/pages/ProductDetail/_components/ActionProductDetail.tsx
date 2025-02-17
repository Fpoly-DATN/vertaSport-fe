import { Button, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { ISizeInColor, IVariantDetail } from '~/interfaces/product';
import SelectSizeModal from './SelectSizeModal';
import soldOut from '~/assets/soldout.webp';

type IProps = {
    variants: IVariantDetail[];
    setColorVariant: (e: IVariantDetail) => void;
    selectedColor: IVariantDetail;
    setSizeSelect: (e: ISizeInColor | null) => void;
    selectedSize: ISizeInColor;
};
export default function ActionProductDetail({
    variants,
    selectedColor,
    selectedSize,
    setSizeSelect,
    setColorVariant,
}: IProps) {
    useEffect(() => {
        // Tìm màu đầu tiên có stock > 0
        const firstAvailableColor = variants.find((variant) => variant.items.some((item) => item.stock > 0));
        if (firstAvailableColor) {
            setColorVariant(firstAvailableColor);
        }
    }, [setColorVariant, variants]);
    useEffect(() => {
        if (!selectedColor) return;
        const availableSize = selectedColor.items.find((item) => item.stock > 0);
        if (availableSize) {
            setSizeSelect(availableSize);
        }
    }, [selectedColor, setSizeSelect]);
    const [quantity, setQuantity] = useState<number>(1);
    return (
        <>
            <div>
                <p className='text-sm font-semibold'>Màu sắc</p>
                <div className='mt-2 flex items-center gap-2'>
                    {variants.map((item, index) => {
                        const totalStock = item.items.reduce((acc, curr) => acc + curr.stock, 0);
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (totalStock > 0) {
                                        setColorVariant(item);
                                    }
                                }}
                                disabled={totalStock === 0}
                                style={{ backgroundColor: `${item.color.hex}` }}
                                className={`relative cursor-pointer overflow-hidden rounded-full border px-4 py-4 text-sm transition-all ${selectedColor === item ? `border-black` : 'border-[#8f8f8f]'} ${totalStock === 0 ? 'cursor-not-allowed opacity-50' : ''} `}
                            >
                                {totalStock === 0 && (
                                    <img
                                        src={soldOut}
                                        className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                                        alt=''
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className='mt-2'>
                <p className='text-sm font-semibold'>Kích thước</p>
                <div className='mt-2 flex items-center gap-2'>
                    {selectedColor?.items.map((item, index) => (
                        <button
                            key={index}
                            disabled={item.stock === 0}
                            onClick={() => setSizeSelect(item)}
                            className={`relative cursor-pointer border-2 px-3 py-1 text-sm transition-all ${
                                selectedSize === item
                                    ? 'border-black bg-black text-white'
                                    : 'border-[#8f8f8f] bg-white text-black'
                            }`}
                        >
                            <span className={`${item.stock === 0 && 'text-[#8f8f8f]'}`}>Size {item.size.value}</span>
                            {item.stock === 0 && (
                                <div className='absolute top-[50%] left-[50%] h-[0.5px] w-full translate-x-[-50%] translate-y-[-50%] rotate-30 bg-[#8f8f8f]' />
                            )}
                            {selectedSize === item && <span className='absolute right-0 bottom-0 text-xs'>✔</span>}
                        </button>
                    ))}
                </div>
                {selectedSize && <p className='mt-2 text-xs text-[#8f8f8f]'>Còn lại {selectedSize.stock} sản phẩm</p>}
            </div>
            <div className='mt-4 inline-block'>
                <SelectSizeModal>
                    <span className='cursor-pointer uppercase underline'>Hướng dẫn chọn size</span>
                </SelectSizeModal>
            </div>
            <div className='mt-4 flex items-center gap-5'>
                <span className='text-sm font-semibold'>Số lượng</span>
                <div className='antd-custom my-2 flex items-center gap-2'>
                    <Button
                        className='h-full'
                        disabled={quantity === 1}
                        onClick={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1);
                            }
                        }}
                    >
                        -
                    </Button>
                    <InputNumber
                        min={1}
                        defaultValue={1}
                        max={selectedSize?.stock}
                        value={quantity}
                        onChange={(e) => {
                            if ((e as number) > 0) {
                                setQuantity(e as number);
                            }
                        }}
                        className='flex items-center'
                        controls={false}
                    />
                    <Button
                        onClick={() => {
                            if (quantity < selectedSize?.stock) {
                                setQuantity(quantity + 1);
                            }
                        }}
                        className=''
                        disabled={quantity === selectedSize?.stock}
                    >
                        +
                    </Button>
                </div>
            </div>
            <div className='mt-4 flex'>
                <button className='w-full cursor-pointer border-2 border-black bg-white py-2 font-semibold text-black duration-300 hover:bg-black hover:text-white'>
                    Thêm vào giỏ hàng
                </button>
            </div>
        </>
    );
}
