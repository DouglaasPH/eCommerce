import axios from "axios";

const API_URL = 'http://localhost:3000';

async function confirmCoupon(coupon_code: string) {
    try {
        const response = await axios.get(`${API_URL}/confirmCoupon`, {
            params: {
                coupon_code
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function useCoupon(coupon_code: string) {
    try {
        const response = await axios.get(`${API_URL}/useCoupon`, {
            params: {
                coupon_code
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { confirmCoupon, useCoupon };