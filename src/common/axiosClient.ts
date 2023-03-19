/* eslint-disable no-restricted-globals */
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenStatic,
} from "axios";
import { LOCAL_STORAGE_ORG_TOKEN, LOCAL_STORAGE_TOKEN } from "./constants";
import { GET_TOKEN_API } from "./store/apiURL";

export interface ApiAxiosInstance extends AxiosInstance {
  CancelToken?: CancelTokenStatic;
  setupAxiosInterceptors?: (interceptors?: InterceptorsInstance) => void;
}
export interface InterceptorsInstance {
  request: {
    success?: (
      value: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    failure?: (error: any) => any;
  };
  response: {
    success?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    failure?: (error: any) => any;
  };
}

class ServiceSingleton {
  private static instance: ServiceSingleton;
  public axiosInstance: ApiAxiosInstance;
  private interceptorsRequestNumber = 0;
  private interceptorsResponseNumber = 0;
  /**   * Singleton's constructor must be private   */
  private constructor() {
    this.axiosInstance = Axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
    });
  }

  public static getInstance(): ServiceSingleton {
    if (ServiceSingleton.instance) return ServiceSingleton.instance;
    ServiceSingleton.instance = new ServiceSingleton();
    const $this = ServiceSingleton.instance; // Setup interceptor by default
    $this.axiosInstance.setupAxiosInterceptors = $this.setupAxiosInterceptors;
    $this.setupAxiosInterceptors();
    return $this;
  }

  private setupAxiosInterceptors(interceptors?: InterceptorsInstance) {
    const $this = ServiceSingleton.getInstance();
    if (interceptors) {
      // Eject request/response interceptors
      $this.axiosInstance.interceptors.request.eject(
        $this.interceptorsRequestNumber
      );
      $this.axiosInstance.interceptors.response.eject(
        $this.interceptorsResponseNumber
      );

      /**    * Try to set the handler to empty array,     * cuz the handler will be set null after eject    */ ($this
        .axiosInstance.interceptors.request as any).handlers = [];
      ($this.axiosInstance.interceptors.response as any).handlers = []; // Inject request/response interceptors
      $this.interceptorsRequestNumber = $this.axiosInstance.interceptors.request.use(
        (interceptors.request as any).success,
        interceptors.request.failure
      );
      $this.interceptorsResponseNumber = $this.axiosInstance.interceptors.response.use(
        interceptors.response.success,
        interceptors.response.failure
      );
      return;
    }

    const handleRequestSuccess = (
      config: AxiosRequestConfig
    ): Promise<AxiosRequestConfig> => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN) || "";
      const orgToken = localStorage.getItem(LOCAL_STORAGE_ORG_TOKEN) || "";
      const isLogin = config.url === GET_TOKEN_API;

      if (!isLogin && token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
          ...(orgToken && { "org-token": orgToken }),
          ...config?.headers,
        };
      }
      config.maxBodyLength = Infinity;
      config.maxContentLength = Infinity;

      const requestCommon = {};
      if (config.data instanceof FormData) {
        Object.keys(requestCommon).forEach((key) => {
          let value = (requestCommon as any)[key];
          if (typeof value === "object") {
            value = JSON.stringify(value);
          } else {
            value += "";
          }
          config.data.append(key, value);
        });
      } else {
        config.data = { ...config.data, ...requestCommon };
      }

      return Promise.resolve(config);
    };

    const handleRequestFailure = (error: AxiosError): Promise<Error> => {
      return Promise.reject(error.request);
    };
    this.axiosInstance.interceptors.request.use(
      handleRequestSuccess as any,
      handleRequestFailure
    );
    const handleResponseSuccess = (
      response: AxiosResponse
    ): Promise<AxiosResponse> => {
      return Promise.resolve(response);
    };
    const handleResponseFailure = (error: AxiosError): Promise<Error> => {
      if (Axios.isCancel(error)) {
        return Promise.resolve({ isCancel: true } as any);
      }

      return Promise.reject((error as any).response);
    };

    $this.axiosInstance.interceptors.response.use(
      handleResponseSuccess,
      handleResponseFailure
    );
  }
}
const apiService = ServiceSingleton.getInstance().axiosInstance;
export default apiService;
