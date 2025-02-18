import { Modal, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateCodOrder } from '~/hooks/mutations/order/useCreateCodOrder';
import { IOrderCreatePayload } from '~/interfaces/order';
import { useTypedSelector } from '~/store/store';
import { formatCurrency } from '~/utils/formatCurrrency';

export default function CashPaymentModal({
    isOpen,
    setOpen,
    paymentMethod,
}: {
    isOpen: boolean;
    setOpen: (e: boolean) => void;
    paymentMethod: 'COD' | 'PAYOS';
}) {
    const { mutate, isPending } = useCreateCodOrder();
    const handleCancel = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const checkOutInfor = useTypedSelector((state) => state.checkOut);
    const handleConfirm = () => {
        const payload: IOrderCreatePayload = {
            items: checkOutInfor.items ? [...checkOutInfor.items] : [],
            customerInfo: checkOutInfor.customerInfor,
            shippingAddress: {
                address: checkOutInfor.shippingAddress.address,
                country: checkOutInfor.shippingAddress.country,
                district: checkOutInfor.shippingAddress.district,
                province: checkOutInfor.shippingAddress.province,
            },
            shippingFee: checkOutInfor.shippingFee,
            totalPrice: checkOutInfor.totalPrice,
            description: checkOutInfor.description,
        };
        console.log(payload);
        mutate(payload, {
            onSuccess: (data) => {
                setOpen(false);
                navigate(`/order/success/${data._id}`);
            },
        });
    };
    return (
        <Modal open={isOpen} width={750} onCancel={handleCancel} footer={<></>} onClose={handleCancel} centered>
            <div>
                <h3 className='text-2xl font-bold'>Xác nhận đặt hàng</h3>
                <p className='mt-3 text-base'>
                    Bạn muốn thanh toán đơn hàng có {checkOutInfor.items?.length} sản phẩm với tổng giá tiền là{' '}
                    <span className='font-semibold text-green-600'>{formatCurrency(checkOutInfor.totalPrice)}</span>
                    với phương thức thanh toán là{' '}
                    {paymentMethod === 'COD' ? (
                        <span className='font-semibold text-green-600'>Tiền mặt</span>
                    ) : (
                        'Online'
                    )}{' '}
                </p>
                <div className='flex gap-18'>
                    <div>
                        <p className='mt-2 text-lg font-semibold'>Địa chỉ:</p>
                        <ul className='mt-2 flex flex-col gap-1'>
                            <li>
                                <span className='text-base'>
                                    Tỉnh/ Thành phố:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.shippingAddress.province}
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Quận/ Huyện:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.shippingAddress.district}
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Phường/ Xã:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.shippingAddress.ward}
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Địa chỉ:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.shippingAddress.address}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='mt-2 text-lg font-semibold'>Thông tin nhận hàng:</p>
                        <ul className='mt-2 flex flex-col gap-1'>
                            <li>
                                <span className='text-base'>
                                    Tên người nhận:{' '}
                                    <span className='font-semibold text-black'>{checkOutInfor.customerInfor.name}</span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Email:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.customerInfor.email}
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Số điện thoại:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.customerInfor.phone}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mt-8 flex gap-5'>
                    <button
                        onClick={handleCancel}
                        className='w-2/3 cursor-pointer rounded-md border border-red-500 py-2 text-base text-red-500 duration-300 hover:bg-red-500 hover:text-white'
                    >
                        HỦY BỎ
                    </button>
                    <button
                        onClick={handleConfirm}
                        className='w-2/3 cursor-pointer rounded-md border border-black text-base duration-300 hover:bg-black hover:text-white'
                    >
                        {isPending ? <Spin /> : 'XÁC NHẬN'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
