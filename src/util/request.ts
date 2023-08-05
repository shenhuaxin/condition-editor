import axios from "axios";
import NProgress from "nprogress"



axios.interceptors.response.use(
    (res) => {
        NProgress.done();

        if (!res?.data) {
            return res;
        }

        const {code, data, message} = res.data;

        if (!code) {
            return res.data;
        }
        switch (code) {
            case 1000:
                return data;
            default:
                return Promise.reject({code, message});
        }
    },
    async (error) => {
        NProgress.done();

        if (error.response) {
            const {status, resConfig} = error.response;
            // const { user } = useBase();

            if (status == 401) {
                // user.logout();
            }
        }

        return Promise.reject({message: error.message});
    }
);

